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

export default function ProfileCalls({ calls, editMode, object }) {
  return (
    <Panel
      className={classNames({
        'panel-cards': calls.length > 0,
      })}
    >
      <PanelHeader className="panel-heading-icon">
        <PanelIcon icon="/images/apps/calls.png" />
        <PanelTitle>
          {window.I18n.t('activerecord.models.call.other').capitalize()}
        </PanelTitle>
        {editMode && (
          <PanelLink>
            <a href={CallsNew.getDefaultProps().url}>
              <i className="icon-plus" />
            </a>
          </PanelLink>
        )}
        {calls.length === 2 && (
          <PanelLink>
            <a href={`${object.path}/apps/calls`}>
              <span className="panel-link-text">
                {window.I18n.t('utils.actions.see_all.male')}
              </span>
            </a>
          </PanelLink>
        )}
      </PanelHeader>
      <PanelBody>
        {calls.length > 0 ? (
          <Calls
            edit_mode={editMode}
            className="row"
            calls={calls}
            wrapperClassName="col-sm-6"
            card
          />
        ) : (
          <EmptyState className="text-center">
            <EmptyState.Body>
              <p className="lead text-muted">
                {window.I18n.t('views.dashboard.apps.calls.empty.title')}
              </p>
              <p className="">
                {window.I18n.t('views.dashboard.apps.calls.empty.description')}
              </p>
              <br />
              <a href={CallsNew.getDefaultProps().url}>
                {CallsNew.getDefaultProps().label}
              </a>
            </EmptyState.Body>
          </EmptyState>
        )}
      </PanelBody>
    </Panel>
  );
}

ProfileCalls.propTypes = {
  calls: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  object: PropTypes.shape(PropTypes.obj).isRequired,
};

ProfileCalls.defaultProps = {
  editMode: false,
};
