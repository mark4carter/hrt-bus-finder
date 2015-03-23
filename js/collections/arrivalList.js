var app = app || {};

/////////
  // Browser kept trying to use file:// when I changed to app.API_URL
  // so for now I had to make separate var API_URL for
  // busfinder.js, arrivalList.js, busList.js, and stopList.js
  ///////
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
