import React, { Component } from 'react';
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

export default class ProfileExperiences extends Component {

  add = (experience) => {
    this.props.onAdd('experiences', experience);
  };

  destroy = (experience) => {
    this.props.onDestroy('experiences', experience);
  };

  update = (experience) => {
    this.props.onUpdate('experiences', experience);
  };

  getByKind = kind => (
    this.props.experiences.filter(experience => experience.kind === kind)
  );

  renderExperiences = (kind, experiences) => {
    if (experiences.length > 0) {
      return (
        <div className="media-card-list">
          {
            experiences.map(experience => (
              <Experience
                key={experience.id}
                experience={experience}
                onUpdate={this.update}
                onDestroy={this.destroy}
                edit_mode={this.props.editMode}
              />
            ), this)
          }
        </div>
      );
    }
    return (
      <PanelBody>
        <EmptyState className="text-center">
          <EmptyState.Body>
            <p className="lead text-muted">{window.I18n.t(`apps.experiences.views.index.empty.any.${kind}`)}</p>
            <p className="">{window.I18n.t(`apps.experiences.description.${kind}`)}</p>
            <br />
            <ExperiencesNew onSave={this.add} kind={kind} className="btn btn-primary" />
          </EmptyState.Body>
        </EmptyState>
      </PanelBody>
    );
  };

  renderPanels = () => {
    const {
      kinds,
      editMode,
    } = this.props;

    return kinds.map((kind) => {
      const experiences = this.getByKind(kind);
      if (this.props.editMode || experiences.length > 0) {
        return (
          <Panel
            key={`experiences-${kind}`}
            className={classNames({
              'editable-content': editMode,
            })}
          >
            <PanelHeader className="panel-heading-icon">
              <PanelIcon icon={`/images/icons/experiences-${kind}.png`} />
              <PanelTitle>
                {window.I18n.t(`activerecord.attributes.experience.kinds.${kind}`)}
              </PanelTitle>
              {
                editMode &&
                  <PanelLink>
                    <ExperiencesNew onSave={this.add} kind={kind}>
                      <i className="icon-plus" />
                    </ExperiencesNew>
                  </PanelLink>
              }
            </PanelHeader>
            {this.renderExperiences(kind, experiences)}
          </Panel>
        );
      }
      return null;
    }, this);
  };

  render() {
    return (
      <div>
        {this.renderPanels()}
      </div>
    );
  }
}

ProfileExperiences.propTypes = {
  experiences: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  kinds: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func,
  onDestroy: PropTypes.func,
  onUpdate: PropTypes.func,
};

ProfileExperiences.defaultProps = {
  editMode: false,
  kinds: ['volunteer', 'work', 'education'],
  onAdd: () => {},
  onDestroy: () => {},
  onUpdate: () => {},
};
