define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
		var SpotCollection = TVPCollection.extend({
			_url: '/spot/link/container/'
		});
		return SpotCollection;
	});
