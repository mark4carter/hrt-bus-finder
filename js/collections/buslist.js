var app = app || {};
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
