define([
  "underscore",
  "tvp/data/SpotCollection",
  "tvp/data/GuideCollection",
  "tvp/player/PlayerFactory"
],

/**
 * Class Interface
 * 
 * @param {type} _
 * @param {type} SpotCollection
 * @param {type} GuideCollection
 * @returns {_L11.Interface}
 */
function(_, SpotCollection, GuideCollection, PlayerFactory) {
  
  /**
   * Class Interface
   * 
   * @param {type} options
   * @param {type} callback
   * @returns {_L16.Interface}
   */
  function Interface(options, callback){
    this.options = options || {};
    this.spotCollection = null;
    this.guideCollection = null;
    this.callback = callback;
    this.initPlayer();
  };

  Interface.prototype =  {};
  Interface.prototype.constructor = Interface;
  
  /**
   * Returns a $.Deferred.promise object. 
   * 
   * @param {type} videoId Video ID to fetch spots for
   * @param {type} success success callback function
   * @param {type} failure failure callback function
   * 
   * @returns {$.Deferred.promise}
   */
  Interface.prototype.getSpots = function(videoId, success, failure){
    var THAT = this;
    this.spotCollection = new SpotCollection();
    this.spotCollection.setKey(videoId);
    var fetched = this.spotCollection.fetch();
    if (typeof success == "function") {      
      fetched.done(function(){
        success(videoId, THAT.spotCollection.toJSON());
      });
    }

    if (typeof failure == "function") {
      fetched.fail(function(){
        failure(videoId);
      });
    }
    
    return fetched;
  };
  
  /**
   * Get TVPage 
   * 
   * @param {int} pageId
   * @param {type} success callback function
   * @param {type} failure callback function
   * 
   * @returns {$.Deferred.promise}
   */
  Interface.prototype.getTVPage = function(pageId, success, failure){
    var THAT = this;
    this.guideCollection = new GuideCollection();
    this.guideCollection.setKey(pageId);
    var fetched = this.guideCollection.fetch();
    if (typeof success == "function") {
     fetched.done(function(){
       success(pageId, THAT.guideCollection.toJSON());
     });       
    } 

    if (typeof failure == "function") {
      fetched.fail(function(){
        failure(pageId);
      });
    }
    
    return fetched;
  };
  
  /**
   * Get array of videos for channel
   * 
   * @param {type} channelId
   * 
   * @returns {array} array with objects
   */
  Interface.prototype.getChannelVideos = function(channelId){
    return this.getChildren(channelId);
  };
  
  /**
   * Get array of all children of this id 
   * 
   * @param {type} id
   * 
   * @returns {array} array with objects
   */
  Interface.prototype.getChildren = function(id){
    var children = [];
    if ( _.isObject(this.guideCollection) ) {
      var filteredItems = this.guideCollection.filter(function(item){
        return item.get("parentId") == id;
      });
      
      if (filteredItems && filteredItems.length) {
        var i, len = filteredItems.length;
        for (i=0;i<len;i++){
          children.push(filteredItems[i].toJSON());
        }
      }
    }
    return children;    
  };

  /**
   * Get channel object 
   * 
   * @param {type} channelId
   * 
   * @returns {object} json object
   */
  Interface.prototype.getChannel = function(channelId){
    return this.getItem(channelId);
  };
  
  /**
   * Retrieve channel thumbnail.. 
   * 
   * @param {type} channelId
   * 
   * @returns {string}
   */
  Interface.prototype.getChannelThumbnail = function(channelId){
    return this.getThumbnail(channelId);
  };
  
  /**
   * Retrieve video thumnail
   * 
   * @param {type} videoId
   * 
   * @returns {string}
   */
  Interface.prototype.getVideoThumbnail = function(videoId){
    return this.getThumbnail(videoId);
  };
  
  /**
   * Retrieve thumbnail for item
   * 
   * @param {type} itemId
   * 
   * @returns {string} thumbnail
   */
  Interface.prototype.getThumbnail = function(itemId){
    var thumbnail = null;
    var item = this.getItem(itemId);
    if ( _.isObject(item) && _.has(item, 'thumbnailUrl') ) {
      thumbnail = item.thumbnailUrl;
    }
    
    return thumbnail;
  };
  
  /**
   * Fetch an item from the collection
   * 
   * @param {int} itemId
   * 
   * @returns {object}
   */
  Interface.prototype.getItem = function(itemId){
    var item = null;
    if ( _.isObject(this.guideCollection) ) {
      var model = this.guideCollection.find(function(item){
        return item.get("id") == itemId;
      });
      
      if ( _.isObject(model) ) {
        item = model.toJSON();
      }
    }
    
    return item;
  };
  
  Interface.prototype.initPlayer = function(type){
    this.player = PlayerFactory.make();
    if ( !_.has(this.options, 'domId') || typeof this.options.domId !== "string" || this.options.domId.length<=0) {
      throw new Error("No DOM Id found for the player embed");
    }
    this.player.render(this.options.domId);
    this.ready();
  };
  
  Interface.prototype.ready = function(){
    var isReady = this.player.isReady();
    var THAT = this;
    isReady.done(function(){
      THAT.playerReadyCallback();
    });
    
    isReady.fail(function(){
      throw new Error("Failed to load player");
    });
  }
  
  Interface.prototype.playerReadyCallback = function(){
    if (typeof this.callback == "function"){
      var callback = this.callback;
      callback();
    }
  };  

  Interface.prototype.loadById = function(videoId){
     var video = this.getItem(videoId);
     if (!_.isObject(video) || !_.has(video, "videoId")) {
       return false;
     }
     
     return this.player.loadVideoById(video.videoId);
  };  

  Interface.prototype.seekTo = function(seek){
    return this.player.seekTo(seek);
  };  
  
  Interface.prototype.volume = function(volume){
    return this.player.volume(volume);
  };  
  
  Interface.prototype.play = function(){
    return this.player.play();
  };  

  Interface.prototype.pause = function(){
    return this.player.pause();
  };  
  
  return Interface;
});