Meteor.startup(function() {

  if (Screenings.find().count() === 0) {
  //populate with samples//
  //test for 1. past events, 2. events created by user, 3. events attended by user, 4. 10 miles away, 5. 25 miles away //
    var sampleScreenings = [
      { createdBy: 'someone',
        title: 'Days of Heaven at Dave\'s',
		film: 'Days of Heaven',
        attendees: [ 'dave','kelly','marcus','davesh' ],
		 time: new Date(2015, 12, 15, 5, 30, 0),
		 location: '2000 NE 50th st Seattle, WA 98105',
		 description: "Terrence Malick is my favorite director!"
      },
	  {   createdBy: 'someone',
		  title:'bodily horror double feature',
		  film: ['the thing', 'videodrome'],
		  attendees: ['smorg','clongar', 'deathdribblez'],
		  time: new Date(2016, 1, 25, 8, 45, 0),
		  location: '3053 Williamsburg Rd. Clarksville, TN 37043',
		  description: "byob"
	  },
    {   createdBy: 'heydawg',
      title:'LOTR Binge',
      film: ['lord of the rings'],
      attendees: ['me','you'],
      time: new Date(2015, 12, 5, 8, 35, 0),
      location: '2812 Montlake Blvd. Seattle, Wa  98105',
      description: "this is a test. testing 1 2 3."
    },
    {   createdBy: 'someone_else',
      title:'past_Event',
      film: ['back to the future'],
      attendees: ['me','you'],
      time: new Date(2015, 7, 5, 8, 35, 0),
      location: 'Galvanize Seattle',
      description: "you should not see this unless you're looking for past events"
    }
    ];

    _.each(sampleScreenings, function(screening) {
      Screenings.insert(screening);
    });
  }

});

 //meteor methods //
if(Meteor.isServer){

Meteor.methods({
 method_tester: function(){
    console.log("i'm a pretty pony");
  }
});

};
