define([
  "jquery",
  'underscore',
	"backbone",
  "tvp/data/Model"
],

function($, _, Backbone, TVPModel) {
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
    
    parse: function(response) {
      return response;
    }, 
    
    sync: function(method, model, options) {
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url(),
            processData: false
        }, options);

        return $.ajax(params);
    },
            
    setKey: function(key){
      this.key = key;
    },
            
    getKey: function(){
      return this.key;
    },
    
    getBaseUrl: function(){
      return this.baseUrl;
    },
            
    setBaseUrl: function(url){
      this.baseUrl = url;
    },
            
    getPath: function(){
      return this._url + this.getKey();
    },
            
    url: function(){
      return this.getBaseUrl() + this.getPath();
    }       
  });
  
	return TVPCollection;
});
