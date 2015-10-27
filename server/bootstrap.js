Meteor.startup(function() {
  
  if (Screenings.find().count() === 0) {
    
    var sampleScreenings = [
      { createdBy: 'someone',
        title: 'Days of Heaven at Dave\'s',
		film: 'Days of Heaven',
        attendees: [ 'dave','kelly','marcus','davesh' ],
		 time: new Date(2015, 11, 1, 5, 30, 0),
		 location: 'blah blah'
      },
	 
	  {   createdBy: 'someone',
		  title:'bodily horror double feature',
		  film: ['the thing', 'videodrome'],
		  attendees: ['smorg','clongar', 'deathdribblez'],
		  time: new Date(2015, 11, 15, 8, 45, 0),
		  location: 'blah blooh'
	  }
    
    ];

   
    _.each(sampleScreenings, function(screening) {
      Screenings.insert(screening);
    });
  }

});