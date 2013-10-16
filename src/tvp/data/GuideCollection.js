define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
	var GuideCollection = TVPCollection.extend({
    _url: '/guide/'
	});

	return GuideCollection;
});
