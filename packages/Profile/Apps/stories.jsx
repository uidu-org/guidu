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

export default function ProfileStories({ stories, editMode, object }) {
  return (
    <Panel
      className={classNames({
        'panel-cards': stories.length > 0,
      })}
    >
      <PanelHeader className="panel-heading-icon">
        <PanelIcon icon="/images/apps/stories.png" />
        <PanelTitle>
          {window.I18n.t('views.users.show.stories')}
        </PanelTitle>
        {
          editMode &&
            <PanelLink>
              <a href={StoriesNew.getDefaultProps().url}>
                <i className="icon-plus" />
              </a>
            </PanelLink>
        }
        {
          stories.length === 2 &&
            <PanelLink>
              <a href={`${object.path}/apps/stories`}>
                <span className="panel-link-text">{window.I18n.t('utils.actions.see_all.female')}</span>
              </a>
            </PanelLink>
        }
      </PanelHeader>
      <PanelBody>
        {
          stories.length > 0 ?
            <Stories
              edit_mode={editMode}
              wrapperClassName="col-sm-6"
              stories={stories}
              className="row"
              card
            />
          :
            <EmptyState className="text-center">
              <EmptyState.Body>
                <p className="lead text-muted">{window.I18n.t('views.dashboard.apps.stories.empty.title')}</p>
                <p className="">{window.I18n.t('views.dashboard.apps.stories.empty.description')}</p>
                <br />
                <a href={StoriesNww.getDefaultProps().url}>
                  {StoriesNww.getDefaultProps().label}
                </a>
              </EmptyState.Body>
            </EmptyState>
        }
      </PanelBody>
    </Panel>
  );
}
