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

The `adManagerAdmin` template gives you the ability to add or delete an advert. It also allows you to preview an advert and see how many times it has been clicked.