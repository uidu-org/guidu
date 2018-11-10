import React, { Component } from 'react';
import { Form, FormSubmit } from '@uidu/forms';
import PropTypes from 'prop-types';
import { PageHeader } from 'utils/components';
import { Checkbox } from '@uidu/inputs';

export default class SettingsPage extends Component {
  render() {
    const { scope, availablePreferences, preferences } = this.props;
    return [
      <PageHeader name="Impostazioni" />,
      <div className="container-fluid px-md-4">
        <Form
          footerRenderer={({ canSubmit, loading }) => (
            <div className="row">
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <FormSubmit
                  loading={loading}
                  canSubmit={canSubmit}
                  label="Salva"
                  className={`btn btn-${scope} btn-block`}
                />
              </div>
            </div>
          )}
          handleSubmit={console.log}
        >
          {Object.keys(availablePreferences).map(availablePreferencesGroup => (
            <div>
              <p className="text-uppercase">{availablePreferencesGroup}</p>
              <div className="mb-4">
                {Object.keys(
                  availablePreferences[availablePreferencesGroup],
                ).map(availablePreferenceName => {
                  const availablePreference =
                    availablePreferences[availablePreferencesGroup][
                      availablePreferenceName
                    ];
                  return (
                    <div className="mb-2">
                      <Checkbox
                        layout="elementOnly"
                        label={window.I18n.t(
                          `apps.preferences.${availablePreferencesGroup}.${availablePreferenceName}`,
                        )}
                        name={`preferences[${availablePreferencesGroup}][${availablePreferenceName}]`}
                        value={
                          (preferences &&
                            preferences[availablePreferencesGroup] &&
                            preferences[availablePreferencesGroup][
                              availablePreferenceName
                            ]) ||
                          availablePreference.default
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </Form>
      </div>,
    ];
  }
}

SettingsPage.propTypes = {};
