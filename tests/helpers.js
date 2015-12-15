// Helpers

resetCollection = (name) => {
  const collection = this[name];

  if (collection) {
    // if the collection is already defined, remove its documents

    if (Meteor.isClient) {
      // on the client we have to remove docs by id one at a time
      collection.find().forEach(function (doc) {
        collection.remove(doc._id);
      });
    } else {
      collection.remove({});      
    }
  } else {
    // define a new unmanaged collection
    this[name] = new Mongo.Collection(null);
  }
};

reset = () => {
  const collections = ['AdManagerAdverts'];

  // reset all of the collections
  collections.forEach(name => {
    resetCollection(name);
  });
};