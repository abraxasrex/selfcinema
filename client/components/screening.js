Template.screening.helpers({
	 timeDisplay: function(){
		 var thisTime= this.time.toDateString();
		 return thisTime;
	 }
});

Template.screening.events({

	'click .attend': function(){
		event.preventDefault();
		thisEvent= this._id;
		thisUser= Meteor.user().username;
			Screenings.update(
			{_id: thisEvent},
				{ $push: {attendees: "Squid"}}
			);
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
			 location: "NYC"
		 };

     this.autorun(() => {
       if (GoogleMaps.loaded()) {
        $("#place2").geocomplete(options);
       }
     });
          $("#place2").trigger("geocode");
   });
