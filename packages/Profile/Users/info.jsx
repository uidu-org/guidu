import React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import {
  Panel,
  PanelHeader,
  PanelIcon,
  PanelTitle,
  PanelBody,
} from 'components/Panel';

import InlineEdit from 'components/InlineEdit';

import {
  Select,
  Textarea,
  Checkbox,
  InputGeosuggest,
  DateInput,
} from '@uidu/inputs';

export default function ProfileUserInfo({
  user,
  editMode,
  update,
  ...otherProps
}) {
  return (
    <Panel className={classNames({ 'editable-content': editMode })}>
      {/*<Map markerable={user} lat={user.location.lat} lon={user.location.lon} />*/}
      <PanelBody className="profile-info">
        <dl>
          <dt>{user.name}</dt>
          <InlineEdit
            {...otherProps}
            onSave={update}
            placeholder={window.I18n.t('activerecord.prompts.user.address')}
            form={
              <InputGeosuggest
                name="user[address]"
                value={user.location.city}
                label={window.I18n.t('activerecord.attributes.user.address')}
                placeholder={window.I18n.t('activerecord.prompts.user.address')}
                geocoderType="(cities)"
                autoFocus
              />
            }
            editMode={editMode}
          >
            <dd>{user.location.city}</dd>
          </InlineEdit>
          {(editMode || user.employment_status) && (
            <InlineEdit
              {...otherProps}
              onSave={update}
              placeholder={window.I18n.t(
                'activerecord.prompts.user.employment_status',
              )}
              form={
                <Select
                  name="user[employment_status]"
                  value={user.employment_status}
                  label={window.I18n.t(
                    'activerecord.attributes.user.employment_status',
                  )}
                  placeholder={window.I18n.t(
                    'activerecord.prompts.user.employment_status',
                  )}
                  autoFocus
                  options={[
                    {
                      id: 'student',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.student',
                      ),
                    },
                    {
                      id: 'unemployed',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.unemployed',
                      ),
                    },
                    {
                      id: 'employed',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.employed',
                      ),
                    },
                    {
                      id: 'freelance',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.freelance',
                      ),
                    },
                    {
                      id: 'entrepreneur',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.entrepreneur',
                      ),
                    },
                    {
                      id: 'retired',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.retired',
                      ),
                    },
                    {
                      id: 'other',
                      name: window.I18n.t(
                        'activerecord.attributes.user.employment_statuses.other',
                      ),
                    },
                  ]}
                />
              }
              editMode={editMode}
            >
              <dd>
                {window.I18n.t(
                  `activerecord.attributes.user.employment_statuses.${
                    user.employment_status
                  }`,
                )}
              </dd>
            </InlineEdit>
          )}
          {(editMode || user.birthdate) && (
            <InlineEdit
              {...otherProps}
              onSave={update}
              placeholder={window.I18n.t('activerecord.prompts.user.birthdate')}
              form={
                <DateInput
                  name="user[birthdate]"
                  label={window.I18n.t(
                    'activerecord.attributes.user.birthdate',
                  )}
                  placeholder={window.I18n.t(
                    'activerecord.prompts.user.birthdate',
                  )}
                  value={user.birthdate}
                  selectYears={100}
                  max={moment()._d}
                  autoFocus
                  selectMonths
                />
              }
              editMode={editMode}
            >
              <dd>{moment(user.birthdate).format('LL')}</dd>
            </InlineEdit>
          )}
          {(editMode || (user.interests && user.interests.length > 0)) && (
            <div>
              <dt>{window.I18n.t('views.users.show.interests')}</dt>
              <InlineEdit
                {...otherProps}
                onSave={update}
                placeholder={window.I18n.t(
                  'activerecord.prompts.user.interests',
                )}
                form={
                  <Select
                    layout="elementOnly"
                    placeholder={window.I18n.t(
                      'activerecord.prompts.user.interests',
                    )}
                    value={user.interests ? user.interests.split(', ') : []}
                    options={user.interests ? user.interests.split(', ') : []}
                    name="user[interest_list]"
                    multiple
                    create
                    autoFocus
                  />
                }
                editMode={editMode}
              >
                {user.interests &&
                  user.interests
                    .split(', ')
                    .map(elem => (
                      <span className="badge badge-pill">{elem}</span>
                    ))}
              </InlineEdit>
            </div>
          )}
          {(editMode || (user.sectors && user.sectors.length > 0)) && (
            <div>
              <dt>{window.I18n.t('views.users.show.sectors')}</dt>
              <InlineEdit
                {...otherProps}
                onSave={update}
                placeholder={window.I18n.t('activerecord.prompts.user.sectors')}
                form={
                  <Select
                    layout="elementOnly"
                    placeholder={window.I18n.t(
                      'activerecord.prompts.user.sectors',
                    )}
                    value={user.sectors ? user.sectors.split(', ') : []}
                    options={window.I18n.t('sectors')}
                    name="user[sector_list]"
                    multiple
                    autoFocus
                  />
                }
                editMode={editMode}
              >
                {user.sectors &&
                  user.sectors
                    .split(',')
                    .map(elem => (
                      <span className="badge badge-pill">{elem}</span>
                    ))}
              </InlineEdit>
            </div>
          )}
          {(editMode || user.availability.status || user.availability.when) && (
            <dt>{window.I18n.t('views.users.show.availability')}</dt>
          )}
          {(editMode || user.availability_status) && (
            <InlineEdit
              {...otherProps}
              onSave={update}
              placeholder={window.I18n.t(
                'activerecord.prompts.user.availability_status',
              )}
              form={
                <Checkbox
                  label={window.I18n.t(
                    'activerecord.attributes.user.availability_status',
                  )}
                  name="user[availability_status]"
                  value={
                    user.availability.status
                      ? user.availability.status === 'available'
                        ? 'true'
                        : 'false'
                      : undefined
                  }
                  layout="elementOnly"
                  autoFocus
                />
              }
              editMode={editMode}
            >
              <dd>
                <i className="icon-check" />{' '}
                {window.I18n.t(
                  `activerecord.attributes.user.availability_statuses.${
                    user.availability.status
                  }`,
                )}
              </dd>
            </InlineEdit>
          )}
          <InlineEdit
            {...otherProps}
            onSave={update}
            placeholder={window.I18n.t(
              'activerecord.prompts.user.availability_when',
            )}
            form={
              <Textarea
                label={window.I18n.t(
                  'activerecord.attributes.user.availability_when',
                )}
                placeholder={window.I18n.t(
                  'activerecord.prompts.user.availability_when',
                )}
                value={user.availability.when}
                className="form-control form-control-autosize"
                name="user[availability_when]"
                autoFocus
                rows={5}
              />
            }
            editMode={editMode}
          >
            <dd>{user.availability.when}</dd>
          </InlineEdit>
        </dl>
      </PanelBody>
    </Panel>
  );
}
