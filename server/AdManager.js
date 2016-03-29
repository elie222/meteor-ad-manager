AdManager.getCachedAdverts = function () {
  return this._cache;
}

// this doesn't work when running multiple instances
AdManager._cacheAdverts = function () {
  this._cache = AdManagerAdverts.find({disabled: {$ne: true}}).fetch();
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

DDPRateLimiter.addRule({
  type: 'method',
  name: 'AdManager.clickAdvert'
}, 1, 5000);
