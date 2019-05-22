export const alternativeScope = scope =>
  scope === 'registrations' ? 'sessions' : 'registrations';

export const userDataFromIdentity = ({ provider, data }) => {
  let firstName;
  let lastName;
  let avatar;

  switch (provider) {
    case 'google':
      firstName = data.givenName;
      lastName = data.familyName;
      avatar = data.imageUrl;
      break;
    case 'facebook':
      firstName = data.first_name;
      lastName = data.last_name;
      avatar = data.picture ? data.picture.data.url : '';
      break;
    default:
      firstName = '';
      lastName = '';
      avatar = '';
      break;
  }

  return {
    firstName,
    lastName,
    avatar,
  };
};
