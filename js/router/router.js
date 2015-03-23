var app = app || {};

$(function(){
	app.Router = Backbone.Router.extend({
		 routes: {
			"": app.SNOW_ROUTES ? "snowRoute" : "homeView",
			"stops/*stopIds": app.SNOW_ROUTES ? "snowRoute" : "stopView",
			"routes(/*routeIds)": app.SNOW_ROUTES ? "snowRoute" : "routeView",
			"findStops(/:lat/:lng)(/)": app.SNOW_ROUTES ? "snowRoute" : "findStopsView",
			"feedback(/)" : app.SNOW_ROUTES ? "snowRoute" : "feedbackView"
		 },

		homeView: function() {
		    this.clearIntervals();
			app.App.ContentView.setSubView(new app.HomeView);
			app.App.MapView.setDraggable(false);
		},

		stopView: function(stopIds) {
		    this.clearIntervals();
		    app.App.ContentView.setSubView(new app.StopsByIdView({stopIds: stopIds}));
		    app.App.MapView.setDraggable(false);
		},

		routeView: function(routeIds) {
		    this.clearIntervals();
		    app.App.ContentView.setSubView(new app.RouteView({routeIds: routeIds}));
		    app.App.MapView.setDraggable(true);
		    $('#loading').remove();
		},

		findStopsView: function(lat, lng) {
		    this.clearIntervals();
		    var location = lat && lng && new google.maps.LatLng(lat, lng);
		    app.App.ContentView.setSubView(new app.FindStopsView({location: location}));
		    app.App.MapView.setDraggable(true);
		    $('#loading').remove();
		},

		feedbackView: function() {
			this.clearIntervals();
			app.App.ContentView.setSubView(new app.FeedbackView);
			console.log("were you trying to go to feedback?");
		},

		clearIntervals: function() {
		    $(window).off('resize');
		    while(app.App.Intervals.length) {
		        clearInterval(app.App.Intervals.pop());
		    }
		},

		snowRoute: function() {
			app.App.ContentView.setSubView(new app.SnowRoute);
		}

	});
});

