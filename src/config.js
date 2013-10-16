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
    underscore: "lib/underscore"
  },
  
  shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},

		underscore: {
			exports: "_"
		}
  }
  
});
