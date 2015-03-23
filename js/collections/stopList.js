var app = app || {};
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
