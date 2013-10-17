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
  "jquery",
  "tvp/Interface"
],
  function($, TVPInterface) {
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
      return TVPage.interface.play();
    };
    
    TVPage.pause = function(){
      return TVPage.interface.pause();
    };
    
    TVPage.loadById = function(videoId){
      return TVPage.interface.loadById(videoId);
    };
    
    TVPage.seekTo = function(seek){
      return TVPage.interface.seekTo();
    };

    TVPage.volume = function(volume){
      return TVPage.interface.volume(volume);
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
    };
    
    $(document).ready(function(){
      TVPage.init();
    });
  });

