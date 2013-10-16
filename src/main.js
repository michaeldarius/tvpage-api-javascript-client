// Save reference to the global object
var root = this;
var TVPage = root.TVPage = {};
TVPage.__global = {};
TVPage.config = function(options){
  TVPage.__global.options = options;
};

TVPage.ready = function(callback){
  TVPage.__global.callback = callback;
};
// Start the main app logic.
requirejs([
  "tvp/Interface"
],
  function(TVPInterface) {
    TVPage.getSpots = function(videoId, success, failure){
      return TVPage.interface.getSpots(videoId, success, failure);
    };
    
    TVPage.getTVPage = function(pageId, success, failure){
      return TVPage.interface.getTVPage(pageId, success, failure);
    };
    
    TVPage.getChannel = function(channelId){
      return TVPage.interface.getChannel(channelId);
    };
    
    TVPage.getChannelThumbnail = function(channelId){
      return TVPage.interface.getChannelThumbnail(channelId);
    };
    
    TVPage.getVideoThumbnail = function(videoId){
      return TVPage.interface.getVideoThumbnail(videoId);
    };
    
    TVPage.getThumbnail = function(videoId){
      return TVPage.interface.getThumbnail(videoId);
    };
    
    TVPage.getChildren = function(id){
      return TVPage.interface.getChildren(id);
    }
    
    TVPage.play = function(){
      throw new Error("Not yet implemented");
    };
    
    TVPage.pause = function(){
      throw new Error("Not yet implemented");
    };
    
    TVPage.loadById = function(videoId){
      throw new Error("Not yet implemented");
    };
    
    TVPage.seekTo = function(seek){
      throw new Error("Not yet implemented");
    };

    TVPage.volume = function(volume){
      throw new Error("Not yet implemented");
    };
    
    TVPage.init = function(){
      var options, callback;
      if ( !TVPage.__global.hasOwnProperty('options') ){
        options = {};
      } else {
        options = TVPage.__global.options;
      }
      
      if ( !TVPage.__global.hasOwnProperty('callback') ){
        callback = null;
      } else {
        callback = TVPage.__global.callback;
      }
      
      TVPage.interface = new TVPInterface(options, callback);
      if (typeof callback == "function"){
        callback();
      }
    };
    
    TVPage.init();
  });

