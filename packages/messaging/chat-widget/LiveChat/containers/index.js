import { actions as currentContactActions } from 'ducks/organization/currentContact';
import { connect } from 'react-redux';
import { actions as conversationActions } from '../ducks/conversations';
import App from '../index';

const mapStateToProps = (state) => ({
  conversation: state.conversation,
  messages: state.messages,
  currentContact: state.currentContact,
});

const mapDispatchToProps = {
  ...conversationActions,
  ...currentContactActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
