# AdManager

Add this package to your Meteor project by running:

*meteor add elie:ad-manager*

This package allows you to easily add and remove adverts to your site as well as giving you basic analytics data as to which adverts are being clicked on the most.

## How to use

Get a random advert from the server and display it using:

```
{{> adManagerRandomAd}}
```

This will show a random clickable image advert. See below for how to add an advert.

## Admin

This package uses `alanning:roles` for user permissions. Only a user with the role `admin` can add, edit or remove an advert.

The admin template is:

```
{{> adManagerAdmin}}
```

The admin template uses `bootstrap` classes for styling. This package doesn't bring any of its own CSS with it.

## Analytics Integration

If you use the `okgrow:analytics` package, each advert click will be tracked as an analytics event and include all the information relating to the advert (advert id, url and image url).