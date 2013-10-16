define([
  "jquery",
  'underscore',
	"backbone",
  "tvp/data/Model"
],

function($, _, Backbone, TVPModel) {
  
  /**
   * Abstract Collection 
   * 
   * @type @exp;Backbone@pro;Collection@call;extend
   */
  var TVPCollection = Backbone.Collection.extend({
    model: TVPModel,
    constructor: function (models, options) {
      this.key = -1;
      if (_.isObject(options) && _.has(options,'baseUrl')) {
        this.baseUrl = options.baseUrl;
      } else {
        this.baseUrl = "https://www.tvpage.com/api";
      }
      
      Backbone.Collection.call(this, models, options);
    },
    
    /**
     * Parse response 
     * 
     * @param {type} response
     * @returns {unresolved}
     */
    parse: function(response) {
      return response;
    }, 
    
    /**
     * Perform JSONP request
     * 
     * @param {type} method
     * @param {type} model
     * @param {type} options
     * 
     * @returns {@exp;$@call;ajax}
     */
    sync: function(method, model, options) {
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url(),
            processData: false
        }, options);

        return $.ajax(params);
    },
      
    /**
     * Set the key for url 
     * 
     * @param {type} key
     * 
     * @returns {undefined}
     */        
    setKey: function(key){
      this.key = key;
    },
       
    /*
     * Retrieve collection key
     * 
     * @return {int} key
     */        
    getKey: function(){
      return this.key;
    },
    
    /**
     * Get base url
     * 
     * @returns {unresolved}
     */
    getBaseUrl: function(){
      return this.baseUrl;
    },
    
    /**
     * Set base url
     * 
     * @param {type} url
     * @returns {undefined}
     */        
    setBaseUrl: function(url){
      this.baseUrl = url;
    },
       
    /**
     * Get path
     * 
     * @returns {unresolved}
     */        
    getPath: function(){
      return this._url + this.getKey();
    },
       
    /**
     * Get URL
     * 
     * @returns {unresolved}
     */        
    url: function(){
      return this.getBaseUrl() + this.getPath();
    }       
  });
  
	return TVPCollection;
});
