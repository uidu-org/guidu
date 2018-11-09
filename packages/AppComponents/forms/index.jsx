import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalTrigger, ModalBody, ModalHeader } from 'components/Modal';
import { Form, FormSubmit } from '@uidu/forms';
import { Input } from '@uidu/inputs';
import { Edit, Eye } from 'react-feather';
import { apiCall } from 'utils';
import { Question } from 'components/FormQuestion';
import Slider from '@uidu/slider';

import SelectFormTemplate from './steps/template';
import FormPreview from './steps/preview';

export default class AppForms extends PureComponent {
  constructor(props) {
    super(props);
    const { form } = props;
    this.state = {
      isFetching: null,
      existingForm: !!form,
      form,
      questions: form ? form.questions : [],
      activeSlide: form ? 1 : 0,
    };
  }

  onFormSelect = form => {
    this.setState({ isFetching: true, form, questions: [] });
    if (form.length === 0) {
      this.slider.next();
      return this.setState({
        isFetching: false,
        form: { name: 'Nuovo form' },
        questions: [],
      });
    }
    this.slider.next();
    return apiCall('get', form.adminPath).then(response =>
      this.setState(
        {
          isFetching: false,
          form: response.data,
          questions: response.data.questions,
        },
        () => {
          this.slider.update();
        },
      ),
    );
  };

  handleSubmit = model => {
    const { createForm, updateForm, form } = this.props;
    console.log(this.props);
    if (!form) {
      return createForm(model);
    }
    return updateForm(form, model);
  };

  render() {
    const { scope, formable } = this.props;
    const { form, existingForm, activeSlide, questions } = this.state;

    const slides = [
      {
        key: 'select-form-template',
        navbar: null,
        component: (
          <SelectFormTemplate
            key="select-form-template-component"
            {...this.props}
            slider={this.slider}
            form={form}
            onFormSelect={this.onFormSelect}
          />
        ),
      },
      {
        key: 'form-preview',
        navbar: [
          <div
            style={{ minWidth: 0 }}
            className="mr-5"
            key="form-preview-navbar-header"
          >
            <small>Using template</small>
            <p className="mb-0 text-truncate">{form ? form.name : 'Nuovo'}</p>
          </div>,
          <div className="d-flex" key="form-preview-navbar-actions">
            <button
              className="btn btn-sm mr-3"
              type="button"
              onClick={e => {
                e.preventDefault();
                this.slider.prev();
              }}
            >
              <span className="d-none d-md-block">Modifica template</span>
              <span className="d-flex d-md-none">
                <Edit size={16} />
              </span>
            </button>
            <ModalTrigger
              modalContent={
                <Modal>
                  <ModalHeader>Anteprima</ModalHeader>
                  <ModalBody>
                    <Form footerRenderer={() => {}} handleSubmit={() => {}}>
                      {questions.map((question, index) => (
                        <Question
                          key={question.formQuestionId || index}
                          question={question}
                        />
                      ))}
                    </Form>
                  </ModalBody>
                </Modal>
              }
            >
              <button className="btn btn-sm btn-block" type="button">
                <span className="d-none d-md-block">Anteprima</span>
                <span className="d-flex d-md-none">
                  <Eye size={16} />
                </span>
              </button>
            </ModalTrigger>
          </div>,
        ],
        component: (
          <div
            className="w-100 d-flex flex-column"
            key="form-preview-component"
          >
            <FormPreview
              {...this.props}
              {...this.state}
              addQuestion={question =>
                this.setState(
                  {
                    questions: [...questions, question],
                  },
                  () => {
                    this.slider.update();
                  },
                )
              }
            />
          </div>
        ),
      },
    ];

    return (
      <div>
        <p className="px-3">
          Puoi personalizzare le informazioni richieste al donatore utilizzando
          uno dei tuoi template oppure creando un nuovo form.
        </p>
        <div>
          {activeSlide === 1 && (
            <nav
              className="pt-0 navbar navbar-expand-md navbar-light flex-nowrap justify-content-between border-bottom fixed-top"
              key="main-navbar"
            >
              {slides[activeSlide].navbar}
            </nav>
          )}
          <Slider
            className="h-100 w-100"
            slideClassName="d-flex"
            ref={c => {
              this.slider = c;
            }}
            options={{
              // height: 320,
              slidesPerView: 1,
              initialSlide: activeSlide,
              // noSwiping: true,
              // allowTouchMove: false,
              autoHeight: true,
              on: {
                slideChange: () => {
                  if (!this.slider) return;
                  this.setState({
                    activeSlide: this.slider.mySlider.activeIndex,
                  });
                },
              },
            }}
          >
            {slides.map(slide => slide.component)}
          </Slider>
        </div>
        <Form
          footerRenderer={({ canSubmit, loading }) =>
            activeSlide === 1 && (
              <div className="px-3">
                <div className="row">
                  <div className="col-sm-6 col-lg-4">
                    <FormSubmit
                      label="Salva"
                      className={`btn btn-${scope} btn-block`}
                      canSubmit={canSubmit}
                      loading={loading}
                    />
                  </div>
                </div>
              </div>
            )
          }
          handleSubmit={this.handleSubmit}
        >
          <Input type="hidden" name="form[name]" value={formable.name} />
          <Input type="hidden" name="form[formable_id]" value={formable.id} />
          <Input
            type="hidden"
            name="form[formable_type]"
            value={formable.klass}
          />
          {questions.map((question, index) => (
            <div key={`form-question-attributes-for-question-${question.id}`}>
              <Input
                type="hidden"
                name={`form[form_questions_attributes][${index}][id]`}
                value={existingForm && question.formQuestionId}
              />
              <Input
                type="hidden"
                name={`form[form_questions_attributes][${index}][question_id]`}
                value={question.id}
              />
              <Input
                type="hidden"
                name={`form[form_questions_attributes][${index}][position]`}
                value={index + 1}
              />
            </div>
          ))}
        </Form>
      </div>
    );
  }
}

AppForms.propTypes = {
  formable: PropTypes.shape(PropTypes.obj).isRequired,
  scope: PropTypes.string.isRequired,
  form: PropTypes.shape(PropTypes.obj),
};

AppForms.defaultProps = {
  form: null,
  onSave: () => {},
};
