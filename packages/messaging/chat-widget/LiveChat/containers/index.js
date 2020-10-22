import { actions as currentMemberActions } from 'ducks/organization/currentMember';
import { connect } from 'react-redux';
import { actions as conversationActions } from '../ducks/conversations';
import App from '../index';

const mapStateToProps = (state) => ({
  conversation: state.conversation,
  messages: state.messages,
  currentMember: state.currentMember,
});

const mapDispatchToProps = {
  ...conversationActions,
  ...currentMemberActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
