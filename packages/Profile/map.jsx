import React from 'react';
import PropTypes from 'prop-types';

import {
  Panel,
  PanelHeader,
  PanelIcon,
  PanelTitle,
} from 'components/Panel';

export default function ProfileMap({ item }) {
  return (
    <Panel
      style={{
        position: 'relative',
        minHeight: 256,
      }}
    >
      <PanelHeader className="panel-heading-icon">
        <PanelIcon icon="/images/icons/map.png" />
        <PanelTitle>
          {window.I18n.t('views.organizations.show.map')}
        </PanelTitle>
      </PanelHeader>
      <Map
        markerable={item}
        lat={item.location.lat}
        lon={item.location.lon}
        wrapperClassName="profile-map-wrapper"
        height="100%"
      />
    </Panel>
  );
}

ProfileMap.propTypes = {
  item: PropTypes.shape(PropTypes.obj).isRequired,
};
