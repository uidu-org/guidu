import Button from '@uidu/button';
import React, { Component, Fragment } from 'react';
import { ThumbsUp } from 'react-feather';
import UpVote from '../';

const vote: any = item =>
  new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      clearTimeout(wait);
      resolve({ data: { voted: true } });
    }, 3000);
  });

const onVote = () => console.log;
const onVoteFailed = () => vote({}); // window.alert('registrati per continuare');

export default class Basic extends Component<any, any> {
  state = {
    voted: false,
  };

  render() {
    const { voted } = this.state;
    const sharedProps = {
      vote: item =>
        vote(item).then(response => {
          this.setState({ voted: !voted });
          return response;
        }),
      onVote,
      onVoteFailed,
    };

    console.log(this.state);

    return (
      <Fragment>
        <UpVote votable={{ voted }} {...sharedProps}>
          {({ handleClick, active, loading }) => (
            <Button
              isLoading={loading}
              onClick={handleClick}
              iconBefore={<ThumbsUp size={14} />}
              appearance="subtle"
              className={active ? 'text-primary' : ''}
            >
              {active ? 'Voted!' : 'Vota'}
            </Button>
          )}
        </UpVote>

        <UpVote votable={{ voted }} {...sharedProps}>
          {({ handleClick, active, loading }) => (
            <Button
              isLoading={loading}
              onClick={handleClick}
              appearance={active ? 'primary' : 'default'}
              iconBefore={<ThumbsUp size={14} />}
            ></Button>
          )}
        </UpVote>
      </Fragment>
    );
  }
}
