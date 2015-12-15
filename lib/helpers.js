checkIsAdmin = (userId) => {
  if (!Roles.userIsInRole(userId, ['admin']))
    throw new Meteor.Error('not-admin', 'You must be admin to call this method');
}
