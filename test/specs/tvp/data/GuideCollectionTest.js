define(["tvp/data/GuideCollection"], function(GuideCollection){
  describe("Guide Collection", function() {
    var guideCollection;
    beforeEach(function(){
      guideCollection = new GuideCollection();
      guideCollection.setKey(70603);
      guideCollection.fetch();
    });
    afterEach(function(){
      guideCollection = null;
    });

    it('should return a list of containers, including the TVPage in the first position',function(){
      waitsFor(function(){
        return guideCollection.models.length>1;
      }, "The collection should fetch successfully.", 2000);
    });
  });
});
  