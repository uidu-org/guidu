import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function Answer({
  question,
  answers,
  renderLabel,
  renderAnswer,
}) {
  const getAnswer = () => {
    console.log(answers);
    let value;
    if (
      answers &&
      answers.filter(a => a.formQuestionId === question.formQuestionId).length >
        0
    ) {
      value = answers.filter(
        a => a.formQuestionId === question.formQuestionId,
      )[0].value;
    }

    if (!value) {
      return (
        <span className="badge badge-pill badge-warning">
          {window.I18n.t('utils.forms.missing')}
        </span>
      );
    }

    switch (question.kind) {
      // case 'checkbox':
      case 'date':
        return value !== undefined && moment(value).format('LL');
      case 'multiple_choice':
        if (value !== undefined) {
          return (
            <span className="label label-warning">
              {window.I18n.t('utils.forms.missing')}
            </span>
          );
        }
        return value.map(elem => {
          const foo = question.options[elem];
          return <Tag key={elem} name={foo} />;
        });
      case 'single_choice':
        return (
          question.options[value] || (
            <span className="label label-warning">
              {window.I18n.t('utils.forms.missing')}
            </span>
          )
        );
      default:
        return value;
    }
  };

  return (
    <div>
      {renderLabel(question.label)}
      {renderAnswer(getAnswer())}
    </div>
  );
}

Answer.propTypes = {
  renderLabel: PropTypes.func,
  renderAnswer: PropTypes.func,
  question: PropTypes.shape(PropTypes.obj).isRequired,
  answers: PropTypes.shape(PropTypes.obj).isRequired,
};

Answer.defaultProps = {
  renderLabel: label => <p>{label}</p>,
  renderAnswer: answer => <p>{answer}</p>,
};
