export const fetchDonations = () => {
  return fetch(
    'https://uidufundraising.uidu.local:8443/dashboard/apps/donations.json',
  )
    .then(result => result.json())
    .then(rowData => rowData);
};
