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

export default class ProfileProjects extends Component {

  add = (project) => {
    this.props.onAdd('projects', project);
  };

  destroy = (project) => {
    this.props.onDestroy('projects', project);
  };

  update = (project) => {
    this.props.onUpdate('projects', project);
  };

  getByKind = kind => (
    this.props.projects.filter(project => project.kind === kind)
  );

  renderProjects = (kind, projects) => {
    if (projects.length > 0) {
      return (
        <div className="media-card-list">
          {
            projects.map(project => (
              <Project
                key={project.id}
                project={project}
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
            <p className="lead text-muted">{window.I18n.t(`apps.projects.views.index.empty.any.${kind}`)}</p>
            <p className="">{window.I18n.t(`apps.projects.description.${kind}`)}</p>
            <br />
            <ProjectsNew onSave={this.add} kind={kind} className="btn btn-primary" />
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
      const projects = this.getByKind(kind);
      if (this.props.editMode || projects.length > 0) {
        return (
          <Panel
            key={`projects-${kind}`}
            className={classNames({
              'editable-content': editMode,
            })}
          >
            <PanelHeader className="panel-heading-icon">
              <PanelIcon icon={`/images/icons/${kind}s.png`} />
              <PanelTitle>
                {window.I18n.t(`activerecord.attributes.project.kinds.${kind}`)}
              </PanelTitle>
              {
                editMode &&
                  <PanelLink>
                    <ProjectsNew onSave={this.add} kind={kind}>
                      <i className="icon-plus" />
                    </ProjectsNew>
                  </PanelLink>
              }
            </PanelHeader>
            {this.renderProjects(kind, projects)}
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

ProfileProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  kinds: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func,
  onDestroy: PropTypes.func,
  onUpdate: PropTypes.func,
};

ProfileProjects.defaultProps = {
  editMode: false,
  kinds: ['project', 'service'],
  onAdd: () => {},
  onDestroy: () => {},
  onUpdate: () => {},
};
