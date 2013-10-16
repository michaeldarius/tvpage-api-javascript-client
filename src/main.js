// Save reference to the global object
var root = this;
console.log("ROOT", root);
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
  'jquery',
  "tvp/Interface"
],
  function($, TVPInterface) {
    TVPage.getSpots = function(videoId, success, failure){
      
    };
    
    TVPage.getTVPage = function(pageId, success, failure){
      
    };
    
    TVPage.getChannel = function(channelId, success, failure){
      
    };
    
    TVPage.getChannelThumbnail = function(channelId, success, failure){
      
    };
    
    TVPage.getVideoThumbnail = function(videoId, success, failure){
      
    };
    
    TVPage.play = function(){
      
    };
    
    TVPage.pause = function(){
      
    };
    
    TVPage.loadById = function(videoId){
      
    };
    
    TVPage.seekTo = function(seek){
      
    };

    TVPage.volume = function(volume){
      
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
      
      TVPage.__global.instance = new TVPInterface(options, callback);
    };
    
    TVPage.init();
  });

