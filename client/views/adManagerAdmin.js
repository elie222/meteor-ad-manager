Template.adManagerAdmin.onCreated(function () {
  this.subscribe('adManagerAds');

  this.selectedAd = new ReactiveVar(null);
  this.previewAd = new ReactiveVar(null);
});

Template.adManagerAdmin.helpers({
  adverts: function () {
    return AdManagerAdverts.find();
  },
  beforeRemove: function () {
    return function (collection, _id) {
      const doc = collection.findOne(_id);

      if (confirm(`Really delete ${doc.name}?`)) {
        AdManager.removeAdvertById.call({ _id });
      }
    };
  },
  selectedAd: function () {
    return Template.instance().selectedAd.get();
  },
  previewAd: function () {
    return Template.instance().previewAd.get();
  }
});

Template.adManagerAdmin.events({
  'click tbody > tr': function (e) {
    Template.instance().selectedAd.set(this);
  },
  'click #btn-reload': function (e) {
    const url = AutoForm.getFieldValue('url', 'insertAdManagerAdvertsForm');
    const imageUrl = AutoForm.getFieldValue('imageUrl', 'insertAdManagerAdvertsForm');

    Template.instance().previewAd.set({ url, imageUrl });
  },
  'click .btn-disable': function () {
    const _id = this._id;
    const disabled = !this.disabled;

    AdManager.disableAdvert.call({
      _id,
      disabled
    }, (err) => {
      console.log(err);
    });
  }
});