var app = app || {};

/////////
  // Browser kept trying to use file:// when I changed to app.API_URL
  // so for now I had to make separate var API_URL for
  // busfinder.js, arrivalList.js, busList.js, and stopList.js
  ///////
var API_URL = 'http://lit-inlet-3610.herokuapp.com/api/'

$(function(){
    app.StopList = Backbone.Collection.extend({
		url: function() {
		    if(this.location) {
		        return API_URL + 'stops/near/' + this.location.lat() + '/' + this.location.lng() + '/';
		    }

		    if(this.stopIds){
		        return API_URL + 'stops/id/' + this.stopIds + '/';
		    }
		}
	});
});
