import Checkbox from '@uidu/checkbox';
import FieldPassword from '@uidu/field-password';
import FieldPhone from '@uidu/field-phone';
import Form, { FormSubmit, useForm } from '@uidu/form';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { Smartphone } from 'react-feather';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { DeviseProps } from '../../types';
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
    id: 'uidu.devise.phone_sessions_remember_me_label',
    defaultMessage: 'Remember me for next sessions',
    description: 'simple_sessions_email_label',
  },
  sessions_forgot_password: {
    id: 'uidu.devise.sessions_forgot_password',
    defaultMessage: 'Forgot password?',
    description: 'sessions_forgot_password',
  },
});

export default function Providers(props: DeviseProps) {
  const { routes } = props;
  const [swiper, setSwiper] = useState<SwiperRef['swiper']>(null);
  const passwordField = useRef();

  const location = useLocation();
  const history = useHistory();

  const form = useForm({});

  const [currentUser, setCurrentUser] = useState(props.currentUser);
  const [exist, setExist] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
  }, [swiper, location, activeSlideByRoute]);

  const handleSubmit = (model) => {
    const { checkExistence, signIn } = props;
    if (exist) {
      return signIn(model);
    }
    setHasSubmitted(true);
    return checkExistence(model.user.phone).then((response) => {
      if (response.data.exists) {
        setExist(true);
        setCurrentUser(model.user);
        swiper.update();
        swiper.updateAutoHeight(500);
      }
      return update(model.user).then(() =>
        history.push(
          `${routes.registrations}?phone=${encodeURIComponent(
            model.user.phone,
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

  const { scope, additionalSignInInfo: AdditionalSignInInfo } = props;

  return (
    <div>
      <Swiper
        autoHeight
        slidesPerView={1}
        allowTouchMove={false}
        simulateTouch={false}
        initialSlide={activeSlideByRoute(location)}
        onInit={setSwiper}
      >
        <SwiperSlide>
          <div className="p-3">
            <div className="text-center">
              <h3>
                <FormattedMessage {...messages[`${scope}_title`]} />
              </h3>
              <p>
                <FormattedMessage {...messages[`${scope}_description`]} />
              </p>
            </div>
            <Form
              form={form}
              handleSubmit={handleSubmit}
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
                  <span>Inserisci il tuo numero di cellulare</span>
                  {exist && <span onClick={() => setExist(false)}>Edit</span>}
                </label>
                <FieldPhone
                  addonsBefore={[
                    <span className="bg-white input-group-text">
                      <Smartphone size={16} />
                    </span>,
                  ]}
                  layout="elementOnly"
                  name="user[phone]"
                  autoComplete="phone"
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
                    <div className="form-group">
                      <label
                        htmlFor="new-password"
                        className="d-flex align-items-center justify-content-between"
                      >
                        Inserisci la tua password
                        <Link
                          to={`${routes.passwords}?phone=${encodeURIComponent(
                            currentUser.phone,
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
        </SwiperSlide>
        <SwiperSlide>
          <div className="p-3">
            {hasSubmitted && !exist && (
              <DeviseForm {...props} scope="registrations" />
            )}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
