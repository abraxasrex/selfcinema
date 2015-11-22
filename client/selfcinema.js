
if (Meteor.isClient) {
  Session.setDefault('toShow', 'login')
  if(Meteor.userId()){
    Session.set('toShow','create');
  }
  else{
    Session.set('toShow', 'login')
  }

 Session.setDefault('screeningID', 42);
 // 42 is the answer to the meaning of life, if you recall //
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
      Session.set('screeningID', this._id);
    },
    'click .create': function(event){
      if(Meteor.userId()){
        Session.set('toShow', 'create');
      }
    },
    'click .feed_mine': function(event){
      return Screenings.find({createdBy: Meteor.userId()});
    },
    'click .feed_upcoming': function(event){
      return Screenings.find({attendees: {$in: [Meteor.user().username] }} );
    },
    'click .feed_past': function(event){
      var now= new Date();
      return Screenings.find({time: {$lt: now}});
    },
    'click .feed_10': function(event){

       ///get distance service ///

       var service = new google.maps.DistanceMatrixService;
         service.getDistanceMatrix({
           origins: ["2004 NE 52nd st Seattle, WA 98105"],
           destinations: ["2812 Montlake Blvd. Seattle, WA"],
            travelMode: google.maps.TravelMode.DRIVING
           }, function(response, status) {
           if (status !== google.maps.DistanceMatrixStatus.OK) {
           alert('Error was: ' + status);
           } else {
             var thisResponse= response.rows[0].elements[0].duration.value;
            console.log(thisResponse)
            //  end of service //
           }
         });
    },
    'click .feed_25': function(event){
      console.log("YOU ARE a BAD PONY")
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
