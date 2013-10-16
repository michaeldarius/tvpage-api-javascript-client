define([
	"tvp/View",
],
	function(TVPView) {
  /**
   * Player class
   * This is the Player class
   * 
   * @name Player
   * @class Player
   * @constructor
   * @return Player Object
   */   
  var Player = TVPView.extend({

    constructor: function (app, options) {
      this.player = null;
      this.interval = null;
      this.videoId = 0;
      this.videoEndingTriggered = false;
      this.maximized  = null;
			this.domReady = $.Deferred();
      this.defaultQuality = "default";
      this.loop = true;
      this.callbacks = {
        minimize: function() {},
        maximize: function() {}
      };

      TVPView.call(this, app, options);
    },


    initialize: function(){
      TVPView.prototype.initialize.call(this);
      this.eventHandler.bind(Player.Events.VideoEnded, this.handleVideoEnded, this);
			this.eventHandler.bind(Player.Events.VideoIdSet, this.handleVideoIdSet,this);
    },

		handleHomeClicked:function(e){
      //TODO: Fix the LOGO CLICK HERE I THINK, I DONT KNOW WHY THIS CODE IS HERE ACTUALLY - MB SHOULD BE IN MENUBAR?

			this.stopPlayer();
      //this.resizeFrame(null, null, null, null, "auto");
		},

		handleVideoEnded: function(e){
			this.videoEnded = true;
		},
            
		handleVideoIdSet: function(e){
			this.videoEnded = false;
		},

    isMaximized: function(){
      return this.maximized === true;
    },

    isMinimized: function(){
      return this.maximized === false;
    },

    resize: function(width, height) {
      throw new Error('Resize method must be implemented on the player');
    },

    isActive: function() {
      throw new Error('isActive() must be implemented');
    },

    setMaximized:function(maxVal){
      this.maximized = maxVal;
    },
            
    toggleBars: function(state){
      throw "Must be implemented";
    },
            
		playerReady:function(){
			throw('This needs to be implemented.')
		},
            
    destroy: function(){
      throw "must be implemented";
    },

		/**
		 * Hides the player and stops it.
		 * @return {*}
		 */

		stopPlayer:function(){
			if(this.stop){
				this.stop();
			}
		},

    getVideoId: function(){
      return this.videoId;
    },

    clearVideoId:function(){
      this.videoId = false;
      this.stopPlayer();
      this.loadVideoCalled = false;
    },

    setLoop:function(toLoop){
      this.loop = toLoop;
    },

    getLoop:function(){
      return this.loop;
    },

    setVideoId: function(videoId){
      this.videoId = videoId;
    },
    /**
     Load a video via provider's ID

     @param {string} id - The unique video id from the provider
     */
    loadVideoById: function(){
      throw "Method not implemented!";
    },
            
    /**
     Cue a video via provider's ID

     @param {string} id - The unique video id from the provider
     */
    cueVideoById: function(){
      throw "Method not implemented!";
    },

    /**
     Return the actual video quality of the current video.

     @returns {string}
     */
    getPlaybackQuality: function(){
      throw "Method not implemented!";
    },

    /**
     Set the playback quality for the current video

     @param {string} quality - Set the quality level based on a string
     */
    /*setPlaybackQuality: function(quality){
      throw "Method not implemented!";
    },*/

    /**
     Get an array of available quality levels

     @returns {array} Returns an array of quality levels
     */
    getAvailableQualityLevels: function() {

    },
    
    /**
     Play the video. Plays the currently cued/loaded video. The final player state after this function executes will be playing.

     @returns {undefined}
     */
    play: function(){
      throw "Method not implemented!";
    },

    /**
     Pauses the currently playing video. The final player state after this function executes will be paused
     unless the player is in the ended (0) state when the function is called, in which case the player state will not
     change.

     @returns {undefined}
     */
    pause: function(){
      throw "Method not implemented!";
    },

    /**
     Mutes the player.

     @returns {undefined}
     */
    mute: function(){
      throw "Method not implemented!";
    },

    /**
     Un-mutes the player.

     @returns {undefined}
     */
    unmute: function(){
      throw "Method not implemented!";
    },

    /**
     Checks whether or not the player is muted.

     @returns {boolean}
     */
    isMuted: function(){
      throw "Method not implemented!";
    },

    /**
     Seeks to a specified time in the video. If the player is paused when the function is called, it will
     remain paused. If the function is called from another state (playing, video cued, etc.), the player
     will play the video.

     @returns {undefined}
     */
    seek: function(){
      throw "Method not implemented!";
    },

    /**
     Sets the volume. Accepts an integer between 0 and 100.

     @param {integer} volume - 0 to 100
     */
    setVolume: function(volume){
      throw "Method not implemented!";
    },

    /**
     Returns the current volume level.

     @returns {integer} volume - 0 to 100
     */
    getVolume: function(){
      throw "Method not implemented!";
    },
    
    /**
     * Dispatch event with id
     * 
     * @param {integer} event id
     * 
     * @return void
     */
    dispatchEvent: function(id){
      throw "Method must be implemented!";
    },

    /**
     * Dispatch READY event with {}
     *
     * @param {object} {id, event}
     *
     * @return void
     */
    dispatchReadyEvent: function(e) {
      throw "Method must be implemented!";
    },

    /**
     * Dispatch ERROR event with {}
     *
     * @param {object} {id, event}
     *
     * @return void
     */
    dispatchErrorEvent: function(e) {
      throw "Method must be implemented!";
    },
    
    /**
     * Checks whether internal player has been loaded
     * 
     * @return {boolean} TRUE if internal player loaded otherwise FALSE
     */
    isPlayerLoaded: function(){
      throw "must be implemented";
    },
   
    isPaused: function(){
      throw "Must be implemented";
    },

    isPlaying: function(){
      throw "Must be implemented";
    },
    
    isEnded: function(){
      throw "Must be implemented";
    },
    
    /**
     * Check whether video is unstarted
     * 
     * @return {boolean} TRUE if unstarted otherwise FALSE
     */
    isUnstarted: function(){
      throw "Must be implemented";      
    }
  });
  
  // make globally available for event triggering of external player
  Player.dispatchEvent = function(id){
    if ( typeof Player.instance == "object" ) {
      Player.instance.dispatchEvent(id);
    } else {
      throw "No player instance available";
    }
  };
  
  Player.setInstance = function(instance){
    Player.instance = instance;
  };
  
  Player.getInstance = function(){
    return Player.instance;
  };
  
  Player.PlaybackQualities = {
    small: "small",
    medium: "medium",
    large: "480p",
    hd720: "720p",
    hd1080: "1080p",
    highres: "highres"
  };
  
  Player.Events = {
    VideoEnded: "player:video:ended",
    VideoIdSet: "player::video::id",
    VideoUnstarted: "player::video::unstarted",
    VideoEnded: "player::video::ended",
    VideoPlaying: "player::video::playing",
    VideoPaused: "player::video::paused",
    VideoBuffering: "player::video::buffering",
    VideoPlayerReady: "player::ready",
    VideoCued: "player::video::cued"
  };
  
  //window.player = Player;
  
	return Player;
});
