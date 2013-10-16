define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
	var GuideCollection = TVPCollection.extend({
    _url: '/guide/',
    
    parse:function(response){
      _.each(response,function(itm,n){
        if(itm.assetDetails){
          for (var attr in itm.assetDetails){
            itm[attr] = itm.assetDetails[attr];
          }
        }
      });
      return response;
    },
	});

	return GuideCollection;
});
