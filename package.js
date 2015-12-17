Package.describe({
  summary: "Help managing adverts.",
  version: "1.1.1",
  name: "elie:ad-manager",
  git: "https://github.com/elie222/meteor-ad-manager.git"
});

Package.onUse(function(api) {
  configure(api);

  api.export('AdManager');
  api.export('AdManagerAdverts');
});

Package.onTest(function(api) {
  configure(api);

  api.use('tinytest');

  api.addFiles('tests/helpers.js')
  api.addFiles('tests/adManagerTests.js')

  api.export('AdManagerAdverts');
});

function configure(api) {
  api.versionsFrom('1.2');

  api.use('ecmascript');
  api.use('check');
  api.use('mongo');
  api.use('random');
  api.use('templating');
  api.use('reactive-var');
  api.use('ddp-rate-limiter@1.0.0')
  api.use('aldeed:simple-schema@1.4.0');
  api.use('aldeed:collection2@2.6.0');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.use('aldeed:delete-button@2.0.0');
  api.use('mdg:validated-method@0.2.2');
  api.use('alanning:roles@1.2.14');
  api.use('zimme:collection-timestampable@1.0.9');

  // both
  api.addFiles('lib/helpers.js');
  api.addFiles('lib/AdManagerAdverts.js');
  api.addFiles('lib/AdManager.js');

  // server
  api.addFiles('server/publications.js', 'server');
  api.addFiles('server/AdManager.js', 'server');

  // client
  api.addFiles('client/views/adManagerAdmin.html', 'client');
  api.addFiles('client/views/adManagerAdmin.js', 'client');
  api.addFiles('client/views/adManagerRandomAd.html', 'client');
  api.addFiles('client/views/adManagerRandomAd.js', 'client');
}