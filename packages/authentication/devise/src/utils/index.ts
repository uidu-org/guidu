export const alternativeScope = scope =>
  scope === 'registrations' ? 'sessions' : 'registrations';

export const userDataFromIdentity = ({ provider, data }) => {
  let firstName;
  let lastName;
  let avatar;
  let email;

  switch (provider) {
    case 'google':
      firstName = data.givenName;
      lastName = data.familyName;
      avatar = data.imageUrl;
      break;
    case 'facebook':
      firstName = data.profile.first_name;
      lastName = data.profile.last_name;
      avatar = data.profile.picture ? data.profile.picture.data.url : '';
      email = data.profile.email;
      break;
    default:
      firstName = '';
      lastName = '';
      avatar = '';
      break;
  }

  return {
    email,
    firstName,
    lastName,
    avatar,
  };
};
