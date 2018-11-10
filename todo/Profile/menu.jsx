import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import snakeCase from 'lodash/snakeCase';

import ProfileMenuFollowers from './menu_followers';

export default class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.isExpired = (date) => {
      if (date === undefined) {
        return false;
      }
      return moment(date).isBefore(moment());
    };
  }

  isSelf = () => {
    const compared = this.props.object.owner || this.props.object;
    return window.Uidu.current_actor && (compared.uid === window.Uidu.current_actor.uid);
  };

  render() {
    const {
      object,
      editMode,
      onFollow,
      following,
      followers,
      editable,
      additionalButton,
      collectable,
    } = this.props;

    return (
      <div className="hero-menu-container">
        <div className="hero-menu">
          <div className="container text-center">
            <div className="pull-left">
              {
                !editMode &&
                  (
                    window.Uidu.current_user ?
                      <div>
                        <Follow
                          path={object.path}
                          className="show-on-affix"
                          baseStyle="btn"
                          onFollow={onFollow}
                          followable={object}
                          active={following}
                        />
                        <h6 style={{ marginLeft: 16 }} className="show-on-affix hidden-xs">{object.name}</h6>
                      </div>
                    :
                      <div className="show-on-affix">
                        <Sequence
                          stayOnPage
                          redirectOnFinish={object.path}
                          namespace="follow"
                          action="toggle"
                        >
                          <Follow
                            path={object.path}
                            followable={object}
                            className="show-on-affix"
                            baseStyle="btn"
                            onFollow={onFollow}
                            active={following}
                          />
                        </Sequence>
                        <h6 style={{ marginLeft: 16 }} className="show-on-affix hidden-xs">{object.name}</h6>
                      </div>
                  )
              }
              <span className="hide-on-affix">
                <ProfileMenuFollowers followers={followers} />
                <Followers object={object}>
                  <button className="btn btn-simple">
                    {window.I18n.t(`utils.actions.followed.${snakeCase(object.klass)}.${(object.gender || 'female')}`, {
                      count: object.followers.users + object.followers.organizations,
                    })}
                  </button>
                </Followers>
              </span>
            </div>
            <div className="pull-right profile-menu-actions">
              {
                !editMode &&
                  (
                    window.Uidu.current_user ?
                      <ConversationsNew
                        className={classNames('btn btn-simple btn-icon', {
                          'btn-disabled disabled': this.isSelf(),
                        })}
                        participants={[object.owner || object]}
                      >
                        <i className="icon-envelope" /> <span className="icon-descriptor">{window.I18n.t('utils.actions.message')}</span>
                      </ConversationsNew>
                    :
                      <Sequence
                        stayOnPage
                        redirectOnFinish={object.path}
                        style={{ marginRight: 8 }}
                        tag="span"
                        overlay="conversations"
                        steps={[
                          {
                            flash: 'sequence.flashes.conversations',
                            component: 'ConversationsForm',
                            url: ConversationsNew.getDefaultProps().url,
                            label: ConversationsNew.getDefaultProps().label,
                            props: {
                              participants: [object.owner || object],
                            },
                          },
                        ]}
                      >
                        <ConversationsNew
                          className="btn btn-simple btn-icon"
                          participants={[object.owner || object]}
                        >
                          <i className="icon-envelope" /> {window.I18n.t('utils.actions.message')}
                        </ConversationsNew>
                      </Sequence>
                  )
              }
              <div className="btn-group">
                <button type="button" className="btn btn-simple btn-icon dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="icon-options-vertical" />
                </button>
                <ul className="dropdown-menu dropdown-menu-right dropdown-sm dropdown-menu-over">
                  {
                    editMode &&
                      <li className="dropdown-admin-item">
                        <a href={object.admin_path}>{window.I18n.t('utils.actions.admin_dashboard')}</a>
                      </li>
                  }
                  {
                    editable &&
                      <li className="dropdown-admin-item">
                        {editable}
                      </li>
                  }
                  { editMode && <li role="separator" className="divider" /> }
                  {additionalButton}
                  {
                    (!editMode && collectable) &&
                      <li>
                        {
                          window.Uidu.current_user ?
                            <CollectionsCollect
                              className=""
                              item={object}
                            />
                          :
                            <Sequence
                              stayOnPage
                              forceRefresh
                              redirectOnFinish=""
                              forceMessage={{
                                login: 'sequence.overlays.login.actions.collect',
                                register: 'sequence.overlays.register.actions.collect',
                              }}
                              tag="span"
                              steps={[{
                                modalClassName: 'modal-lg',
                                component: <CollectionsAdd label={CollectionsCollect.getDefaultProps().label} item={object} />,
                                flash: 'sequence.flashes.collect',
                              }]}
                            >
                              <CollectionsCollect
                                className=""
                                item={object}
                              />
                            </Sequence>
                        }
                      </li>
                  }
                  {
                    !editMode &&
                      <li
                        className={classNames({
                          disabled: this.isSelf(),
                        })}
                      >
                        {
                          window.Uidu.current_user ?
                            <ConversationsNew
                              participants={[object.owner || object]}
                            />
                          :
                            <Sequence
                              stayOnPage
                              redirectOnFinish={object.path}
                              style={{ marginRight: 8 }}
                              tag="span"
                              className="is-block"
                              overlay="conversations"
                              steps={[
                                {
                                  flash: 'sequence.flashes.conversations',
                                  component: 'ConversationsForm',
                                  url: ConversationsNew.getDefaultProps().url,
                                  label: ConversationsNew.getDefaultProps().label,
                                  props: {
                                    participants: [object.owner || object],
                                  },
                                },
                              ]}
                            >
                              <ConversationsNew
                                participants={[object.owner || object]}
                              />
                            </Sequence>
                        }
                      </li>
                  }
                  <li role="separator" className="divider" />
                  { !editMode && <li><a href="mailto:info@uidu.org">{window.I18n.t('utils.actions.report')}</a></li> }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileMenu.propTypes = {
  object: PropTypes.shape(PropTypes.obj).isRequired,
  editMode: PropTypes.bool,
  onFollow: PropTypes.func,
  following: PropTypes.bool,
  followers: PropTypes.arrayOf(PropTypes.object),
  editable: PropTypes.element,
  additionalButton: PropTypes.element,
  collectable: PropTypes.bool,
};

ProfileMenu.defaultProps = {
  editMode: false,
  onFollow: () => {},
  following: false,
  followers: [],
  editable: undefined,
  additionalButton: undefined,
  collectable: false,
};
