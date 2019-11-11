import { Checkbox } from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import Slider from '@uidu/slider';
import React, { PureComponent } from 'react';
import AnimateHeight from 'react-animate-height';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import DeviseForm from './DeviseForm';
import FacebookLoginButton from './Providers/FacebookLoginButton';
import GoogleLoginButton from './Providers/GoogleLoginButton';

export const messages = defineMessages({
  privacy_intro: {
    id: 'guidu.devise.privacy_intro',
    defaultMessage:
      "Per far funzionare uidu, registriamo i dati degli utenti e li condividiamo con alcuni provider. Registrandoti, accetti le Condizioni d'uso e confermi di aver letto e compreso la Privacy Policy.",
    description: '',
  },
  sessions_title: {
    id: 'guidu.devise.sessions_title',
    defaultMessage: 'Sign in',
    description: 'Allows user to perform an action again',
  },
  sessions_description: {
    id: 'guidu.devise.sessions_description',
    defaultMessage:
      "Accedi per visualizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te.",
    description: '',
  },

  sessions_with_provider: {
    id: 'guidu.devise.sessions_with_provider',
    defaultMessage: 'Sign in with {provider}',
    description: '',
  },
  registrations_title: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with your email',
    description: '',
  },
  registrations_description: {
    id: 'guidu.devise.registrations_title',
    defaultMessage:
      "Crea un account per personalizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te, e molto altro.",
    description: '',
  },
  registrations_with_provider: {
    id: 'guidu.devise.registrations_title',
    defaultMessage: 'Sign up with {provider}',
    description: '',
  },
  simple_sessions_remember_me_label: {
    id: 'guidu.devise.simple_sessions_remember_me_label',
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
});

export default class Providers extends PureComponent<any, any> {
  private slider: any = React.createRef();

  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      currentUser,
      exist: false,
    };
  }

  componentDidMount() {
    const { location } = this.props;
    this.slider.current.to(this.activeSlideByRoute(location));
  }

  UNSAFE_componentWillReceiveProps({ location }) {
    this.slider.current.to(this.activeSlideByRoute(location));
  }

  handleSubmit = model => {
    const { routes, checkExistence, history } = this.props;
    return checkExistence(model.user.email).then(response => {
      if (response.data.exists) {
        return this.setState(
          {
            exist: true,
            currentUser: model.user,
          },
          () => {
            this.slider.current.update();
            this.slider.current.mySlider.updateAutoHeight(500);
          },
        );
      }
      return this.update(model.user).then(() =>
        history.push(routes.registrations),
      );
    });
  };

  update = async model => {
    const { currentUser } = this.state;
    await this.setState({
      currentUser: {
        ...currentUser,
        ...model,
      },
    });
    return this.state.currentUser;
  };

  activeSlideByRoute = ({ pathname }) => {
    const { routes } = this.props;
    if (pathname === routes.registrations) {
      return 1;
    }
    return 0;
  };

  render() {
    const {
      routes,
      scope,
      authSignIn,
      onAuthSignIn,
      onAuthSignInError,
      history,
      location,
    } = this.props;

    const { currentUser, exist } = this.state;

    return (
      <div>
        <Slider
          options={{
            autoHeight: true,
            slidesPerView: 1,
            allowTouchMove: true,
            initialSlide: this.activeSlideByRoute(location), // step ? this.slideNames().indexOf(step) : 0,
          }}
          ref={this.slider}
        >
          <div>
            <div className="text-center">
              <h3>
                <FormattedMessage {...messages[`${scope}_title`]} />
              </h3>
              <p>
                <FormattedMessage {...messages[`${scope}_description`]} />
              </p>
            </div>
            <FacebookLoginButton
              onCompleted={auth =>
                authSignIn(auth, 'facebook').then(response => {
                  if (response.currentUser) {
                    //
                    return null;
                  }
                  return history.push(`${routes.registrations}/email`);
                })
              }
              onError={onAuthSignInError}
              label={
                <FormattedMessage
                  {...messages[`${scope}_with_provider`]}
                  values={{
                    provider: (
                      <span className="font-weight-bold">Facebook</span>
                    ),
                  }}
                />
              }
            />
            <GoogleLoginButton
              onCompleted={auth =>
                authSignIn(auth, 'google').then(onAuthSignIn)
              }
              onError={onAuthSignInError}
              label={
                <FormattedMessage
                  {...messages[`${scope}_with_provider`]}
                  values={{
                    provider: <span className="font-weight-bold">Google</span>,
                  }}
                />
              }
            />
            <h6 className="small text-muted text-uppercase my-4 text-center">
              Oppure
            </h6>
            <Form
              handleSubmit={this.handleSubmit}
              footerRenderer={({ canSubmit, loading }) => (
                <div className="d-flex align-items-center justify-content-between">
                  {exist && (
                    <Link
                      to={`${routes.passwords}?email=${currentUser.email}`}
                      className="btn btn-light"
                    >
                      Non ricordi la password
                    </Link>
                  )}
                  <FormSubmit
                    className={`btn-primary${exist ? ' px-5' : ' w-100'}`}
                    canSubmit={canSubmit}
                    loading={loading}
                    label="Avanti"
                  />
                </div>
              )}
            >
              <FieldText
                type="email"
                label="Inserisci la tua email"
                name="user[email]"
                autoComplete="email"
                autoCorrect="off"
                required
              />
              <AnimateHeight
                height={exist ? 'auto' : 0}
                // onAnimationStart={({ newHeight }) => console.log(newHeight)}
                onAnimationEnd={() => {
                  this.slider.current.mySlider.updateAutoHeight(300, false);
                  // this.slider.current.mySlider.updateAutoHeight(500);
                  console.log('TODO: focus password field');
                }}
              >
                {exist && (
                  <>
                    <FieldPassword
                      measurePasswordStrength={false}
                      autoComplete="current-password"
                      label="Inserisci la tua password"
                      name="user[password]"
                      type="password"
                      id="new-password"
                      validations="minLength:8"
                      required
                      autoFocus
                    />
                    <div className="form-group">
                      <Checkbox
                        layout="elementOnly"
                        name="user[remember_me]"
                        label={
                          <FormattedMessage
                            {...messages.simple_sessions_remember_me_label}
                          />
                        }
                      />
                    </div>
                  </>
                )}
              </AnimateHeight>
            </Form>
          </div>
          <div>
            <DeviseForm
              {...this.props}
              scope="registrations"
              currentUser={currentUser}
            />
          </div>
        </Slider>
      </div>
    );
  }
}
