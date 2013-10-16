[TVPage API Javascript Client](http://www.tvpage.com/)
==================================================

Getting started
--------------------------------------

```html
<div id="TVPage_Player"></div>
<script src="http://tfw.tvpage.com/dist/release/lib.js"></script>
<script type="text/javascript">
  TVPage.config({
    tvpageId: 123,
    key: "asdsdsaddasds",
    div: 'TVPage_Player',
    analytics: true,
  });
  
  var success = function (id, models){
    console.log("FETCHED", id, models);
  };
  
  var failure = function(){
    alert("Failed to retrieve data");
  };
  
  TVPage.ready(function(){
    console.log("hmmmm...");
    var promise = TVPage.getTVPage(70603, function(){
      
    });
  });
</script>
```


