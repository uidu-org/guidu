import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PanelBody } from 'components/Panel';
import { Form, FormFooter, FormMeta, FormSubmit } from '@uidu/forms';
import { Input, Select } from '@uidu/inputs';

export default class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Dona ora',
      size: 'lg',
      color: 'primary',
    };
  }

  handleChange = (name, value) => {
    const variableName = name.split(']')[1].replace('[', '');
    this.setState({
      [variableName]: value.id,
    });
  };

  handleSubmit = model => {
    const { donation_campaign, updateWidgets } = this.props;

    const modelToSubmit = model;

    // const bodyContentState = this.editor.getContentState();
    modelToSubmit.widget.widgetable_type = 'DonationCampaign';
    modelToSubmit.widget.widgetable_id = donation_campaign.id;
    modelToSubmit.authenticity_token = window.Uidu.csrfToken;

    window.$.ajax({
      url: [donation_campaign.admin_path, 'widgets'].join('/'),
      type: 'POST',
      data: modelToSubmit,
      context: this,
      success(response) {
        updateWidgets(response);
      },
    });
  };

  render() {
    const { widgets } = this.props;

    const { text, size, color } = this.state;

    return (
      <div className="container-fluid my-3">
        <PanelBody>
          {widgets.length > 0 ? (
            widgets.map(widget => (
              <div key={widget.code}>
                <h6>
                  {window.I18n.t(
                    'apps.donation_campaigns.views.sections.widgets.preview',
                  )}
                </h6>
                <button
                  className={classNames(
                    'btn btn-fill btn-raised',
                    widget.preferences.size,
                    widget.preferences.color,
                  )}
                >
                  {widget.preferences.text}
                </button>
                <br />
                <br />
                <div className="form-group">
                  <label>
                    {window.I18n.t(
                      'apps.collections.views.sections.widgets.instructions',
                    )}
                  </label>
                  <textarea
                    ref={c => {
                      this.script = c;
                    }}
                    onClick={() => this.script.select()}
                    className="form-control"
                    value={widget.generated_script}
                  />
                  <p className="help-block">
                    {window.I18n.t(
                      'apps.collections.views.sections.widgets.instructions_help',
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="row">
              <div className="col-sm-8">
                <p className="lead">
                  {window.I18n.t(
                    'apps.donation_campaigns.views.sections.widgets.description',
                  )}
                </p>
                <Form
                  ref={c => {
                    this.form = c;
                  }}
                  handleSubmit={this.handleSubmit}
                  submitted={widgets.length > 0}
                  footerRenderer={({ canSubmit }) => (
                    <FormFooter>
                      <FormMeta>
                        <FormSubmit
                          label="Genera il bottone"
                          method="POST"
                          canSubmit={canSubmit}
                        />
                      </FormMeta>
                    </FormFooter>
                  )}
                >
                  <Input
                    label="Testo"
                    value="Dona ora"
                    name="widget[preferences][text]"
                    onChange={this.handleChange}
                    required
                  />
                  <Select
                    label="Scegli la dimensione del bottone"
                    name="widget[preferences][size]"
                    onChange={this.handleChange}
                    options={[
                      {
                        id: 'xs',
                        name: 'Piccolo',
                      },
                      {
                        id: '',
                        name: 'Default',
                      },
                      {
                        id: 'lg',
                        name: 'Grande',
                      },
                    ]}
                    value="lg"
                    required
                  />
                  <Select
                    label="Colore"
                    name="widget[preferences][color]"
                    onChange={this.handleChange}
                    options={[
                      {
                        id: 'secondary',
                        name: 'Nero',
                      },
                      {
                        id: 'primary',
                        name: 'Arancio',
                      },
                    ]}
                    value="primary"
                    required
                  />
                </Form>
              </div>
              <div className="col-sm-4">
                <h6>
                  {window.I18n.t(
                    'apps.donation_campaigns.views.sections.widgets.preview',
                  )}
                </h6>
                <button
                  className={`btn btn-${size} btn-${color} btn-fill btn-raised`}
                >
                  {text}
                </button>
              </div>
            </div>
          )}
        </PanelBody>
      </div>
    );
  }
}

Widgets.propTypes = {
  object: PropTypes.shape(PropTypes.obj),
};

Widgets.defaultProps = {
  object: undefined,
  widgets: [],
};
