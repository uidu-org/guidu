import Button from '@uidu/button';
import React, { Component } from 'react';
import UpVote from '../';

export default class Basic extends Component<any, any> {
  state = {
    voted: false,
  };

  render() {
    const { voted } = this.state;
    return (
      <UpVote
        votable={{ voted }}
        onVote={console.log}
        vote={item =>
          new Promise((resolve, reject) => {
            let wait = setTimeout(() => {
              clearTimeout(wait);
              console.log(item);
              this.setState({
                voted: true,
              });
              resolve(true);
            }, 3000);
          })
        }
      >
        {({ handleClick, active, loading }) => (
          <Button isLoading={loading} onClick={handleClick}>
            {active ? 'Voted!' : 'Vota'}
          </Button>
        )}
      </UpVote>
    );
  }
}
