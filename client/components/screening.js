// stringfiy time //
Template.screening.helpers({
	 timeDisplay: function(){
		 var thisTime= this.time.toDateString();
		 return thisTime;
		 //get current time//
	 },
	 attendance: function(){
		 var temp= this.attendees;
		 for(var i=0;i<temp.length;i++){
			 return temp[i]+", ";
		 }
	 }
});

Template.screeningMap.helpers({
	attendance: function(){
		var temp= this.attendees;
		for(var i=0;i<temp.length;i++){
			return temp[i]+", ";
		}
	},
	distance:function(){
		//get distance service ///

    var service = new google.maps.DistanceMatrixService;
		//var current= Session.get('userLocation');
		//var screenLoc= this.location;
		var current= "2812 Montlake Blvd. Seattle, WA";
    var screenLoc= "2004 NE 52nd st  Seattle, WA";
     service.getDistanceMatrix({
        origins: [current],
        destinations: [screenLoc],
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
       if (status !== google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
        } else {
          var thisResponse= response.rows[0].elements[0].distance.value;
         return thisResponse;
				 //  end of service //
        }
       });
			//  return "these are the coordinates:" + current + "  " + screenLoc;
	}
});

Template.screeningMap.helpers({
	'owner': function(){
		return this.createdBy=== Meteor.userId();
	}
})

Template.screening.events({
  'owner': function(){
		return this.createdBy=== Meteor.userId();
	},
	'click .attend': function(){
		event.preventDefault();
		var thisEvent= this._id;
		var thisUser= Meteor.user().username;
			if(Screenings.find({attendees: thisUser, _id: thisEvent}).count()===0){
				Screenings.update(
				{_id: thisEvent},
					{ $push: {attendees: thisUser}}
				);
		}
	}
});

if(Meteor.isClient){
Meteor.startup(function() {
 GoogleMaps.load({
  key:  Meteor.settings.public.GOOGLE_SECRET,
  libraries: 'places'
 });
});
};
   Template.screeningMap.onRendered(function () {
		 thisLocation= this.location;
     var options= {
			 map: "#map2",
			 location: thisLocation
		 };

     this.autorun(() => {
       if (GoogleMaps.loaded()) {
        $("#place2").geocomplete(options);
       }
     });

					$("#place2").html(thisLocation);
					  $("#place2").trigger("geocode");
   });
