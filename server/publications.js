Meteor.publish('adManagerAds', () => {
  return AdManager.getAllAdverts();
});