import Slider from '@uidu/slider';
import React, { Fragment, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { messages } from './DeviseForm.messages';
import Email from './Steps/Email';
import Info from './Steps/Info';
import Password from './Steps/Password';

export default class DeviseForm extends PureComponent<any, any> {
  private slider: any = React.createRef();

  constructor(props) {
    super(props);
    const { currentUser } = props;
    this.state = {
      currentUser,
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { step },
      },
    } = this.props;
    if (step) {
      const slideIndex = this.slideNames().indexOf(step);
      this.slider.current.update();
      this.slider.current.to(slideIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: { step },
      },
    } = this.props;
    if (nextProps.match.params.step !== step) {
      const slideIndex = this.slideNames().indexOf(nextProps.match.params.step);
      this.slider.current.update();
      this.slider.current.to(slideIndex);
    }
  }

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

  handleSubmit = async ({ exists, ...model }) => {
    const {
      onSignUp,
      signUp,
      signIn,
      onSignIn,
      onSignInError,
      onSignUpError,
    } = this.props;
    if (exists) {
      return signIn({ user: model })
        .then(onSignIn)
        .catch(onSignInError);
    }
    return signUp({ user: model })
      .then(onSignUp)
      .catch(onSignUpError);
  };

  slideNames = () => this.slides().map(slide => slide.name);

  slides = () => {
    const { currentUser } = this.state;
    const slides = [
      {
        name: 'email',
        component: Email,
        onSave: this.update,
      },
    ];
    if (!currentUser || (currentUser && !currentUser.exists)) {
      slides.push({
        name: 'info',
        component: Info,
        onSave: this.update,
      });
    }
    slides.push({
      name: 'password',
      component: Password,
      onSave: model => this.update(model).then(this.handleSubmit),
    });
    return slides;
  };

  render() {
    const {
      match: {
        params: { step },
      },
      scope,
    } = this.props;
    const { currentUser } = this.state;

    return (
      <Fragment>
        <div className="text-center mb-4">
          <h3>
            <FormattedMessage
              {...messages[`email_${scope}_${step || 'email'}_title`]}
            />
          </h3>
          <p className="mb-0">
            <FormattedMessage
              {...messages[`email_${scope}_${step || 'email'}_description`]}
            />
          </p>
        </div>
        <div>
          <Slider
            options={{
              slidesPerView: 1,
              allowTouchMove: false,
              initialSlide: step ? this.slideNames().indexOf(step) : 0,
            }}
            onSlideChangeEnd={console.log}
            ref={this.slider}
          >
            {this.slides().map(({ component: SlideComponent, onSave }) => (
              <SlideComponent
                {...this.props}
                scope={scope}
                user={currentUser}
                onSave={onSave}
              />
            ))}
          </Slider>
        </div>
      </Fragment>
    );
  }
}
