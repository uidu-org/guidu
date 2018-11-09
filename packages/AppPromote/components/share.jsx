import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import SharerButton from 'components/Sharer/button';
import { Form } from '@uidu/forms';
import { Textarea } from '@uidu/inputs';

export default class SharerSocial extends Component {
  constructor(props) {
    super(props);
    this.handleStrategy = this.handleStrategy.bind(this);
    this.getMessage = this.getMessage.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.state = {
      strategy: props.strategy,
      message: this.getMessage(),
    };
  }

  getMessage() {
    const { object, description, path } = this.props;
    return `${object.name} / ${description(object)} ${path(object)}`;
  }

  handleStrategy(name, value) {
    this.setState({
      strategy: value,
    });
  }

  handleMessage(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      object,
      description,
      path,
      handleMessage,
      facebook,
      message,
    } = this.props;

    return (
      <div className="container-fluid">
        <br />
        <Form
          footerRenderer={() => (
            <div className="row stretched text-center">
              <div className="col-sm-3 col-xs-6">
                <SharerButton
                  provider="facebook"
                  className="btn btn-fill btn-sm btn-facebook btn-block"
                  message={message}
                  appId={facebook.appId}
                  url={path(object)}
                >
                  <i className="icon-social-facebook" /> Facebook
                </SharerButton>
              </div>
              <div className="col-sm-3 col-xs-6">
                <SharerButton
                  provider="twitter"
                  className="btn btn-fill btn-sm btn-twitter btn-block"
                  message={message}
                  url={path(object)}
                >
                  <i className="icon-social-twitter" /> Twitter
                </SharerButton>
              </div>
              <div className="col-sm-3 col-xs-6">
                <SharerButton
                  provider="linkedin"
                  className="btn btn-fill btn-sm btn-linkedin btn-block"
                  message={message}
                  url={path(object)}
                >
                  <i className="icon-social-linkedin" /> Linkedin
                </SharerButton>
              </div>
              <div className="col-sm-3 col-xs-6">
                <SharerButton
                  provider="google"
                  className="btn btn-fill btn-sm btn-google btn-block"
                  tag="div"
                  message={message}
                  url={path(object)}
                >
                  <i className="icon-social-google" /> Google
                </SharerButton>
              </div>
            </div>
          )}
        >
          <Textarea
            layout="elementOnly"
            className="form-control form-control-autosize"
            name="message"
            value={message}
            onChange={handleMessage}
          />
        </Form>
      </div>
    );
  }
}

const SharerSocialBySocial = createReactClass({
  render() {
    const {
      object,
      description,
      path,
      handleMessage,
      facebook,
      message,
    } = this.props;

    return (
      <div>
        <br />
        <Formsy.Form>
          <Textarea
            layout="elementOnly"
            className="form-control form-control-autosize"
            name="message"
            value={message}
            onChange={handleMessage}
          />
        </Formsy.Form>
        <br />
        <div className="row stretched text-center">
          <div className="col-sm-3 col-xs-6">
            <SharerButtonFacebook
              className="btn btn-fill btn-sm btn-facebook btn-block"
              message={message}
              appId={facebook.appId}
              url={path(object)}
            >
              <i className="icon-social-facebook" /> Facebook
            </SharerButtonFacebook>
          </div>
          <div className="col-sm-3 col-xs-6">
            <SharerButtonTwitter
              className="btn btn-fill btn-sm btn-twitter btn-block"
              message={message}
              url={path(object)}
            >
              <i className="icon-social-twitter" /> Twitter
            </SharerButtonTwitter>
          </div>
          <div className="col-sm-3 col-xs-6">
            <SharerButtonLinkedin
              className="btn btn-fill btn-sm btn-linkedin btn-block"
              message={message}
              url={path(object)}
            >
              <i className="icon-social-linkedin" /> Linkedin
            </SharerButtonLinkedin>
          </div>
          <div className="col-sm-3 col-xs-6">
            <SharerButtonGoogle
              className="btn btn-fill btn-sm btn-google btn-block"
              tag="div"
              message={message}
              url={path(object)}
            >
              <i className="icon-social-google" /> Google
            </SharerButtonGoogle>
          </div>
        </div>
      </div>
    );
  },
});

SharerSocial.defaultProps = {
  className: 'modal-body',
  strategy: 'social',
  description: object => object.bio,
  path: object => object.path,
  facebook: {
    appId: 341013092580493,
  },
};

SharerSocial.propTypes = {
  strategy: PropTypes.string,
  object: PropTypes.shape(PropTypes.obj).isRequired,
  description: PropTypes.func.isRequired,
  path: PropTypes.func.isRequired,
};
