Template.screening.helpers({
	 blahblah: function(){
		 return Screenings.find();
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