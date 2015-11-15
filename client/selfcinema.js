
if (Meteor.isClient) {
  Session.setDefault('toShow', 'login')
  if(Meteor.userId()){
    Session.set('toShow','create');
  }
  else{
    Session.set('toShow', 'login')
  }

 Session.setDefault('screeningID', 42);
};

  Template.body.helpers({
	 screenings: function(){
		 return Screenings.find();
	 },
   isLogin: function(){
     if(!Meteor.userId()){
       return true;
     }
   },
	 mainView: function(){
     var thisScreeningID = Session.get('screeningID');
     if (Session.get('toShow')==='screening'){
       return Screenings.find({_id: thisScreeningID});
     }
	 },
   createNew: function(){
     if(Meteor.userId()){
       return true;
     }
   }

  });

  Template.body.events({
    'click .tile': function(event){
      Session.set('toShow', 'screening');
      Session.set('screeningID', this._id)
    },
    'click .create': function(event){
      Session.set('toShow', 'create');
    }
  });


 UI.registerHelper("indexedArray", function(context, options) {
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
