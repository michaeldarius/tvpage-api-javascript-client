define([
"tvp/player/Player",
"tvp/player/PlayerYouTubeHTML5"
],
	function(Player, PlayerYouTubeHTML5) {
  /**
   * Player class
   * This is the Player class
   * 
   * @name Player
   * @class Player
   * @constructor
   * @return Player Object
   */
  var instance = null;
  function PlayerFactory(){
    
  };
  
  PlayerFactory.prototype =  {};
  PlayerFactory.prototype.constructor = PlayerFactory;
  
  PlayerFactory.prototype.make = function(type){
    return new PlayerYouTubeHTML5();
  };
  
  PlayerFactory.getInstance = function(){
    if( instance === null ){
      instance = new PlayerFactory();
    }
    return instance;
  };
  
  
	return PlayerFactory.getInstance();
});
