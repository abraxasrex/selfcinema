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
        // Display the user creation error to the user however you want
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
          // Display the login error to the user however you want
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
        // Display the logout error to the user however you want
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

		thisUser=Meteor.userId();

		Screenings.update(
		{title: thisEvent},
			{ $push: {attendees: thisUser}}
		);

	},
	"click .clearForm": function(event, template){
		event.preventDefault();
		input.value = "";
	}
});
