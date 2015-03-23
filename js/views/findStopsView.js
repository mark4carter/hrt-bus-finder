var app = app || {};

$(function(){
    app.FindStopsView = Backbone.View.extend({
	    id: 'find-stops-view',

	    template: _.template($('#find-stops-view-template').html()),

		events: {
			'click #locate': 'locate',
			'click #search': 'search'
		},

	    initialize: function() {
	        this.collection = new Backbone.Collection([], {model: app.Stop});
	        this.collection.on('add', this.addStop, this);
	        this.collection.once('sync', function() {app.App.MapView.setBounds();}, this);

	        app.App.MapView.clear();
	        app.App.MapView.setOnCenterChangedEvent($.proxy(this.findClosestStops, this));
	        $(window).resize($.proxy(this.resize, this));

	        if(this.options.location) {
	            app.App.ContentView.once('contentChanged', function() {
	                this.onUserLocated(this.options.location);
	            }, this);
	        } else {
                this.locate();
            }
		},

		render: function() {
		    this.$el.html(this.template());

		    this.resize();
		    this.$('.mapcanvas').html(app.App.MapView.el);
			this.$('.mapcanvas').show();

			return this;
		},

		resize: function() {
		    app.App.MapView.$el.height(window.innerHeight - $('.navbar').outerHeight(true) - this.$('#find-options').outerHeight(true));
		    app.App.MapView.resize();
			app.App.MapView.setBounds();
		},

		addStop: function(stop) {
		    app.App.MapView.createStopMarker(stop, true, function() {
		        app.App.Router.navigate('stops/' + stop.get('stopId'), {trigger: true});
		    });
		},

		findClosestStops: function(location) {
		    app.App.Router.navigate('findStops/' + location.lat() + '/' + location.lng() + '/');
		    this.collection.url = API_URL + 'stops/near/' + location.lat() + '/' + location.lng() + '/';
		    this.collection.fetch({remove: false, dataType: 'jsonp'});
		},

		locate: function() {
		    app.LocateUser($.proxy(this.onUserLocated, this));
		},

		onUserLocated: function(location) {
		    app.App.Router.navigate('findStops/' + location.lat() + '/' + location.lng() + '/');
	        app.App.MapView.createUserMarker(location, true);
	        app.App.MapView.resize();
	        app.App.MapView.center(location);
	        app.App.MapView.zoom(17);
	        this.findClosestStops(location);
	    },

		search: function() {
		    var intersection = this.$('#intersection').val();
		    var city = this.$('#city').val();
		    if(intersection == '') return;

		    app.App.MapView.clear();
		    this.collection.once('sync', this.onSearchFinished, this);
		    this.collection.url = API_URL + 'stops/near/intersection/' + city + '/' + intersection + '/';
		    this.collection.fetch({dataType: 'jsonp'});
		},

		onSearchFinished: function() {
		    app.App.MapView.setBounds();
		    var location = app.App.MapView.center();
		    app.App.Router.navigate('findStops/' + location.lat() + '/' + location.lng() + '/');
		}
	});
});
