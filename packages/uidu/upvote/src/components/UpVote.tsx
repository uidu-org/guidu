import { PureComponent } from 'react';

export default class UpVote extends PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  handleClick = e => {
    const { currentUser, history, votable, vote, onVote } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.setState({ loading: true });
    if (currentUser) {
      // vote
      vote(votable).then(response => {
        console.log(response);
        this.setState({ loading: false });
        return onVote(response.data);
      });
    } else {
      // history.push({
      //   pathname: '/accounts/sign_in',
      //   state: { modal: true },
      // });
      setTimeout(
        () =>
          this.setState({ loading: false }, () =>
            window.alert('iscriviti per votare'),
          ),
        3000,
      );
    }
  };

  isActive = () => {
    const { currentUser, votable } = this.props;
    if (!currentUser) return false;
    if (!votable) return false;
    return votable.voted;
  };

  render() {
    const { children } = this.props;
    const { loading } = this.state;
    return (children as any)({
      handleClick: this.handleClick,
      active: this.isActive(),
      loading,
    });
  }
}
