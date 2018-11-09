import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelIcon,
  PanelTitle,
  PanelLink,
} from 'components/Panel';

export default function ProfileEvents({ events, editMode, object }) {
  return (
    <Panel
      className={classNames({
        'panel-cards': events.length > 0,
      })}
    >
      <PanelHeader className="panel-heading-icon">
        <PanelIcon icon="/images/apps/events.png" />
        <PanelTitle>
          {window.I18n.t('activerecord.models.event.other').capitalize()}
        </PanelTitle>
        {
          editMode &&
            <PanelLink>
              <a href={EventsNew.getDefaultProps().url}>
                <i className="icon-plus" />
              </a>
            </PanelLink>
        }
        {
          events.length === 2 &&
            <PanelLink>
              <a href={`${object.path}/apps/events`}>
                <span className="panel-link-text">{window.I18n.t('utils.actions.see_all.male')}</span>
              </a>
            </PanelLink>
        }
      </PanelHeader>
      <PanelBody>
        {
          events.length > 0 ?
            <Events
              edit_mode={editMode}
              wrapperClassName="col-sm-6"
              events={events}
              className="row"
              card
            />
          :
            <EmptyState className="text-center">
              <EmptyState.Body>
                <p className="lead text-muted">{window.I18n.t('views.dashboard.apps.events.empty.title')}</p>
                <p className="">{window.I18n.t('views.dashboard.apps.events.empty.description')}</p>
                <br />
                <a href={EventsNew.getDefaultProps().url}>
                  {EventsNew.getDefaultProps().label}
                </a>
              </EmptyState.Body>
            </EmptyState>
        }
      </PanelBody>
    </Panel>
  );
}

ProfileEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  object: PropTypes.shape(PropTypes.obj).isRequired,
};

ProfileEvents.defaultProps = {
  editMode: false,
};
