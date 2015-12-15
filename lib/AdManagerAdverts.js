AdManagerAdverts = new Mongo.Collection('ad_manager_adverts');

AdManagerAdvertsSchema = new SimpleSchema({
  name: {
    type: String,
    unique: true
  },
  url: {
    type: String,
    regEx: SimpleSchema.RegEx.Url
  },
  text: {
    type: String,
    optional: true
  },
  imageUrl: {
    type: String,
    optional: true,
    // regEx: SimpleSchema.RegEx.Url
  },
  extraData: {
    type: Object,
    blackbox: true,
    optional: true
  },
  clicks: {
    type: Number,
    defaultValue: 0,
    min: 0,
    optional: true
  }
});

AdManagerAdverts.attachSchema(AdManagerAdvertsSchema);