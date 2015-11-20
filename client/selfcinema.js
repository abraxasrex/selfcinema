
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
      var now= new Date();
     return Screenings.find({time: { $gt: now}}, {sort: {time: 1} });
	 },
   isLogin: function(){
     if(!Meteor.userId()){
       return true;
     }
   },
	 mainView: function(){
     if (Session.get('toShow')==='screening'){
       return true;
     };
   },
     screeningToShow: function(){
        var thisScreeningID = Session.get('screeningID');
        return Screenings.find({_id: thisScreeningID})
	 },
   createNew: function(){
     if(Meteor.userId() && Session.get('toShow')==="create"){
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
      if(Meteor.userId()){
        Session.set('toShow', 'create');
      }
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
