var app = app || {};

$(function(){
    app.HomeView = Backbone.View.extend({
	    template: _.template($('#stop-list-template').html()),

	    events: {
		    'click .loadMore': 'forceRefresh'
		},

		initialize: function() {
		    _.bindAll(this);
		    app.LocateUser(this.getStopList);
		},

		forceRefresh: function() {
		    app.App.ContentView.trigger('forceRefresh');
		    $('html,body').animate({scrollTop: this.$el.offset().top - 60 }, 'slow');
		},

		getStopList: function(location) {
		    this.render();
			var stopList = new app.StopList;
			stopList.location = location;
			var stopsListView = new app.StopListView({el: this.$('#stops'), collection: stopList});
		},

		render: function() {
		    this.$el.html(this.template());
		    return this;
		},
	});
});

