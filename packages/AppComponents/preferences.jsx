import React from 'react';
import classNames from 'classnames';
import PreferencesEmail from './preferences-email';
import PreferencesMessage from './preferences-message';

const components = {
  PreferencesEmail,
  PreferencesMessage,
};

function Preference({ preferenceType, ...otherProps }) {
  const SpecificPreference = components[preferenceType];
  return <SpecificPreference {...otherProps} />;
}

export default function Preferences({ children, object, ...otherProps }) {
  const renderChildren = () =>
    React.Children.map(children, child =>
      React.cloneElement(child, {
        ...otherProps,
        object,
        callback: false,
      }),
    );

  return (
    <div className="container-fluid">
      <ul className="nav nav-tabs" role="tablist">
        {renderChildren().map(({ props: { name } }, index) => (
          <li
            key={`preference-tab-${name}`}
            role="presentation"
            className={classNames('nav-item', {
              active: index === 0,
            })}
          >
            <a
              className="nav-link"
              href={`#${name}`}
              aria-controls={`${name}`}
              role="tab"
              data-toggle="tab"
            >
              {window.I18n.t(
                `apps.events.views.sections.preferences.${name}.title`,
              )}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {renderChildren().map(({ props, type }, index) => (
          <div
            key={`preference-${props.name}`}
            role="tabpanel"
            id={props.name}
            className={classNames('tab-pane', {
              active: index === 0,
            })}
          >
            <Preference preferenceType={type.name} {...props} />
          </div>
        ))}
      </div>
    </div>
  );
}
