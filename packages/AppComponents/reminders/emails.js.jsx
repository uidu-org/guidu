var EmailsEmails = React.createClass({
  add: function(email) {
    this.props.onAdd && this.props.onAdd(email);
  },

  render: function() {
    var _self = this;
    var emails = this.props.emails.map(function(email) {
      return <EmailsEmail {..._self.props} key={email.id} email={email} />;
    });

    return this.props.emails.length > 0 ? (
      <table className="table">
        <thead>
          {this.props.kind == 'scheduled' ? (
            <tr>
              <th>{I18n.t('activerecord.attributes.email.subject')}</th>
              <th>{I18n.t('activerecord.attributes.email.status')}</th>
              <th />
            </tr>
          ) : (
            <tr>
              <th>{I18n.t('activerecord.attributes.email.subject')}</th>
              {/*<th>{I18n.t('activerecord.attributes.email.recipients_count')}</th>*/}
              <th>{I18n.t('activerecord.attributes.email.sent_at')}</th>
            </tr>
          )}
        </thead>
        <tbody>
          {emails}
          <tr>
            <td colSpan="3">
              <EmailsNew {...this.props} onSave={this.add} />
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <EmptyState className="text-center">
        <EmptyState.Body>
          <EmptyState.Icon />
          <p className="lead text-muted">
            {I18n.t(
              'apps.' +
                _.snakeCase(this.props.emailable.klass) +
                's.views.sections.reminders.emails.empty',
            )}
          </p>
          <EmailsNew
            {...this.props}
            className="btn btn-primary"
            onSave={this.add}
          />
        </EmptyState.Body>
      </EmptyState>
    );
  },
});
