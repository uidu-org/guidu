import { connect } from 'react-redux';
import { actions as conversationActions } from '../ducks/conversations';
import { actions as messageActions } from '../ducks/messages';
import { actions as currentMemberActions } from 'ducks/organization/currentMember';
import App from '../index';

const mapStateToProps = state => ({
  conversation: state.conversation,
  messages: state.messages,
  currentMember: state.currentMember,
});

const mapDispatchToProps = {
  ...conversationActions,
  ...currentMemberActions,
  ...messageActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
