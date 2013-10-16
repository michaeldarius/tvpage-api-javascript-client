require.config({
  // Initialize the application with the main application file
  deps: ["main"],
  
  map: {
    '*': {"jquery": "jquery_noconflict"},
    'jquery_noconflict': {'jquery': "jquery"}
  },
  
  paths: {
    main: "./main",
    jquery: "lib/jquery",
    backbone: "lib/backbone",
    underscore: "lib/underscore",
    sinon: "lib/sinon",
  },
  
  shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},

		underscore: {
			exports: "_"
		},
		sinon:{
			exports:'sinon'
		},
  }
  
});
