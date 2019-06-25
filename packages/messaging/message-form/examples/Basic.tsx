import MediaPicker from '@uidu/media-picker';
import React, { Component, Fragment } from 'react';
import { BarChart2, Clock, Mic, Paperclip } from 'react-feather';
import MessageForm from '../src';

interface GitHubJSONResponse {
  items: Array<any>;
}

function fetchUsers(query: string, callback: () => void): any {
  if (!query) {
    return Promise.resolve([]);
  }

  return (
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then((response: Response) => response.json())
      // Transform the users to what react-mentions expects
      .then((json: GitHubJSONResponse) =>
        json.items.map(user => ({ display: user.login, id: user.login })),
      )
      .then(callback)
      .catch(() => [])
  );
}

export default class Basic extends Component<any> {
  state = {
    pickerOpen: false,
    attachments: [],
  };

  render() {
    return (
      <Fragment>
        <MessageForm
          attachments={this.state.attachments}
          actions={[
            {
              name: 'New...',
              children: [
                {
                  children: (
                    <React.Fragment>
                      <Mic size="1rem" className="mr-2" />
                      Audio message
                    </React.Fragment>
                  ),
                },
                {
                  children: (
                    <React.Fragment>
                      <BarChart2 size="1rem" className="mr-2" />
                      Poll
                    </React.Fragment>
                  ),
                },
                {
                  children: (
                    <React.Fragment>
                      <Clock size="1rem" className="mr-2" />
                      Reminder
                    </React.Fragment>
                  ),
                },
              ],
            },
            {
              name: 'Add a file from...',
              children: [
                {
                  onClick: e => {
                    this.setState({ pickerOpen: true });
                  },
                  children: (
                    <React.Fragment>
                      <Paperclip size="1rem" className="mr-2" />
                      Your computer
                    </React.Fragment>
                  ),
                },
                {
                  children: (
                    <React.Fragment>
                      <BarChart2 size="1rem" className="mr-2" />
                      Google Drive
                    </React.Fragment>
                  ),
                },
              ],
            },
          ]}
          message={{}}
          mentionables={[
            {
              trigger: '@',
              markup: '@[__display__](__id__)',
              type: 'User',
              data: fetchUsers,
            },
          ]}
        />
        {this.state.pickerOpen && (
          <MediaPicker
            open={this.state.pickerOpen}
            onRequestClose={() => this.setState({ pickerOpen: false })}
            onComplete={result => {
              this.setState({
                attachments: [
                  ...this.state.attachments,
                  ...result.successful.map(r => ({
                    ...r.response.body[0],
                    preview: r.preview,
                  })),
                ],
              });
            }}
          />
        )}
      </Fragment>
    );
  }
}
