import { PreviewsEmail } from 'components/Previews';

var EmailsEmail = React.createClass({
  renderStatus: function() {
    switch (this.props.email.status) {
      case 'draft':
        return I18n.t('activerecord.concerns.publishable.draft');
        break;
      case 'scheduled':
        return I18n.t(
          'apps.' +
            _.snakeCase(this.props.email.emailable.klass) +
            's.views.sections.reminders.email.scheduled',
          { date: moment(this.props.email.scheduled_at).calendar() },
        );
        break;
      case 'sent':
        break;
      case 'sending':
        return I18n.t(
          'apps.' +
            _.snakeCase(this.props.email.emailable.klass) +
            's.views.sections.reminders.email.sending',
          { date: moment(this.props.email.scheduled_at).calendar() },
        );
        break;
    }
  },

  update: function(email) {
    this.props.onUpdate && this.props.onUpdate(email);
  },

  destroy: function() {
    if (this.props.onDestroy) {
      this.props.onDestroy(this.props.email);
    } else {
      Turbolinks.visit('/');
    }
  },

  renderAction: function() {
    switch (this.props.email.status) {
      case 'draft':
      case 'scheduled':
        return (
          <EmailsEdit
            onDestroy={this.destroy}
            onSave={this.update}
            emailable={this.props.email.emailable}
            email={this.props.email}
          />
        );
        break;
      case 'sending':
        return (
          <PreviewsNew
            preview={
              <PreviewsEmail
                preview={{
                  subject: this.props.email.subject,
                  reply_to: this.props.email.reply_to,
                  bodyHTML: this.props.email.body,
                }}
              />
            }
          />
        );
        break;
      case 'sent':
        break;
    }
  },

  render: function() {
    return this.props.email.sent_at ? (
      <tr>
        <td>{this.props.email.subject}</td>
        {/*<td>{this.props.email.recipients_count}</td>*/}
        <td>{moment(this.props.email.sent_at).calendar()}</td>
      </tr>
    ) : (
      <tr>
        <td>{this.props.email.subject}</td>
        <td>{this.renderStatus()}</td>
        <td>{this.renderAction()}</td>
      </tr>
    );
  },
});
