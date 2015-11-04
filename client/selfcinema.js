
  
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
		 return false;
	 },
	 isScheduled: function(){
		 return false;
	 },
	 
	 createNew: function(){
		 if(Meteor.userId()){
			 return true;
		 }
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
  
 

