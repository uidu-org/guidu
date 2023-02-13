import Checkbox from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import DeviseForm from './DeviseForm';

export const messages = defineMessages({
  privacy_intro: {
    id: 'uidu.devise.privacy_intro',
    defaultMessage:
      "Per far funzionare uidu, registriamo i dati degli utenti e li condividiamo con alcuni provider. Registrandoti, accetti le Condizioni d'uso e confermi di aver letto e compreso la Privacy Policy.",
    description: '',
  },
  sessions_title: {
    id: 'uidu.devise.sessions_title',
    defaultMessage: 'Sign in',
    description: 'Allows user to perform an action again',
  },
  sessions_description: {
    id: 'uidu.devise.sessions_description',
    defaultMessage:
      "Accedi per visualizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te.",
    description: '',
  },

  sessions_with_provider: {
    id: 'uidu.devise.sessions_with_provider',
    defaultMessage: 'Sign in with {provider}',
    description: '',
  },
  registrations_title: {
    id: 'uidu.devise.registrations_title',
    defaultMessage: 'Sign up with your email',
    description: '',
  },
  registrations_description: {
    id: 'uidu.devise.registrations_description',
    defaultMessage:
      "Crea un account per personalizzare la tua homepage, seguire le tue organizzazioni preferite, scoprire quello che di buono c'è vicino a te, e molto altro.",
    description: '',
  },
  registrations_with_provider: {
    id: 'uidu.devise.registrations_with_provider',
    defaultMessage: 'Sign up with {provider}',
    description: '',
  },
  simple_sessions_remember_me_label: {
    id: 'uidu.devise.sessions_remember_me_label',
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
  sessions_forgot_password: {
    id: 'uidu.devise.sessions_forgot_password',
    defaultMessage: 'Forgot password?',
    description: 'sessions_forgot_password',
  },
});

export default function Providers(props) {
  const {
    providers = [],
    currentUser: propCurrentUser,
    routes,
    checkExistence,
    signIn,
    scope,
    authSignIn,
    onAuthSignIn,
    onAuthSignInError,
    additionalSignInInfo: AdditionalSignInInfo,
  } = props;
  const [swiper, setSwiper] = useState<SwiperRef['swiper'] | null>(null);
  const passwordField = useRef();
  const location = useLocation();
  const history = useHistory();

  const form = useForm({});

  const [currentUser, setCurrentUser] = useState(propCurrentUser);
  const [exist, setExist] = useState(false);

  const activeSlideByRoute = useCallback(
    ({ pathname }) => {
      if (pathname === routes.registrations) {
        return 1;
      }
      return 0;
    },
    [routes],
  );

  useEffect(() => {
    swiper?.slideTo(activeSlideByRoute(location), 300);
  }, [location, swiper, activeSlideByRoute]);

  const handleSubmit = (model) => {
    if (exist) {
      return signIn(model);
    }
    return checkExistence(model.user.email).then((response) => {
      if (response.data.exists) {
        setExist(true);
        setCurrentUser(model.user);
        swiper.update();
        swiper.updateAutoHeight(500);
      }
      return update(model.user).then(() =>
        history.push(
          `${routes.registrations}?email=${encodeURIComponent(
            model.user.email,
          )}`,
        ),
      );
    });
  };

  const update = async (model) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...model,
    }));
  };

  return (
    <div tw="">
      <Swiper
        autoHeight
        slidesPerView={1}
        allowTouchMove={false}
        simulateTouch={false}
        initialSlide={activeSlideByRoute(location)}
        onInit={setSwiper}
      >
        <SwiperSlide>
          <div tw="p-3">
            <div tw="text-center">
              <h3>
                <FormattedMessage {...messages[`${scope}_title`]} />
              </h3>
              <p>
                <FormattedMessage {...messages[`${scope}_description`]} />
              </p>
            </div>
            {providers.map(({ name, label, component: Component, ...rest }) => (
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
            ))}
            {providers.length > 0 && (
              <h6 tw="my-4 text-center text-sm text-gray-500 uppercase">
                Oppure
              </h6>
            )}
            <Form
              form={form}
              handleSubmit={handleSubmit}
              footerRenderer={({ canSubmit, loading }) => (
                <div tw="flex items-center justify-between">
                  <FormSubmit
                    shouldFitContainer
                    appearance="primary"
                    canSubmit={canSubmit}
                    loading={loading}
                  >
                    Avanti
                  </FormSubmit>
                </div>
              )}
            >
              <div tw="mb-4">
                <label
                  htmlFor="user_email"
                  tw="flex items-center justify-between"
                >
                  <span>Inserisci la tua email</span>
                  {exist && (
                    <span onClick={() => setState({ exist: false })}>Edit</span>
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
                onHeightAnimationEnd={() => {
                  swiper.updateAutoHeight(300);
                }}
              >
                {exist && (
                  <>
                    <div tw="mb-4">
                      <label
                        htmlFor="new-password"
                        tw="flex items-center justify-between"
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
                    <div tw="mb-4">
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
        </SwiperSlide>
        <SwiperSlide>
          <div tw="p-3">
            <DeviseForm {...(props as any)} scope="registrations" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
