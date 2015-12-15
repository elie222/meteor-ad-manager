AdManager.getCachedAdverts = function () {
  return this._cache;
}

// this doesn't work when running multiple instances
AdManager._cacheAdverts = function () {
  this._cache = AdManagerAdverts.find({}).fetch();
}

Meteor.startup(() => AdManager._cacheAdverts());

AdManager.getRandomAdvert = new ValidatedMethod({
  name: 'AdManager.getRandomAdvert',

  validate: null,

  run() {
    return Random.choice(AdManager.getCachedAdverts());
  }
});

AdManager.cacheAdverts = new ValidatedMethod({
  name: 'AdManager.cacheAdverts',

  validate: null,

  run() {
    checkIsAdmin(this.userId);

    AdManager._cacheAdverts();
  }
});