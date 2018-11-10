import { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

export default class ModalTrigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  onSave = (object, ...otherProps) => {
    const { onSave } = this.props;
    this.modal.hide();
    this.setState(
      {
        isModalVisible: false,
      },
      () => {
        onSave(object, ...otherProps);
      },
    );
  };

  new = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState(
      {
        isModalVisible: true,
      },
      () => {
        this.modal.show();
      },
    );
  };

  renderChildren = () => {
    const { children } = this.props;

    return Children.map(children, child =>
      cloneElement(child, {
        ref: c => {
          this.trigger = c;
        },
        onClick: this.new,
      }),
    );
  };

  renderModal = () => {
    const { modalContent } = this.props;

    return Children.map(modalContent, child =>
      cloneElement(child, {
        ref: c => {
          this.modal = c;
        },
        onSave: this.onSave,
      }),
    );
  };

  render() {
    const { isModalVisible } = this.state;
    return [this.renderChildren(), isModalVisible && this.renderModal()];
  }
}

ModalTrigger.propTypes = {
  children: PropTypes.node.isRequired,
  modalContent: PropTypes.element,
  onSave: PropTypes.func,
};

ModalTrigger.defaultProps = {
  modalContent: null,
  onSave: () => {},
};
