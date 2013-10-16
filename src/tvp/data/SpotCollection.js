define([
	"tvp/data/Collection"
],
	function(TVPCollection) {
		var SpotCollection = TVPCollection.extend({
			urlRoot: '/api/spot/link/container/',
			filter:null,
			setFetchParams:function(videoId,tvpId){
				this.videoId = videoId;
        this.tvpId = tvpId;
			},
			setFilter: function(filter){
				this.filter = filter;
			},
			getFilter: function(){
				return this.filter;
			},
			url:function(){
				var t=this;
				return t.urlRoot+ t.videoId;
			},
			parse:function(response){
				var t=this;
				_.each(response,function(itm,n){
					if(typeof itm.data == 'string'){
						itm.data = $.parseJSON(itm.data);
					}
				});
				return response;
			},
      initialize: function() {
        TVPCollection.prototype.initialize.call(this);

        this.position = 0;
      },

      getDataset: function(resultCount) {
        if (!resultCount) {
          throw Error("Must receive a number of items to retrieve");
        }

        var start = this.position;
        var end = this.position+resultCount;
        if (end > this.length) {
          end = this.length;
        }
        var data = this.slice(start, end);
        this.position = end;

        return data;
      }
		});
		return SpotCollection;
	});
