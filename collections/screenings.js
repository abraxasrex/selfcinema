Screenings = new Mongo.Collection('screenings');


Screenings.allow({
	
 insert: function (userId) {
    return userId;
  },

  update: function (userId, doc) {
	return doc.userId === userId;
  },

  remove: function (userId, doc) {
    return doc.userId === userId;
  }
	
})
