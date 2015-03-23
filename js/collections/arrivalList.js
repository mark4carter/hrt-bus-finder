var app = app || {};

var API_URL = 'http://lit-inlet-3610.herokuapp.com/api/'

$(function(){
    app.ArrivalList = Backbone.Collection.extend({
		model: app.Arrival,   //changed Arrival to app.Arrival

		comparator: function(arrival) {
		    return arrival.minutesFromNow();
        },

		url: function() {
			return API_URL + 'stop_times/' + this.stopId + '/';
		}
	});
});
