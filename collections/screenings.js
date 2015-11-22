Screenings = new Mongo.Collection('screenings');

Screenings.allow({

 insert: function (userId) {
    return userId;
  },

  update: function (userId, docs, fields, modifier) {
if(userId && modifier["$push"]){
			return true;
		}
  },

  remove: function (userId, doc) {
    return doc.createdBy === userId;
  }

})
