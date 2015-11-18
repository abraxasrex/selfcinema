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
    if(Screenings.find({_id: thisEvent, attendees:thisUser}) === false){
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
      $("#place2").value= thisLocation;

     this.autorun(() => {
       if (GoogleMaps.loaded()) {
        $("place2").geocomplete({
           map: $("#map2"),
					 location: thisLocation
         });
       }
     });

   });
