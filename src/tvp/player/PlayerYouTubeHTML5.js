define([
	"tvp/player/Player"
],
	function(Player) {
  /**
   * PlayerYouTubeHTML5 class
   * This is the PlayerYouTubeHTML5 class
   * 
   * @name PlayerYouTubeHTML5
   * @class PlayerYouTubeHTML5
   * @constructor
   * @return PlayerYouTubeHTML5 Object
   */

  var PlayerYouTubeHTML5 = Player.extend({
    bufferingCount:0,

    /**
     Load a video via provider's ID

     @param {string} id - The unique video id from the provider
     */
    loadVideoById: function(){
			var THAT=this;
      if (this.isPlayerLoaded()) {
        this.setUpdateInterval();
        this.videoEndingTriggered = false;

        var item = this.data.guideCollection.get(this.getVideoId());
        
        if (typeof item !== "object") {
          throw "Video not found in collection. ID: " + this.getVideoId();
        }

        this.player.setPlaybackQuality(this.defaultQuality);

        /*This was added because:
        - Our player returns a playerstate of -1 for BOTH:
           - initial load while buffering
           - and when it is loaded and not playing (player start)
         Thus we need some way of differentiating the two.
         */
        this.loadVideoCalled = true;

        if (this.isMobile()) {
          return this.player.cueVideoById(item.get('videoId'));
        }

        return this.player.loadVideoById(item.get('videoId'));
      }
      
      return false;
    },
    
    cueVideoById: function() {
      if (this.isPlayerLoaded()) {
        var asset = TVP_CURRENT_VIDEO();
        if (asset) {
          return this.player.cueVideoById(asset.get('videoId'));
        }
      }

    },
            
    isMobile: function(){
      // if we want a more complete list use this: http://detectmobilebrowsers.com/
      // str.test() is more efficent than str.match()
      // remember str.test is case sensitive
      return (/iphone|ipod|android|ie|blackberry|fennec/).test
           (navigator.userAgent.toLowerCase());
    },
 
    /**
     Return the actual video quality of the current video.

     @returns {string}
     */
    getPlaybackQuality: function(){
      if (this.isPlayerLoaded()) {      
        return this.player.getPlaybackQuality();
      }
      
      return false;
    },

    /**
     This function sets the suggested video quality for the current video. The function causes the video to reload
     at its current position in the new quality. If the playback quality does change, it will only change for the
     video being played. Calling this function does not guarantee that the playback quality will actually change.
     However, if the playback quality does change, the onPlaybackQualityChange event will fire, and your code should
     respond to the event rather than the fact that it called the setPlaybackQuality function.

     @param {string} quality - Set the quality level based on a string
     */
    setPlaybackQuality: function(quality){
     if (this.isPlayerLoaded()) {
        this.player.setPlaybackQuality(quality);
     }
     
     return false;
    },

    /**
     Returns an array of available video quality levels.

     @returns {array} Array of quality levels available
     */
    getAvailableQualityLevels: function() {
      if (this.isPlayerLoaded()) {      
        return this.player.getAvailableQualityLevels();
      }
      return false;
    },

    /**
     Play the video. Plays the currently cued/loaded video. The final player state after this function executes will be playing.

     @returns {undefined}
     */
    play: function(){
      if (this.isPlayerLoaded()) {
        if (this.isUnstarted()) {
          try {
            this.loadVideoById();
          } catch (e) {
            return false;
          }
        }
        
        this.player.playVideo();
        this.setUpdateInterval();
      }
      
      return false;
    },

		/**
		 * Stops the video and any loading ops.
		 */
		stop:function(){
			if(this.player){
        this.player.stopVideo();
			}
		},
            
    destroy: function(){
      if (this.isPlayerLoaded()) {
        return this.player.destroy();
      }
      return false;
    },
            

    /**
     * Set the update interval
     *
     */
    setUpdateInterval: function(){
      var t = this;
      this.clearInterval();
      this.interval = setInterval(
        function(){
          t.updatePlaybackInfo();
          t.isVideoEnding();
        }
        , 1000
      );
    },
    
    /**
     * Update playback info
     * 
     * @return void
     */
    updatePlaybackInfo: function(){
      
      if (!this.isPlayerLoaded()) {
        return false;
      }

      var updateInfo = this.getUpdateInfo(true);

      if ( !this.videoEndingTriggered && this.isVideoEnding(updateInfo) ) {
        Player.trigger(Player.Events.VideoEnding, updateInfo);
        this.videoEndingTriggered = true;
      }

      return Player.trigger(Player.Events.VideoUpdate, updateInfo);
    },

    /**
     * Checks to see if video is about to end.
     *
     * Current rules:
     * 1. If there are less than 10 seconds of the video left (a short video), or,
     * 2. If the percentLeft is less than 6% (a long video)
     *
     * @param {Event} event data
     *
     * @return boolean TRUE if video ending, otherwise FALSE
     */
    isVideoEnding: function(updateInfo){
      
      if ( typeof updateInfo == "undefined" ) {
        updateInfo = this.getUpdateInfo();
      }

      if ( !updateInfo.hasOwnProperty('secondsLeft') ) {
        return false;
      }
      return ( updateInfo.duration>0 && (updateInfo.secondsLeft < 10 || updateInfo.percentLeft < 6) );
    },

    /**
     * Get the player data for events
     *
     * @return {object} player data (current time, duration)
     */
    getUpdateInfo: function(isTick){
      var updateInfo = {};

      if (this.isPlayerLoaded() && this.player.hasOwnProperty('getCurrentTime')) {

        var currentTime = this.player.getCurrentTime();
        var duration = this.player.getDuration();
        var loadedFraction = this.player.getVideoLoadedFraction()*100;

        var secondsLeft = Math.round(duration - currentTime);
        var percentLeft = Math.round(100-((currentTime * 100) / duration));

        updateInfo = {
          currentTime: currentTime,
          duration: duration,
          loadedFraction: loadedFraction,
          secondsLeft: secondsLeft,
          percentLeft: percentLeft
        };

        //detecting the pure buffering state instead of using isBuffering(),
        //that method is polluted by other requirements.
        var plState = this.player.getPlayerState();
        var isBuffering = plState == PlayerYouTubeHTML5.STATES.buffering;
        if(isTick){
          if(isBuffering){
            this.bufferingCount++;
            if(this.bufferingCount>=15){
              var currentTime = this.player.getCurrentTime();
              var seekTo = currentTime-1<0?0:currentTime-1;
              this.bufferingCount = 0;
              this.seek(seekTo);
            }
          } else {
            this.bufferingCount = 0;
          }
        }
      }

      return updateInfo;
    },

		/**
		 * Checks to see if player meaningfully exists (hack); i.e., if
		 * player has a video loaded, playing/paused, and visible to the user.
		 * @return void
		 */

		isActive:function(){
			return (this.isPlaying() || this.isPaused() || this.isVideoEnding() || this.isBuffering());
		},

		/**
		 * Checks to see if player meaningfully exists and is DOM-ready
		 *
		 * @return void
		 */
		isReady:function(){
			return this.domReady.promise();
		},

    /**
     * isPlayerLoaded, checks for the existance of this.player and that it is an object.
     * @returns {boolean} true|false
     */
    isPlayerLoaded: function(){
      return (this.player != null && typeof this.player == "object");
    },


    /**
     * Clear the interval
     *
     * @return void
     */
    clearInterval: function(){
      if (this.interval) {
        return window.clearInterval(this.interval);
      }

      return false;
    },

    /**
     Pauses the currently playing video. The final player state after this function executes will be paused
     unless the player is in the ended (0) state when the function is called, in which case the player state will not
     change.

     @returns {undefined}
     */
    pause: function(){
      if (this.isPlayerLoaded()) {
        this.clearInterval();
        return this.player.pauseVideo();
      }

      return false;
    },

    /**
     * Check if player is currently paused
     *
     * @return {boolean} true if paused otherwise false
     */
    isPaused: function(){
      if ( this.isPlayerLoaded() && this.player.hasOwnProperty('getPlayerState') ) {
        return (this.player.getPlayerState() == PlayerYouTubeHTML5.STATES.paused);
      }

      return false;
    },

    /**
     * Check if player is currently playing
     *
     * @return {boolean} true if playing otherwise false
     */
    isPlaying: function(){
      if ( this.isPlayerLoaded() && this.player.hasOwnProperty('getPlayerState') ) {
        return (this.player.getPlayerState() == PlayerYouTubeHTML5.STATES.playing);
      }

      return false;
    },

    /**
     * Check if player has ended
     *
     * @return {boolean} true if ended otherwise false
     */
    isEnded: function(){
      if ( this.isPlayerLoaded() && this.player.hasOwnProperty('getPlayerState') ) {
        return (this.player.getPlayerState() == PlayerYouTubeHTML5.STATES.ended);
      }

      return false;
    },

    /**
     * Check if player has ended
     *
     * @return {boolean} true if ended otherwise false
     */
    isUnstarted: function(){
      if ( this.isPlayerLoaded() && this.player.hasOwnProperty('getPlayerState') ) {
        return (this.player.getPlayerState() == PlayerYouTubeHTML5.STATES.unstarted);
      }

      return false;
    },

    /**
     * Check if player is buffering
     *
     * @return {boolean} true if buffering otherwise false
     */
    isBuffering: function(){
      if ( this.isPlayerLoaded() && this.player.hasOwnProperty('getPlayerState') ) {
        var plState = this.player.getPlayerState();
        var buffering = plState == PlayerYouTubeHTML5.STATES.buffering;
        var unstarted = plState == PlayerYouTubeHTML5.STATES.unstarted;
        var cued = plState == PlayerYouTubeHTML5.STATES.cued;
        return (buffering || (unstarted && this.loadVideoCalled) || (cued && this.loadVideoCalled));
      }
      return false;
    },

    /**
     Mutes the player.

     @returns {undefined}
     */
    mute: function(){
      if ( this.isPlayerLoaded() ) {
        return this.player.mute();
      }

      return false;
    },

    /**
     Un-mutes the player.

     @returns {undefined}
     */
    unmute: function(){
      if (this.isPlayerLoaded()) {
        return this.player.unMute();
      }
      return false;
    },

    /**
     Checks whether or not the player is muted.

     @returns {boolean}
     */
    isMuted: function(){
      if (this.isPlayerLoaded() && this.player.hasOwnProperty('isMuted')) {
        return this.player.isMuted();
      }

      return false;
    },

    /**
     Seeks to a specified time in the video. If the player is paused when the function is called, it will
     remain paused. If the function is called from another state (playing, video cued, etc.), the player
     will play the video.

     @param {integer} seconds - Time in the video to seek to.
     */
    seek: function(seconds){
      if (this.isPlayerLoaded()) {
        seconds = Math.round(seconds);
        //this.player.stopVideo();
        Player.trigger(Player.Events.VideoSeeking);
        this.player.seekTo(seconds, true);
        return true;
      }

      return false;
    },

    /**
     Sets the volume. Accepts an integer between 0 and 100.

     @param {integer} volume - 0 to 100
     */
    setVolume: function(volume){
      if (this.isPlayerLoaded()) {
        return this.player.setVolume(volume);
      }

      return false;
    },

    /**
     Returns the current volume level.

     @returns {integer} Volume - 0 to 100
     */
    getVolume: function(){
      if (this.isPlayerLoaded()) {
        return this.player.getVolume();
      }

      return false;
    },

    /**
     * Dispatch event with id: triggers the correct system event based on
     * youtube event id
     *
     * @param {integer} id event id
     *
     * @return void
     */
    dispatchEvent: function(id){
      var eventId;
      if (typeof id === "object") {
        eventId = id.data;
      } else {
        eventId = id;
      }

      switch(eventId) {
        case PlayerYouTubeHTML5.STATES.unstarted:
          Player.trigger(Player.Events.VideoUnstarted, this.getUpdateInfo());
          break;
        case PlayerYouTubeHTML5.STATES.ended:
          this.clearInterval();
          Player.trigger(Player.Events.VideoEnded, this.getUpdateInfo());
          break;
        case PlayerYouTubeHTML5.STATES.playing:
          Player.trigger(Player.Events.VideoPlaying, this.getUpdateInfo());
          break;
        case PlayerYouTubeHTML5.STATES.paused:
          Player.trigger(Player.Events.VideoPaused, this.getUpdateInfo());
          break;
        case PlayerYouTubeHTML5.STATES.buffering:
          Player.trigger(Player.Events.VideoBuffering, this.getUpdateInfo());
          break;
				case PlayerYouTubeHTML5.STATES.ready:
					Player.trigger(Player.Events.VideoPlayerReady, this.getUpdateInfo());
					break;
        case PlayerYouTubeHTML5.STATES.cued:
          Player.trigger(Player.Events.VideoCued, this.getUpdateInfo());
          break;
        default:
          throw "Unknown event with id: " + id;
      }
    },

    /**
     * From the YT API Documentation:
     *     player.setSize(width:Number, height:Number):Object
     *     Sets the size in pixels of the <iframe> that contains the player.
     * @private
     */
    resize: function(width, height){
      if ( this.isPlayerLoaded() ){
        return this.player.setSize(width, height);
      }
      return false;
    },

    _injectScript: function(){
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    },

    render: function() {
      if ( this.renderedOnce ) {
        return this.el;
      }
			var THIS=this;
      Player.prototype.render.call(this);
      window.onYouTubeIframeAPIReady = function() {
        var player = new YT.Player('PlayerReal', {
          events: {
            'onStateChange': function(e) {
              THIS.dispatchEvent(e);
            },
            'onReady': function(e) {
              THIS.player = player;
              THIS.domReady.resolve();
            },
            'onError':function(e) {
              // nothing yet...
            }
          }
        });
      };
      
      this._injectScript();
      this.renderedOnce = true;
      return this.el;
    }
  });

  PlayerYouTubeHTML5.STATES = {
    unstarted:  -1,
    ended:      0,
    playing:    1,
    paused:     2,
    buffering:  3,
    ready:      4,
    cued:       5
  };
  
	return PlayerYouTubeHTML5;
});
