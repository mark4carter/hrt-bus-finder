var app = app || {};

/////////
  // Browser kept trying to use file:// when I changed to app.API_URL
  // so for now I had to make separate var API_URL for
  // busfinder.js, arrivalList.js, busList.js, and stopList.js
  ///////
var API_URL = 'http://lit-inlet-3610.herokuapp.com/api/'

$(function(){
	app.BusList = Backbone.Collection.extend({
	    initialize: function(models, options) {
	        this.routeIds = options.routeIds;
	    },

		url: function() {
		    var url = API_URL + 'buses/routes';
		    if(this.routeIds) {
		        url += '/' + this.routeIds + '/';
	        }
			return url;
		}
	});
});
