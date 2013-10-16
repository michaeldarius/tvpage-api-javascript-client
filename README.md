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
  
  var success = function (id, data){
    console.log("FETCHED", id, data);
  };
  
  var failure = function(){
    alert("Failed to retrieve data");
  };
  
  TVPage.ready(function(){
    TVPage.getTVPage(70603, success);
  });
</script>
```


