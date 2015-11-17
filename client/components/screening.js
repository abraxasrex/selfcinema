Template.screening.helpers({
	 timeDisplay: function(){
		 var thisTime= this.time.toDateString();
		 return thisTime;
	 }
});

Template.screening.events({

	'click .attend': function(){
		event.preventDefault();
		thisEvent=this._id;
		thisUser=Meteor.userId();

		Screenings.update(
		{title: thisEvent},
			{ $push: {attendees: thisUser}}
		);
	}


});

Template.screeningMap.onRendered(function () {

	this.autorun(() => {
     var thisLocation= "Seattle, WA";
		if (GoogleMaps.loaded()) {
			$(thisLocation).geocomplete({
				map: $("#map2")
			});
		}
	});

});
