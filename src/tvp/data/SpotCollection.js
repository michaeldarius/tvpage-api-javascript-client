define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
    /**
     * Spot Collection
     * 
     * @type @exp;TVPCollection@call;extend
     */
		var SpotCollection = TVPCollection.extend({
			_url: '/spot/link/container/'
		});
		return SpotCollection;
	});
