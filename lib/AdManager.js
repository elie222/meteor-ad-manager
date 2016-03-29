AdManager = {
  getAllAdverts() {
    return AdManagerAdverts.find();
  },

  getAdvertByName(name) {
    return AdManagerAdverts.findOne({ name });
  },

  // get the server to cache the ads
  _cacheAdverts() {
    Meteor.call('AdManager.cacheAdverts');
  },

  addAdvert: new ValidatedMethod({
    name: 'AdManager.addAdvert',

    validate: AdManagerAdvertsSchema.validator(),

    run({ name, url, imageUrl, extraData }) {
      checkIsAdmin(this.userId);

      if (AdManagerAdverts.findOne({ name }))
        throw new Meteor.Error('already-exists', 'An advert with this name already exists');      

      const res =  AdManagerAdverts.insert({
        name,
        url,
        imageUrl,
        extraData,
      });

      AdManager._cacheAdverts();

      return res;
    }
  }),

  editAdvert: new ValidatedMethod({
    name: 'AdManager.editAdvert',

    validate: new SimpleSchema({
      currentName: { type: String },
      advert: { type: Object },
      'advert.name': { type: String, optional: true },
      'advert.url': { type: String, optional: true, regEx: SimpleSchema.RegEx.Url },
      'advert.imageUrl': { type: String, optional: true, regEx: SimpleSchema.RegEx.Url },
      'advert.extraData': { type: Object, blackbox: true, optional: true },
    }).validator(),

    run({ currentName, advert }) {
      checkIsAdmin(this.userId);

      // if we're changing the name, make sure an ad with this name doesn't already exist
      if (currentName != advert.name && AdManagerAdverts.findOne({name: advert.name}))
        throw new Meteor.Error('already-exists', 'An advert with this name already exists');      

      const res = AdManagerAdverts.update({ name: currentName }, {
        $set: advert
      });

      AdManager._cacheAdverts();

      return res;
    }
  }),

  removeAdvertById: new ValidatedMethod({
    name: 'AdManager.removeAdvertById',

    validate: new SimpleSchema({
      _id: { type: String }
    }).validator(),

    run({ _id }) {
      checkIsAdmin(this.userId);

      const res = AdManagerAdverts.remove({ _id });

      AdManager._cacheAdverts();

      return res;
    }
  }),

  clickAdvert: new ValidatedMethod({
    name: 'AdManager.clickAdvert',

    validate: new SimpleSchema({
      _id: { type: String }
    }).validator(),

    run({ _id }) {
      return AdManagerAdverts.update({ _id }, {
        $inc: { clicks: 1 }
      });
    }
  }),

  disableAdvert: new ValidatedMethod({
    name: 'AdManager.disableAdvert',

    validate: new SimpleSchema({
      _id: { type: String },
      disabled: { type: Boolean }
    }).validator(),

    run({ _id, disabled }) {
      checkIsAdmin(this.userId);

      const res = AdManagerAdverts.update({ _id }, {
        $set: { disabled }
      });

      AdManager._cacheAdverts();

      return res;
    }
  })
};
