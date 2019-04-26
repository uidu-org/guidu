import * as React from 'react';
import {
  Plus,
  Smile,
  BarChart2,
  Paperclip,
  ThumbsUp,
  Send,
  Clock,
  Mic,
} from 'react-feather';

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

export default class Basic extends React.Component<{}> {
  render() {
    return (
      <MessageForm
        actions={[
          {
            name: 'New...',
            children: [
              {
                name: (
                  <React.Fragment>
                    <Mic size="1rem" className="mr-2" />
                    Audio message
                  </React.Fragment>
                ),
              },
              {
                name: (
                  <React.Fragment>
                    <BarChart2 size="1rem" className="mr-2" />
                    Poll
                  </React.Fragment>
                ),
              },
              {
                name: (
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
                name: (
                  <React.Fragment>
                    <Paperclip size="1rem" className="mr-2" />
                    Your computer
                  </React.Fragment>
                ),
              },
              {
                name: (
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
    );
  }
}
