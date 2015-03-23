var app = app || {};

$(function(){
    app.StopsByIdView = Backbone.View.extend({
	    id: 'stops',

		initialize: function() {
			var stopList = new app.StopList;
			stopList.stopIds = this.options.stopIds;
			var stopsListView = new app.StopListView({el: this.el, collection: stopList});
		}
	});


});

