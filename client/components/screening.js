Template.screening.helpers({
	 zombify: function(){
		 return Screenings.find();
	 }
});

Template.screening.events({
	
	'click .attend': function(){
		event.preventDefault();
		thisEvent=this.title;
		thisUser=Meteor.userId();
		
		Screenings.update(
		{title: thisTitle},
			{ $push: {attendees: thisUser}}
		);
	}
	 
	 
})