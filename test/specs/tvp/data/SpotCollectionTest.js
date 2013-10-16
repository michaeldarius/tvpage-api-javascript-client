define(["tvp/data/SpotCollection"], function(SpotCollection){
  describe("Spot Collection", function() {
    var spotCollection;
    beforeEach(function(){
      spotCollection = new SpotCollection();
      spotCollection.setKey(70634);
      spotCollection.fetch();
    });
    afterEach(function(){
      spotCollection = null;
    });

    it('Should return list of spots',function(){
      waitsFor(function(){
        return spotCollection.models.length>1;
      }, "The collection should fetch successfully.", 2000);
    });
  });
});
  