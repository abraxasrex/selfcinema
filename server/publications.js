Meteor.publish('screenings', function(){
	return Screenings.find();
})
Meteor.publish('attending',function(){
	var currentUser=this.user().username;
	return Screenings.find({attendees: currentUser});
})

Meteor.publish('myScreenings',function(){
	var currentUser=this.user().username;
	return Screenings.find({createdBy: currentUser});
})
