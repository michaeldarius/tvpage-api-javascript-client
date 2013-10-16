define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
	var GuideCollection = TVPCollection.extend({
    getPath: function(){
      return '/guide/' + this.getKey();
    },
	});

	return GuideCollection;
});
