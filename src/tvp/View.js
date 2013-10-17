define([
	"backbone"
],

	function(Backbone) {
		/**
		 * TVP\View class
		 * This is the TVPView class: base class of most views
		 *
		 * @name TVPView
		 * @class TVPView
		 * @constructor
		 * @return TVPView Object
		 */
		var TVPView = Backbone.View.extend({
			templatePath: '',
			path:'',
		});

		return TVPView;
	});
