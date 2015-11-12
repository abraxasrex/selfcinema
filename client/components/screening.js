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
	 
	 
})