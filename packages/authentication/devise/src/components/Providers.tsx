import { Checkbox } from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import Slider, { Slide } from '@uidu/slider';
import React, { PureComponent } from 'react';
import AnimateHeight from 'react-animate-height';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import DeviseForm from './DeviseForm';

export const messages = defineMessages({
  privacy_intro: {
    defaultMessage:
      "Per far funzionare uidu, registriamo i dati degli utenti e li condividiamo con alcuni provider. Registrandoti, accetti le Condizioni d'uso e confermi di aver letto e compreso la Privacy Policy.",
    description: '',
  },
  sessions_title: {
    defaultMessage: 'Sign in',
    description: 'Allows user to perform an action again',
  },
  sessions_description: {
    defaultMessage:
      "Accedi per visualizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te.",
    description: '',
  },

  sessions_with_provider: {
    defaultMessage: 'Sign in with {provider}',
    description: '',
  },
  registrations_title: {
    defaultMessage: 'Sign up with your email',
    description: '',
  },
  registrations_description: {
    defaultMessage:
      "Crea un account per personalizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te, e molto altro.",
    description: '',
  },
  registrations_with_provider: {
    defaultMessage: 'Sign up with {provider}',
    description: '',
  },
  simple_sessions_remember_me_label: {
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
  sessions_forgot_password: {
    defaultMessage: 'Forgot password?',
    description: 'sessions_forgot_password',
  },
});

export default class Providers extends PureComponent<any, any> {
  private slider: React.RefObject<Swiper> = React.createRef();
  private passwordField = React.createRef();

  static defaultProps = {
    providers: [],
  };

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
    this.slider.current.slideTo(this.activeSlideByRoute(location));
  }

  UNSAFE_componentWillReceiveProps({ location }) {
    this.slider.current.slideTo(this.activeSlideByRoute(location));
  }

  handleSubmit = (model) => {
    const { routes, checkExistence, history, signIn } = this.props;
    const { exist } = this.state;
    if (exist) {
      return signIn(model);
    }
    return checkExistence(model.user.email).then((response) => {
      if (response.data.exists) {
        return this.setState(
          {
            exist: true,
            currentUser: model.user,
          },
          () => {
            this.slider.current.update();
            this.slider.current.updateAutoHeight(500);
          },
        );
      }
      return this.update(model.user).then(() =>
        history.push(
          `${routes.registrations}?email=${encodeURIComponent(
            model.user.email,
          )}`,
        ),
      );
    });
  };

  update = async (model) => {
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
      providers,
      additionalSignInInfo: AdditionalSignInInfo,
    } = this.props;

    const { currentUser, exist } = this.state;

    return (
      <div>
        <Slider
          options={{
            autoHeight: true,
            slidesPerView: 1,
            allowTouchMove: false,
            simulateTouch: false,
            initialSlide: this.activeSlideByRoute(location), // step ? this.slideNames().indexOf(step) : 0,
          }}
          ref={this.slider}
        >
          <Slide>
            <div className="p-3">
              <div className="text-center">
                <h3>
                  <FormattedMessage {...messages[`${scope}_title`]} />
                </h3>
                <p>
                  <FormattedMessage {...messages[`${scope}_description`]} />
                </p>
              </div>
              {providers.map(
                ({ name, label, component: Component, ...rest }) => (
                  <Component
                    onCompleted={(auth) =>
                      authSignIn(auth, name).then((response) => {
                        if (response.currentUser) {
                          return null;
                        }
                        return history.push(`${routes.registrations}/email`);
                      })
                    }
                    onError={onAuthSignInError}
                    label={label}
                    {...rest}
                  />
                ),
              )}
              {providers.length > 0 && (
                <h6 className="small text-muted text-uppercase my-4 text-center">
                  Oppure
                </h6>
              )}
              <Form
                handleSubmit={this.handleSubmit}
                footerRenderer={({ canSubmit, loading }) => (
                  <div className="d-flex align-items-center justify-content-between">
                    <FormSubmit
                      className="btn-primary w-100"
                      canSubmit={canSubmit}
                      loading={loading}
                      label="Avanti"
                    />
                  </div>
                )}
              >
                <div className="form-group">
                  <label
                    htmlFor="user_email"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <span>Inserisci la tua email</span>
                    {exist && (
                      <span onClick={() => this.setState({ exist: false })}>
                        Edit
                      </span>
                    )}
                  </label>
                  <FieldText
                    type="email"
                    layout="elementOnly"
                    name="user[email]"
                    autoComplete="email"
                    autoCorrect="off"
                    required
                    disabled={exist}
                  />
                </div>
                <AnimateHeight
                  height={exist ? 'auto' : 0}
                  onAnimationEnd={() => {
                    this.slider.current.updateAutoHeight(300);
                  }}
                >
                  {exist && (
                    <>
                      <div className="form-group">
                        <label
                          htmlFor="new-password"
                          className="d-flex align-items-center justify-content-between"
                        >
                          Inserisci la tua password
                          <Link
                            to={`${routes.passwords}?email=${encodeURIComponent(
                              currentUser.email,
                            )}`}
                          >
                            <FormattedMessage
                              {...messages.sessions_forgot_password}
                            />
                          </Link>
                        </label>
                        <FieldPassword
                          layout="elementOnly"
                          measurePasswordStrength={false}
                          autoComplete="current-password"
                          name="user[password]"
                          type="password"
                          id="new-password"
                          validations="minLength:8"
                          required
                        />
                      </div>
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
                      {AdditionalSignInInfo && (
                        <AdditionalSignInInfo currentUser={currentUser} />
                      )}
                    </>
                  )}
                </AnimateHeight>
              </Form>
            </div>
          </Slide>
          <Slide>
            <div className="p-3">
              <DeviseForm {...(this.props as any)} scope="registrations" />
            </div>
          </Slide>
        </Slider>
      </div>
    );
  }
}
