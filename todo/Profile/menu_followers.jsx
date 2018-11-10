import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileMenuFollowers({ followers })  {
  const content = followers.map(follower => (
    <img
      alt={follower.name}
      key={follower.id}
      src={follower.avatar.thumb}
      width={34}
      height={34}
      className="rounded-circle"
    />
  ));
  return (
    <div className="profile-menu-followers hidden-xs">
      {content}
    </div>
  );
}

ProfileMenuFollowers.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.object),
};

ProfileMenuFollowers.defaultProps = {
  followers: [],
};
