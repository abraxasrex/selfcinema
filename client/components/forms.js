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

if(Meteor.isClient){
Meteor.startup(function() {
 GoogleMaps.load({
  key: Meteor.settings.public.GOOGLE_SECRET,
  libraries: 'places'
});
});
};

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


Template.newScreening.events({
	"submit #screeningForm": function(event, template){
		event.preventDefault();
		thisTitle= template.find("input[name=event_title]").value;
		thisFilm= template.find("input[name=event_film]").value;
		thisFormat= template.find("input[name=event_format]").value;
		thisTime=new Date(template.find("input[name=event_time]").value);
		thisLocation=template.find("input[name=event_location]").value;
		thisDescription=template.find("input[name=event_description]").value;

		var thisScreening= {
			createdBy: this.userId,
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

	},
	"click .clearForm": function(event, template){
		event.preventDefault();
		input.value = "";
	}

});
