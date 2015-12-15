Template.adManagerRandomAd.onCreated(function () {
  this.ad = new ReactiveVar(null);

  Meteor.call('AdManager.getRandomAdvert', (err, res) => {
    if (err) {
      console.log(err);
    } else {
      this.ad.set(res);
    }
  });
});

Template.adManagerRandomAd.helpers({
  ad: function () {
    return Template.instance().ad.get();
  }
});

Template.adManagerAd.events({
  'click a': function (e) {
    AdManager.clickAdvert.call({_id: this._id});
  }
});