
if (Meteor.isClient) {
  // set sessions//
  if(Meteor.userId()){
    Session.setDefault('toShow','create');
  }
  else{
    Session.setDefault('toShow', 'login')
  }
 Session.setDefault('userLocation', "2004 NE 52nd St 98105 Seattle, WA")
 Session.setDefault('screeningID', 42);
 Session.setDefault('feed', 'normal');
 // 42 is the answer to the meaning of life, if you recall. //

 //get user location//
// GoogleMaps.load({
//  key:  Meteor.settings.public.GOOGLE_SECRET,
//  libraries: 'places'
 //});

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//       var latlng= position.coords.latitude + "," + position.coords.longitude;
//     Session.set('userLocation', latlng);
//   })};


};
 // end client startup //

Template.body.helpers({
	 screenings: function(){
      var now= new Date();
      var thisUser= Meteor.userId();
      if(Session.get('feed')==="normal"){
         return Screenings.find({time: { $gt: now}}, {sort: {time: 1} });
      }
      if(Session.get('feed')==='mine'){
        return Screenings.find({createdBy: thisUser});
      }
      if(Session.get('feed')==='attending'){
        return Screenings.find({attendees: thisUser})
      }
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
        return Screenings.find({_id: thisScreeningID});
	 },
   createNew: function(){
     if(Meteor.userId() && Session.get('toShow')==="create"){
       return true;
     }
   },
   toEdit: function(){
     if(Meteor.userId() && Session.get('toShow')==="edit"){
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
    'click .edit': function(event){
      if(this.createdBy=== Meteor.userId()){
        Session.set('toShow', 'edit');
      }
    },
    'click .delete': function(event){
      event.preventDefault();
      if(this.createdBy=== Meteor.userId()){
        Screenings.remove({_id: this._id })
      }
    },
    'click .feed_normal': function(event){
      event.preventDefault();
      Session.set('feed', 'normal');
    },
    'click .feed_mine': function(event){
      event.preventDefault();
      Session.set('feed', 'mine');
    },
    'click .feed_upcoming': function(event){
      event.preventDefault();
      Session.set('feed', 'attending');
    }
  //  'click .feed_past': function(event){
  //    var now= new Date();
  //    return Screenings.find({time: { $lt: now}});
//    }
    //'click .feed_10': function(event){

       ///get distance service ///
    //   var service = new google.maps.DistanceMatrixService;
    //     service.getDistanceMatrix({
    //       origins: [Session.get('userLocation')],
    //       destinations: ["2812 Montlake Blvd. Seattle, WA"],
    //        travelMode: google.maps.TravelMode.DRIVING
    //       }, function(response, status) {
    //       if (status !== google.maps.DistanceMatrixStatus.OK) {
    //       alert('Error was: ' + status);
    //       } else {
    //         var thisResponse= response.rows[0].elements[0].distance.value;
    //        console.log(thisResponse)
            //  end of service //
    //       }
  //       });
  //  },
  //  'click .feed_25': function(event){
      ///get distance service ///
  //    var service = new google.maps.DistanceMatrixService;
  //      service.getDistanceMatrix({
  //        origins: [Session.get('userLocation')],
  //        destinations: ["2812 Montlake Blvd. Seattle, WA"],
    //       travelMode: google.maps.TravelMode.DRIVING
  //        }, function(response, status) {
  //        if (status !== google.maps.DistanceMatrixStatus.OK) {
  //        alert('Error was: ' + status);
  //        } else {
  //          var thisResponse= response.rows[0].elements[0].distance.value;
  //         console.log(thisResponse)
           //  end of service //
  //        }
//        });
  //  }
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
