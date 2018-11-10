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

export default function ProfileCollections({ collections, editMode, object }) {
  return (
    <Panel
      className={classNames({
        'panel-cards': collections.length > 0,
      })}
    >
      <PanelHeader className="panel-heading-icon">
        <PanelIcon icon="/images/apps/collections.png" />
        <PanelTitle>
          {window.I18n.t('views.users.show.collections')}
        </PanelTitle>
        {
          editMode &&
            <PanelLink>
              <a href={CollectionsNew.getDefaultProps().url}>
                <i className="icon-plus" />
              </a>
            </PanelLink>
        }
        {
          collections.length === 2 &&
            <PanelLink>
              <a href={`${object.path}/apps/collections`}>
                <span className="panel-link-text">{window.I18n.t('utils.actions.see_all.female')}</span>
              </a>
            </PanelLink>
        }
      </PanelHeader>
      <PanelBody>
        {
          collections.length > 0 ?
            <Collections
              edit_mode={editMode}
              wrapperClassName="col-sm-6"
              collections={collections}
              className="row"
              card
            />
          :
            <EmptyState className="text-center">
              <EmptyState.Body>
                <p className="lead text-muted">{window.I18n.t('views.dashboard.apps.collections.empty.title')}</p>
                <p className="">{window.I18n.t('views.dashboard.apps.collections.empty.description')}</p>
                <br />
                <a href={CollectionsNew.getDefaultProps().url}>
                  {CollectionsNew.getDefaultProps().label}
                </a>
              </EmptyState.Body>
            </EmptyState>
        }
      </PanelBody>
    </Panel>
  );
}
