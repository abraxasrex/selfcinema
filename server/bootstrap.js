Meteor.startup(function() {


  if (Screenings.find().count() === 0) {

    var sampleScreenings = [
      { createdBy: 'someone',
        title: 'Days of Heaven at Dave\'s',
		film: 'Days of Heaven',
        attendees: [ 'dave','kelly','marcus','davesh' ],
		 time: new Date(2015, 12, 1, 5, 30, 0),
		 location: '2004 NE 52nd st Seattle, WA 98105',
		 description: "Terrence Malick is my favorite director!"
      },

	  {   createdBy: 'someone',
		  title:'bodily horror double feature',
		  film: ['the thing', 'videodrome'],
		  attendees: ['smorg','clongar', 'deathdribblez'],
		  time: new Date(2015, 11, 25, 8, 45, 0),
		  location: '3053 Williamsburg Rd. Clarksville, TN 37043',
		  description: "byob"
	  },

    {   createdBy: 'heydawg',
      title:'heydawg',
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
      description: "you should see this unless you're looking for past events"
    }

    ];

    _.each(sampleScreenings, function(screening) {
      Screenings.insert(screening);
    });
  }

});

if(Meteor.isServer){

Meteor.methods({
 distance: function(){
    console.log("i'm a pretty pony")


  }
});

};
