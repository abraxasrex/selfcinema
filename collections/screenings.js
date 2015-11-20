Screenings = new Mongo.Collection('screenings');

Screenings.allow({

 insert: function (userId) {
    return userId;
  },

  update: function (userId, docs, fields, modifier) {
//	if(docs.createdBy === userId){
		 return true;
//	}
//	else if(fields.attendees && modifier["$push"]){
	//		return userId;
	//	}
  },

  remove: function (userId, doc) {
    return doc.createdBy === userId;
  }

})
