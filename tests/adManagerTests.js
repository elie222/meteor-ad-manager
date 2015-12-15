Tinytest.add('Both - AdManager exists', function (test) {
  test.isNotUndefined(AdManager);
});

Tinytest.add('Both - addAdvert - admin can add an ad', function (test) {
  reset();

  Roles.userIsInRole = () => true;

  const advert = {
    name: 'hello',
    url: 'http://hello.com'
  };

  AdManager.addAdvert.call(advert);
  
  test.equal(AdManager.getAllAdverts().count(), 1);
});

Tinytest.add('Both - addAdvert - non admin cant add an ad', function (test) {
  reset();

  Roles.userIsInRole = () => false;

  const currentCount = AdManager.getAllAdverts().count();

  const advert = {
    name: 'hello',
    url: 'http://hello.com'
  };

  test.throws(function () {
    AdManager.addAdvert.call(advert);
  }, 'not-admin');
  
  test.equal(AdManager.getAllAdverts().count(), currentCount);
});

Tinytest.add('Both - editAdvert - admin can edit an ad', function (test) {
  reset();

  Roles.userIsInRole = () => true;

  const advert = {
    name: 'hello',
    url: 'http://hello.com'
  };

  AdManager.addAdvert.call(advert);
  
  const editAd = {
    name: 'chello',
    url: 'http://hello.com'
  };

  AdManager.editAdvert.call({
    currentName: 'hello',
    advert: editAd
  });

  test.equal(AdManager.getAllAdverts().count(), 1);

  const editedAdvert = AdManager.getAdvertByName('chello');

  test.equal({
    name: editedAdvert.name,
    url: editedAdvert.url,
  }, editAd);
});

Tinytest.add('Both - editAdvert - non admin cant edit an ad', function (test) {
  reset();

  Roles.userIsInRole = () => true;

  AdManager.addAdvert.call({
    name: 'hello',
    url: 'http://hello.com'
  });
  
  const editAd = {
    name: 'xello',
    url: 'http://hello.com'
  };

  Roles.userIsInRole = () => false;

  test.throws(function () {
    AdManager.editAdvert.call({
      currentName: 'hello',
      advert: editAd
    });
  }, 'not-admin');

  const editedAdvert = AdManager.getAdvertByName('xello');

  test.isUndefined(editedAdvert);
});

Tinytest.add('Both - removeAdvertById - admin can remove an ad', function (test) {
  reset();

  Roles.userIsInRole = () => true;

  const ad = {
    name: 'hello',
    url: 'http://hello.com'
  };

  AdManager.addAdvert.call(ad);

  test.equal(AdManager.getAllAdverts().count(), 1);

  const _id = AdManagerAdverts.findOne(ad)._id;

  AdManager.removeAdvertById.call({ _id });

  test.equal(AdManager.getAllAdverts().count(), 0);
});

Tinytest.add('Both - removeAdvertById - non admin cant remove an ad', function (test) {
  reset();

  Roles.userIsInRole = () => true;
  
  const ad = {
    name: 'hello',
    url: 'http://hello.com'
  };

  AdManager.addAdvert.call(ad);
  
  test.equal(AdManager.getAllAdverts().count(), 1);

  Roles.userIsInRole = () => false;

  const _id = AdManagerAdverts.findOne(ad)._id;

  test.throws(function () {
    AdManager.removeAdvertById.call({ _id });    
  }, 'not-admin');

  test.equal(AdManager.getAllAdverts().count(), 1);
});