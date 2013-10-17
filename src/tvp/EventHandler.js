define([
	"backbone"
],

	function(Backbone) {
    
    var instance = null;
    function EventHandler(){

    };

    EventHandler.prototype =  {};
    EventHandler.prototype.constructor = EventHandler;

    EventHandler.getInstance = function(){
      if( instance === null ){
        instance = _.extend({}, Backbone.Events);
      }
      return instance;
    };

    return EventHandler.getInstance();
  });
   