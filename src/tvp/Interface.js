define([
  "underscore",
  "tvp/data/SpotCollection",
  "tvp/data/GuideCollection"
  //"tvp/player/Player",
],

function(_, SpotCollection, GuideCollection) {
  function Interface(options, callback){
    this.spotCollection = null;
    this.guideCollection = null;
  };

  Interface.prototype =  {};
  Interface.prototype.constructor = Interface;
  
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
  };
  
  Interface.prototype.getTVPage = function(pageId, success, failure){
    var THAT = this;
    this.guideCollection = new GuideCollection();
    this.guideCollection.setKey(pageId);
    var fetched = this.guideCollection.fetch();
    fetched.done(function(){
      success(pageId, THAT.guideCollection.toJSON());
    });

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
  };

  Interface.prototype.getChannelVideos = function(channelId){
    var videos = null;
    if ( _.isObject(this.guideCollection) ) {
      videos = this.guideCollection.filter(function(item){
        return item.get("parentId") == channelId;
      });
    }
    return videos;
  };

  Interface.prototype.getChannel = function(channelId){
    return this.getItem(channelId);
  };
  
  Interface.prototype.getChannelThumbnail = function(channelId){
    return this.getThumbnail(channelId);
  };
  
  Interface.prototype.getVideoThumbnail = function(videoId){
    return this.getThumbnail(videoId);
  };
  
  Interface.prototype.getThumbnail = function(itemId){
    var thumbnail = null;
    var item = this.getItem(itemId);
    if ( _.isObject(item) && _.has(item, 'thumbnailUrl') ) {
      thumbnail = item.thumbnailUrl;
    }
    
    return thumbnail;
  };
  
  Interface.prototype.getItem = function(itemId){
    var item = null;
    if ( _.isObject(this.guideCollection) ) {
      var model = this.guideCollection.find(function(item){
        return item.get("id") == itemId;
      });
      
      if ( _.isObject(model) ) {
        item = model.toJSON();
        console.log("FOUND MODEL", model, item);
      }
    }
    
    return item;
  };

  return Interface;
});