var app = app || {};

$(function(){

	app.SNOW_ROUTES = false;

  // moved Arrival model to models/arrival.js

  // moved Stop to models/stop.js
  
  // moved API_URl to models/apiurl.js
  /////////
  // Browser kept trying to use file:// when I changed to app.API_URL
  // so for now I had to make separate var API_URL for
  // busfinder.js, arrivalList.js, busList.js, and stopList.js
  ////////
    var API_URL = 'http://lit-inlet-3610.herokuapp.com/api/'

  // moved ArrivalList to collections/arrivalList.js

  // moved StopList to collections/stopList.js

  // moved feedback to models/feedback.js

  // moved BusList to collections/buslist.js

	app.ActiveRoutesList = Backbone.Collection.extend({
		url: API_URL + 'routes/active/'
	});
  
  // moved StopListView to views/stopListView.js

  // moved StopView to views/stopView.js    

  // moved MapView to views/mapView.js
	
  // moved ArrivalView to views/arrivalView.js

    app.LocateUser = function(onLocated) {

	    var onFail = function() {
	        onLocated(app.DowntownNorfolk);
	        $('#geolocation-failed').prependTo('#stops').fadeIn();
	    };

	    var timeout = setTimeout(onFail, 5000);

	    var onSuccess = function(position) {
	        clearTimeout(timeout);
	        onLocated(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
	    };

	    navigator.geolocation ?
			navigator.geolocation.getCurrentPosition(onSuccess, onFail) : onFail();
	};

  // moved SnowRoute to views/snowRoute.js

  // moved HomeView to views/homeView.js

  // moved StopsByIdView to views/stopsByIdView.js	
	
  // moved RouteView to views/routeView.js	

  // moved FindStopsView to views/findStopViews.js
  
  // moved FeedbackView to views/feedbackView.js 
  
  // moved ContentView to views/contentView.js   

  // moved Router to router/router.js

	

	// Fix JavaScript Modulo of negative numbers
	// http://javascript.about.com/od/problemsolving/a/modulobug.htm
	Number.prototype.mod = function(n) {
		return ((this%n)+n)%n;
	};

	// Create addHours function for Date object so we can
	// easily get from GMT to EST (probably need to find a library for this)
	Date.prototype.addHours = function(h){
	    this.setHours(this.getHours()+h);
	    return this;
	}
	Date.prototype.addMinutes = function(m){
	    this.setMinutes(this.getMinutes()+m);
	    return this;
	}
	Date.prototype.to12HourString = function(m){
	    var dd = "AM";
		var hours = this.getHours();
		var mins = this.getMinutes();
		if (hours >= 12) {
			hours = hours - 12;
			dd = "PM";
		}
		if (hours == 0) {
			hours = 12;
		}

		mins = mins < 10 ? "0"+mins : mins;

		return hours + ":" + mins + " " + dd;
	}
	Date.parseUtc = function(input){
	    var parts = input.match(/(\d+)/g);
		// new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
		return Date.UTC(parts[0], parts[1]-1, parts[2], parts[3], parts[4], parts[5]); // months are 0-based
	}

	// parse a date in yyyy-mm-dd format
	function parseDate(input) {
	  var parts = input.match(/(\d+)/g);
	  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
	  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
	}

	app.jPM = $.jPanelMenu({
	    direction: 'right',
	    excludedPanelContent: 'style, script, #disclaimer'
	});
	app.jPM.on();

	app.DowntownNorfolk = new google.maps.LatLng(36.863794,-76.285608);
	app.App = {
		ContentView: new app.ContentView,
		Router: new app.Router,
		MapView: new app.MapView,
		Intervals: []
	};

	app.App.Router.on('route', function() {
	    _gaq.push(['_trackPageview', location.pathname + location.hash]);
	});

	var root = document.URL.indexOf('/hrt-bus-finder') == -1 ? '/' : '/hrt-bus-finder/';
	Backbone.history.start({ root: root });
});
