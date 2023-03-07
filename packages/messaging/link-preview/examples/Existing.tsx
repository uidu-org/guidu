import React from 'react';
import LinkPreview from '../src';

export default function Existing() {
  return (
    <LinkPreview
      url="https://uidu.org"
      data={{
        lang: 'it',
        author: null,
        title: 'Home Page | uidu',
        publisher: 'uidu',
        image: 'https://uidu.org/assets/seo/00_uidu_thumbnail.png',
        date: null,
        description:
          'Uidu is where nonprofit organizations meet citizens, professionals and businesses to make social impact together, efficiently.',
        logo: 'https://uidu.org/favicon/apple-touch-icon.png',
        url: 'https://uidu.org',
        video: null,
      }}
    />
  );
}
