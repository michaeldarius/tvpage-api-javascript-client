define(
  [
    "tvp/Interface",
    "sinon"
  ], function(TVPInterface, sinon){
  describe("Guide Collection", function() {
    var interface;
    beforeEach(function(){
      interface = new TVPInterface();
      this.server = sinon.fakeServer.create();
      var guide = 'jQuery18309431053311564028_1381942779848([{"id":"70603","typeId":"3","loginId":"9","titleText":"Banner Test","titleTextEncoded":"Banner_Test","settings":{"canvasImage":"260716674-0.jpg","colorClass":"light","canvasType":"cropped","canvasCropped":"260716674-04522048914.jpg"},"timeModified":1380575240,"parentId":0,"sortOrder":0},{"id":"70639","typeId":"2","loginId":"9","titleText":"Training","titleTextEncoded":"Training","settings":{},"timeModified":1380575240,"parentId":70603,"sortOrder":0},{"id":"70632","typeId":"1","loginId":"9","titleText":"lowres","titleTextEncoded":"lowres","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"DhIRmZ1CxqA","hookText":"","thumbnailUrl":"https:\/\/i.ytimg.com\/vi\/DhIRmZ1CxqA\/mqdefault.jpg","mediaDuration":"31","hdvFlag":0,"uploadDate":1375402732,"prettyDuration":"00:31"},"parentId":"70639","sortOrder":1},{"id":"70634","typeId":"1","loginId":"9","titleText":"TVPage Add Videos FINAL CUT","titleTextEncoded":"TVPage_Add_Videos_FINAL_CUT","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"zY3QEF-3EfI","hookText":"TVPage Test Description","thumbnailUrl":"https:\/\/i1.ytimg.com\/vi\/zY3QEF-3EfI\/mqdefault.jpg","mediaDuration":"47","hdvFlag":1,"uploadDate":1375401090,"prettyDuration":"00:47"},"parentId":"70639","sortOrder":0},{"id":"70635","typeId":"1","loginId":"9","titleText":"TVPage Customize FINAL CUT","titleTextEncoded":"TVPage_Customize_FINAL_CUT","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"M2qvnuc_NuY","hookText":"","thumbnailUrl":"https:\/\/i1.ytimg.com\/vi\/M2qvnuc_NuY\/mqdefault.jpg","mediaDuration":"92","hdvFlag":1,"uploadDate":1375400328,"prettyDuration":"01:32"},"parentId":"70639","sortOrder":2},{"id":"70636","typeId":"1","loginId":"9","titleText":"TVPage Organize FINAL CUT","titleTextEncoded":"TVPage_Organize_FINAL_CUT","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"RUkQr9oywig","hookText":"","thumbnailUrl":"https:\/\/i1.ytimg.com\/vi\/RUkQr9oywig\/mqdefault.jpg","mediaDuration":"44","hdvFlag":1,"uploadDate":1375399723,"prettyDuration":"00:44"},"parentId":"70639","sortOrder":3},{"id":"70637","typeId":"1","loginId":"9","titleText":"TVPage Share FINAL CUT","titleTextEncoded":"TVPage_Share_FINAL_CUT","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"9xzME-8BPfg","hookText":"","thumbnailUrl":"https:\/\/i1.ytimg.com\/vi\/9xzME-8BPfg\/mqdefault.jpg","mediaDuration":"68","hdvFlag":1,"uploadDate":1375398903,"prettyDuration":"01:08"},"parentId":"70639","sortOrder":4},{"id":"70638","typeId":"1","loginId":"9","titleText":"TVPage Basics FINAL CUT","titleTextEncoded":"TVPage_Basics_FINAL_CUT","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"IZMQx2bS-cE","hookText":"","thumbnailUrl":"https:\/\/i1.ytimg.com\/vi\/IZMQx2bS-cE\/mqdefault.jpg","mediaDuration":"30","hdvFlag":1,"uploadDate":1375397914,"prettyDuration":"00:30"},"parentId":"70639","sortOrder":5},{"id":"70633","typeId":"1","loginId":"9","titleText":"TVPVideo","titleTextEncoded":"TVPVideo","settings":{},"timeModified":1380575240,"assetDetails":{"author":"Testo Guya","videoId":"HEmrpTbun44","hookText":"","thumbnailUrl":"https:\/\/i.ytimg.com\/vi\/HEmrpTbun44\/mqdefault.jpg","mediaDuration":"65","hdvFlag":1,"uploadDate":1375394740,"prettyDuration":"01:05"},"parentId":"70603","sortOrder":1}])';
      var spots = 'jQuery18309431053311564028_1381942779848([{"id":"247","connectId":"69","containerId":"70634","loginId":"9","data":"{\"displayTitle\":\"Spot Title 1\",\"linkUrl\":\"http:\\\/\\\/bing.com\",\"actionText\":\"Spot Button 1\",\"imageUrl\":\"\"}","date_created":"1375408713","date_modified":"1375408713","type":"1","referenceId":"0","parentId":0},{"id":"248","connectId":"70","containerId":"70634","loginId":"9","data":"{\"displayTitle\":\"Spot Title 2\",\"linkUrl\":\"http:\\\/\\\/yahoo.com\",\"actionText\":\"Spot Button 2\",\"imageUrl\":\"\"}","date_created":"1375408724","date_modified":"1375408724","type":"1","referenceId":"0","parentId":"69"}])';
      
      this.server.respondWith(
        "GET",
        "/.*\/guide\/.*/",
        [
          200, 
          {"Content-Type": "application/json"},
          '{"response":"' + guide + '"}'
        ]
      );
        
      this.server.respondWith(
        "GET",
        "/.*\/spot\/link\/container\/.*/",
        [
          200, 
          {"Content-Type": "application/json"},
          '{"response":"' + spots + '"}'
        ]
      );
    });
    afterEach(function(){
      interface = null;
    });

    it('getTVPage',function(){
      var id = 70603;
      var returnedModels = null;
      var returnedId = null;
      var success = function(tvpageId, models){
        returnedModels = models;
        returnedId = tvpageId;
      };
      
      interface.getTVPage(id, success);
      waitsFor(function(){
        return (typeof returnedModels == "object" && id == returnedId);
      }, "The collection should fetch successfully.", 2000);
    });
    
    it('getSpots',function(){
      var id = 70634;
      var returnedModels = null;
      var returnedId = null;
      var success = function(videoId, models){
        returnedModels = models;
        returnedId = videoId;
      };
      
      interface.getSpots(id, success);
      waitsFor(function(){
        return (typeof returnedModels == "object" && id == returnedId && returnedModels.length > 0);
      }, "Failed to retrieve spots.", 2000);
    });
    
    it('getChannelVideos',function(){
      var id = 70603;
      var returnedModels = null;
      var returnedId = null;
      var success = function(tvpageId, models){
        returnedModels = models;
        returnedId = tvpageId;
      };
      
      interface.getTVPage(id, success);
      waitsFor(function(){
        var models = interface.getChannelVideos(70639);
        return (models.length > 0);
      }, "Failed to retrieve channel videos", 2000);
    });
    
    it('getChannel, getThumbnail',function(){
      var id = 70603;
      var returnedModels = null;
      var returnedId = null;
      var success = function(tvpageId, models){
        returnedModels = models;
        returnedId = tvpageId;
      };
      
      interface.getTVPage(id, success);
      waitsFor(function(){
        var channel = interface.getChannel(70639);
        var thumbnail = interface.getThumbnail(70637);
        return (_.isObject(channel) && channel.id == 70639 && thumbnail && thumbnail.length > 0);
      }, "Failed to fetch channel", 2000);
    });     
  });
});
  