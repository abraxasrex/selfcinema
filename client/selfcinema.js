
  
  Session.setDefault('counter', 0);
  
  Template.body.helpers({
	 screenings: function(){
		 return Screenings.find();
	 },
	 isScreening: function(){
		 return false;
	 },
	 isLogin: function(){
		 if(!Meteor.userId()){
			 return true;
		 }
	 },
	 isEmpty: function(){
		 if(Meteor.userId()){
			 return true;
		 }
	 },
	 isScheduled: function(){
		 return false;
	 },
	 
	 createNew: function(){
		 
	 }
	 
  
  });

 // Template.main.events({
    
  //});
  
  
 UI.registerHelper('indexedArray', function(context, options) {
    if (context) {
      return context.map(function(item, index) {
        item._index = index;
      return item;
     });
    }
 });
 
 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  
 Template.signupForm.events({
  "submit #signup-form": function(event, template) {
    event.preventDefault();
    Accounts.createUser({
      username: template.find("#signup-username").value,
      password: template.find("#signup-password").value,
      profile: {
        name: template.find("#signup-name").value
        // Other required field values can go here
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
		
	}
});


