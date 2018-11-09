import React, { PureComponent } from 'react';
import { Modal, ModalTrigger, ModalHeader } from 'components/Modal';
import Loader from 'components/Loader';
import { QUESTION_KINDS } from 'ducks/apps/questions';
import QuestionsForm from 'apps/forms/components/questions/form';

export default class FormPreview extends PureComponent {
  render() {
    const { form, isFetching, questions, addQuestion } = this.props;

    if (isFetching) {
      return (
        <div style={{ height: 250 }}>
          <Loader color="#fe7044" />
        </div>
      );
    }

    if (form) {
      return (
        <div className="card-body p-0 list-group list-group-flush mb-4">
          {questions.map(question => (
            <div
              className="media list-group-item d-flex flex-row"
              key={`preview-question-${question.formQuestionId}`}
            >
              <div
                className="d-flex align-self-center p-2 text-white rounded small mr-3 align-items-center"
                style={{
                  backgroundColor: QUESTION_KINDS.filter(
                    q => q.id === question.kind,
                  )[0].color,
                }}
              >
                <i className={question.icon} />
              </div>
              <div className="media-body align-self-center">
                <span style={{ fontWeight: 500 }}>{question.label}</span>
                {question.organizationAttribute ? (
                  <p className="small mb-0">
                    <code>{question.organizationAttribute.name}</code>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}
          <ModalTrigger
            onSave={addQuestion}
            ref={c => {
              this.modal = c;
            }}
            modalContent={
              <Modal>
                <ModalHeader>Nuova domanda</ModalHeader>
                <QuestionsForm
                  {...this.props}
                  question={{}}
                  onQuestionSelect={question => {
                    addQuestion(question);
                    this.modal.modal.hide();
                  }}
                />
              </Modal>
            }
          >
            <a href="#" className="media list-group-item d-flex flex-row">
              <div className="d-flex align-self-center p-2 text-dark rounded small mr-3 align-items-center bg-light">
                <i className="icon-plus" />
              </div>
              <div className="media-body align-self-center">
                Aggiungi domanda
              </div>
            </a>
          </ModalTrigger>
        </div>
      );
    }

    return null;
  }
}
