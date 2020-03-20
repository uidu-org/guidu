import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { fetchMessages } from '../example-utils';
import ChatWindow from '../src';

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

export default function Basic() {
  const chatWindow = useRef(null);
  const clipboard = useClipboard({
    copiedTimeout: 1500,
  });
  const [messages, setMessages] = useState(null);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchMessages(30, page, []).then(setMessages);
    return () => null;
  }, []);

  console.log(messages);

  return (
    <>
      {messages && (
        <ChatWindow
          onInfiniteLoad={async () => {
            setPage(page + 1);
            return fetchMessages(50, page + 1, messages).then(response =>
              setMessages([...messages, ...response]),
            );
          }}
          ref={chatWindow}
          createMessage={model => {
            const message = {
              kind: 'message.create',
              id: 144279,
              createdAt: moment().toISOString(),
              updatedAt: '2018-09-07T10:17:40.000Z',
              klass: 'Message',
              scope: 'messages',
              uid: 'message-144279',
              isLoading: false,
              attachments: [],
              mentions: [],
              body: model.message.body,
              unread: false,
              messager: {
                email: 'simobg@gmail.com',
                name: 'Andrea Vanini',
                firstName: 'Simone',
                lastName: "Dall'angelo",
                nickname: null,
                fiscalCode: null,
                summary: null,
                displayName: null,
                role: 'admin',
                birthdate: '1982-09-24',
                age: 36,
                phone: null,
                website: null,
                notes: null,
                gender: 'male',
                id: 1306,
                createdAt: moment().toISOString(),
                updatedAt: '2018-10-03T14:24:48.000Z',
                klass: 'Contact',
                scope: 'contacts',
                uid: 'contact-1625',
                isLoading: false,
                avatar: {
                  has_avatar: true,
                  default:
                    '/uploads/contact/avatar/1625/default_simobg_gmail.com.jpg',
                  thumb:
                    '/uploads/contact/avatar/1625/thumb_simobg_gmail.com.jpg',
                  big: '/uploads/contact/avatar/1625/big_simobg_gmail.com.jpg',
                },
                adminPath: '/dashboard/apps/contacts/1625',
              },
              itemable: null,
            };
            setMessages([message, ...messages]);
            setTimeout(() => {
              chatWindow.current.scrollTop =
                chatWindow.current.scrollHeight -
                chatWindow.current.clientHeight;
            }, 20);
          }}
          isSelf={messager => messager.id === '1306'}
          betweenMinutes={20}
          mentionables={[
            {
              trigger: '@',
              type: 'User',
              data: fetchUsers,
            },
          ]}
          actions={({ setEditing, message }) => [
            {
              name: 'Edit',
              onClick: setEditing,
            },
            // { name: 'Pin' },
            { name: 'Forward' },
            {
              name: clipboard.copied ? (
                <span className="text-success">Copied</span>
              ) : (
                'Copy'
              ),
              props: {
                href: '#',
              },
              onClick: e => {
                e.preventDefault();
                clipboard.copy(message.body);
              },
            },
            { name: 'Set reminder' },
          ]}
          messages={messages}
        />
      )}
    </>
  );
}
