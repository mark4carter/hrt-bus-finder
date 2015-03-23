var app = app || {};

$(function(){
    app.RouteView = Backbone.View.extend({
	    id: 'route-view',

	    template: _.template($('#route-view-template').html()),

	    events: {
			'change #route': 'routeSelected'
		},

	    initialize: function() {
	        this.firstUpdate = true;

			this.collection = new app.BusList({}, {routeIds: this.options.routeIds});
			this.collection.on('reset', this.addBuses, this);

			this.activeRoutesList = new app.ActiveRoutesList();
			this.activeRoutesList.on('reset', this.render, this);
			this.activeRoutesList.fetch({reset: true, dataType: 'jsonp'});

			this.updateBuses();
			app.App.Intervals.push(setInterval($.proxy(this.updateBuses, this), 30000));

			$(window).resize($.proxy(this.resize, this));
		},

		render: function() {
		    this.$el.html(this.template({ routes: this.activeRoutesList.toJSON() }));
		    this.setSelectedRoutes(this.options.routeIds && this.options.routeIds.split('/'));

		    app.App.MapView.$el.height(window.innerHeight - $('.navbar').outerHeight(true) - this.$('select').outerHeight(true) - 10);
		    this.$('.mapcanvas').html(app.App.MapView.el);
			this.$('.mapcanvas').show();
			app.App.MapView.resize();

			return this;
		},

		resize: function() {
		    app.App.MapView.$el.height(window.innerHeight - $('.navbar').outerHeight(true) - this.$('select').outerHeight(true) - 10);
		    app.App.MapView.resize();
			app.App.MapView.setBounds();
		},

		addBuses: function() {
			app.App.MapView.clear();
			app.App.MapView.createUserMarker(app.DowntownNorfolk);
			this.collection.each(function(bus){
			    app.App.MapView.createBusMarker(bus);
			});
			app.App.MapView.resize();
			if(this.firstUpdate){
			    app.App.MapView.setBounds();
			    this.firstUpdate = false;
		    }
	    },

		updateBuses: function() {
			this.collection.fetch({reset: true, dataType: 'jsonp'});
		},

		routeSelected: function() {
			app.App.Router.navigate('routes/' + this.$('select option:selected').val(), {trigger: true});
		},

		setSelectedRoutes: function(routes) {
		    if(routes == null || routes == "") {
		        this.$('select option')[0].selected = true;
		        return;
		    }

		    var indexOfEmpty = routes.indexOf('');
		    if(indexOfEmpty != -1) {
		        routes.splice(indexOfEmpty, 1);
		    }

		    this.$('select option').each(function(index, option) {
		        option.selected = routes.indexOf(option.value) != -1;
		    });
		}
	});

});

