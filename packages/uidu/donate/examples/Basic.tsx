import React, { Component } from 'react';
import 'swiper/dist/css/swiper.min.css';
import Donate from '../';

export default class Basic extends Component<any, any> {
  render() {
    return (
      <Donate
        donation={{}}
        currentOrganization={{ name: 'Charity Water' }}
        donationCampaign={{ name: 'The Spring' }}
        onCreate={(_donation, token) => console.log(token)}
      />
    );
  }
}
