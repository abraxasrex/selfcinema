//load google maps//
if(Meteor.isClient){
Meteor.startup(function() {
 GoogleMaps.load({
  key: Meteor.settings.public.GOOGLE_SECRET,
  libraries: 'places'
});
});
};

//events//

Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#signup-username").value,
      password: template.find("#signup-password").value,
      profile: {
        email: template.find("#signup-email").value
      }
    }, function(error) {
      if (error) {
        console.log(" signup error");
      }
    });
  }
});

Template.loginForm.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();
    Meteor.loginWithPassword(
      template.find("#login-username").value,
      template.find("#login-password").value,
      function(error) {
        if (error) {
          console.log("login error");
        }
      }
    );
  }
});

Template.logoutForm.events({
  "submit #logout-form": function(event, template) {
    event.preventDefault();
    Meteor.logout(function(error) {
      if (error) {
        console.log("logout error")
      }
    });
  }
});

Template.newScreening.events({
	"submit #screeningForm": function(event, template){
		event.preventDefault();
		thisTitle= template.find("input[name=event_title]").value;
		thisFilm= template.find("input[name=event_film]").value;
		thisFormat= template.find("input[name=event_format]").value;
		thisTime=new Date(template.find("input[name=event_time]").value);
		thisLocation=template.find("input[name=event_location]").value;
		thisDescription=template.find("textarea[name=event_description]").value;
    thisUser= Meteor.userId();

		var thisScreening= {
			createdBy: thisUser,
			title: thisTitle,
			film: thisFilm,
			attendees: [],
			time: thisTime,
			location: thisLocation,
			description: thisDescription
		};
		Screenings.insert(thisScreening);
		thisUser=Meteor.user().username;
    currentScreeningID= this._id;
		Screenings.update(
		{_id: currentScreeningID},
			{ $push: {attendees: thisUser}}
		);
    template.find("input").value = "";
	},
	"click .clearForm": function(event, template){
		event.preventDefault();
		template.find("input").value = "";
	}
});


Template.editScreening.events({
	"submit #editForm": function(event, template){
		event.preventDefault();
		thisTitle= template.find("input[name=event_title]").value;
		thisFilm= template.find("input[name=event_film]").value;
		thisFormat= template.find("input[name=event_format]").value;
		thisTime=new Date(template.find("input[name=event_time]").value);
		thisLocation=template.find("input[name=event_location]").value;
		thisDescription=template.find("textarea[name=event_description]").value;

	 Screenings.update({_id: this._id}, {
     title: thisTitle,
     film: thisFilm,
     format: thisFormat,
     time: thisTime,
     location: thisLocation,
     description: thisDescription
   })
	},
	"click .clearForm": function(event, template){
		event.preventDefault();
		template.find("input").value = "";
	}
});

//render functions//

Template.editScreening.onRendered(function(){

//  this.find("input[name=event_title]").value= this.title;
//  this.find("input[name=event_film]").value= this.film;
//  this.find("input[name=event_format]").value= this.format;
//  this.find("input[name=event_time]").value= this.time;
//  this.find("input[name=event_location]").value= this.location;
//  this.find("textarea[name=event_description]").value= this.description;

  this.autorun(() => {
    if (GoogleMaps.loaded()) {
      $('#place1').geocomplete({
        map: $("#map"),
        location: $("#place1")
      });
    }
  });

       $("#place1").trigger("geocode");
});

  Template.newScreening.onRendered(function () {
     this.autorun(() => {
       if (GoogleMaps.loaded()) {
         $('#place1').geocomplete({
           map: $("#map"),
           location: $("#place1")
         });
       }
     });

          $("#place1").trigger("geocode");
   });
