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
  // contextmenu captures right clicks. Doesn't mean the user necessarily navigated to that
  // page when he right clicks, but good chance he did. Not sure there's an easy way to know
  // for sure if someone right clicked and then opened in a new tab
  'click a, contextmenu a': function (e) {
    if (!Template.currentData().dontRegisterClick) {
      AdManager.clickAdvert.call({_id: this._id});
    }
  }
});