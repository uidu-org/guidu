import React from 'react';
import classNames from 'classnames';
import is from 'is_js';

export default function Avatar({ name, klass, kind, className, avatar }) {
  const getInitials = () => {
    if (name) {
      const initials = name.match(/\b\w/g);
      let out = initials.shift();
      if (initials.length > 0) {
        out += initials.pop();
      }
      return out.toUpperCase();
    }
    return '';
  };

  const c = classNames(className, {
    'card-avatar': true,
    'rounded-circle': klass === 'User',
    rounded:
      klass === 'Organization' ||
      klass === 'Collection' ||
      klass === 'Story' ||
      klass === 'Event',
    'media-object': kind === 'media',
  });

  if (klass === 'Contact') {
    return (
      <div className={`${c} card-avatar contact-avatar`}>{getInitials()}</div>
    );
  }

  return (
    <img
      className={c}
      src={is.object(avatar) ? avatar.thumb : avatar}
      alt={name}
    />
  );
}
