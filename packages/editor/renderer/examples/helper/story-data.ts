import { emoji } from '@uidu/util-data-test';

const emojiTestData = emoji.testData;
const emojiStoryData = emoji.storyData;

type EmojiAttrs = {
  id: string;
  shortName: string;
  fallback?: string;
  text?: string;
};

const toEmojiAttrs = (emoji: EmojiAttrs): EmojiAttrs => {
  const { shortName, id, fallback } = emoji;
  return {
    shortName,
    id,
    text: fallback || shortName,
  };
};

const toEmojiId = (emoji: EmojiAttrs): EmojiAttrs => {
  const { shortName, id, fallback } = emoji;
  return { shortName, id, fallback };
};

export const grinEmojiAttrs = toEmojiAttrs(emojiTestData.grinEmoji);
export const evilburnsEmojiAttrs = toEmojiAttrs(emojiTestData.evilburnsEmoji);

export const grinEmojiId = toEmojiId(emojiTestData.grinEmoji);
export const evilburnsEmojiId = toEmojiId(emojiTestData.evilburnsEmoji);

export const lorem = emojiStoryData.lorem;
export const story = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [{ type: 'text', text: 'Il Progetto' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'ITA - ENG', marks: [{ type: 'strong' }] },
      ],
    },
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: { width: 50 },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Testo qui' }],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: { width: 50 },
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Testo li' }],
            },
          ],
        },
      ],
    },
    { type: 'paragraph', content: [] },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Il Coronavirus può contagiare chiunque',
          marks: [{ type: 'textColor', attrs: { color: '#ff991f' } }],
        },
        { type: 'text', text: ', limitare il contagio è fondamentale. ' },
        {
          type: 'text',
          text: 'C’è però chi può attrezzarsi meglio a resistere in questi tempi difficili e chi invece sta vivendo in questi giorni una situazione drammatica.',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Sono tantissimi infatti i lavoratori che sono stati licenziati in queste settimane, sono tantissime le altre fasce sociali che sono attualmente rimaste senza sostegno adeguato per la sopravvivenza quotidiana, come i migranti nei centri d’accoglienza e nei campi, i senzatetto, le famiglie disoccupate che si rivolgevano ai servizi di supporto alla spesa alimentare. Per questo abbiamo deciso, ancora una volta, di attivarci, insieme, dal basso.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Di fronte all’insufficienza delle misure istituzionali, abbiamo bisogno di sostegno e solidarietà popolare.',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    { type: 'paragraph', content: [] },
    {
      type: 'table',
      attrs: { isNumberColumnEnabled: false, layout: 'default' },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { type: 'text', text: 'Data', marks: [{ type: 'strong' }] },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Donatori',
                      marks: [{ type: 'strong' }],
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Donazioni',
                      marks: [{ type: 'strong' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Oggi' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: '32' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: '340' }] },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Domani' }],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: '25' }] },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                { type: 'paragraph', content: [{ type: 'text', text: '127' }] },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Attiviamo questa raccolta fondi ',
          marks: [{ type: 'strong' }],
        },
        {
          type: 'text',
          text: 'per permettere ai volontari di poter organizzare l’ ',
        },
        {
          type: 'text',
          text: 'acquisto dei pacchi spesa, l’acquisto e la distribuzione di dispositivi di protezione minima consigliati, il supporto alle fasce sociali più a rischio - come gli anziani - per limitare le uscite e i contatti.',
          marks: [{ type: 'strong' }],
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: 'Ogni contributo in questo momento è fondamentale, l’epidemia dovuta al virus si contrasta rispettando la quarantena e grazie al sacrificio incredibile del personale sanitario che va supportato in ogni modo, ma va scongiurata allo stesso modo l’epidemia sociale che si rafforza in questo stato d’emergenza: la miseria.',
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: 'Lavoreremo in tal senso nella massima sicurezza per i volontari e gli assistiti, rispettando la tutela sanitaria e le disposizioni sulle distanze e i contatti per evitare il contagio.',
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: 'Restiamo uniti anche nella distanza, durante l’emergenza attiviamo la solidarietà!',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 3 },
      content: [
        {
          type: 'text',
          text: '#resistiamoinsieme #diamociunamano',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    { type: 'paragraph', content: [] },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'ENGLISH VERSION', marks: [{ type: 'strong' }] },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Coronavirus is highly contagious, we have to stop its spreading. ',
        },
        {
          type: 'text',
          text: 'Some people, though, can resist better in these hard times while others are forced to face a dramatic situation.',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Many workers have been fired, many people have been left without any economic support, such as migrants in detention and reception centers, the homeless, families, the unemployed who were supported by social services for their basic needs. For this reason we decided to take action, all together.',
        },
      ],
    },
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        {
          type: 'text',
          text: 'Since institutions did not approve any effective law to help these social classes, we need support and solidarity from all of you.',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    { type: 'paragraph', content: [] },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We are starting this fundraiser to allow our volunteers to buy groceries, personal protective equipment, to help the weaker parts of the population- such as the elderly- to limit contacts.',
          marks: [{ type: 'strong' }],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Any contribution in this moment is fundamental, the epidemic can be contrasted only through quarantine and thanks to the incredible effort of hospitals and sanitary staff which must be supported by any means. At the same time we have to stop the “social” epidemic that can arise in this emergency: poverty.',
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: 'We will work complying with all the safety measures in order to protect both volunteers and who we will assist, avoiding contacts and keeping distance to stop the infection.',
        },
        { type: 'hardBreak' },
        {
          type: 'text',
          text: "Let's resist even if distanced, let's show our solidarity!",
        },
      ],
    },
  ],
};

export const document = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello, ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'World!',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: ' Look I can do ',
        },
        {
          type: 'text',
          text: 'italic ',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ', strong ',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: 'and underlined text!',
          marks: [
            {
              type: 'em',
            },
            {
              type: 'strong',
            },
            {
              type: 'underline',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'My favourite emoji are ',
        },
        {
          type: 'emoji',
          attrs: {
            fallback: '😀',
            shortName: ':grinning:',
            id: '1f600',
            text: '',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            fallback: ':evilburns:',
            shortName: ':evilburns:',
            id: 'atlassian-evilburns',
            text: '',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':not-an-emoji:',
            id: '',
            text: '',
          },
        },
        {
          type: 'text',
          text: '. What are yours?',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hi, my name is... My name is... My name is... My name is ',
        },
        {
          type: 'mention',
          attrs: {
            id: '1',
            text: '@Oscar Wallhult',
            accessLevel: '',
          },
        },
        {
          type: 'text',
          text: ' :D',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'italic',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: 'link',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://www.atlassian.com',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'strike-through',
          marks: [
            {
              type: 'strike',
            },
          ],
        },
        {
          type: 'text',
          text: 'strong',
          marks: [
            {
              type: 'strong',
            },
          ],
        },
        {
          type: 'text',
          text: 'sub',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sub',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'sup',
          marks: [
            {
              type: 'subsup',
              attrs: {
                type: 'sup',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'underline',
          marks: [
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'text',
          text: ' red text',
          marks: [
            {
              type: 'textColor',
              attrs: {
                color: '#ff0000',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'some inline code: ',
        },
        {
          type: 'text',
          text: 'const foo = bar();',
          marks: [
            {
              type: 'code',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a line with ',
        },
        {
          type: 'hardBreak',
        },
        {
          type: 'text',
          text: 'a hardbreak in it.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'date',
          attrs: {
            timestamp: '1540425600000',
          },
        },
        {
          type: 'text',
          text: ' ',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 1,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 1',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 2,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 2',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 3,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 3',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 4,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 4',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 5,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 5',
        },
      ],
    },
    {
      type: 'heading',
      attrs: {
        level: 6,
      },
      content: [
        {
          type: 'text',
          text: 'Heading 6',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'This is a paragraph with a text node',
        },
        {
          type: 'text',
          text: '\n',
        },
        {
          type: 'text',
          text: 'that contains a new line',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Click me! ',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'javascript:alert("hello world")',
              },
            },
          ],
        },
        {
          type: 'text',
          text: 'www.atlassian.com',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'www.atlassian.com',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {
        language: 'javascript',
      },
      content: [
        {
          type: 'text',
          text: '// Create a map.\nfinal IntIntOpenHashMap map = new IntIntOpenHashMap();\nmap.put(1, 2);\nmap.put(2, 5);\nmap.put(3, 10);',
        },
        {
          type: 'text',
          text: '\nint count = map.forEach(new IntIntProcedure()\n{\n   int count;\n   public void apply(int key, int value)\n   {\n       if (value >= 5) count++;\n   }\n}).count;\nSystem.out.println("There are " + count + " values >= 5");',
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 50,
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            type: 'file',
            file: {
              id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            },
            collection: 'MediaServicesSample',
            width: 300,
            height: 200,
          },
        },
      ],
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
      ],
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
        {
          type: 'media',
          attrs: {
            id: '2dfcc12d-04d7-46e7-9fdf-3715ff00ba40',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
      ],
    },
    {
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'orderedList',
      content: [
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'First list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Second list item',
                },
              ],
            },
          ],
        },
        {
          type: 'listItem',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: 'Third list item',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'blockquote',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'From the ashes a fire shall be woken, a light from the shadows shall spring; Renewed shall be blade that was broken, the crownless again shall be king.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'J.R.R. Tolkien, The Fellowship of the Ring.',
              marks: [
                {
                  type: 'em',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'info',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is an info panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'note',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a note panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'tip',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a tip panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'success',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a success panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'warning',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a warning panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'panel',
      attrs: {
        panelType: 'error',
      },
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a error panel with ',
            },
            {
              type: 'text',
              text: 'bold text',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'rule',
    },
    {
      type: 'decisionList',
      attrs: {
        localId: 'empty-list-should-not-render',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'DECIDED',
          },
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: 'empty-list-should-not-render',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'TODO',
          },
        },
      ],
    },
    {
      type: 'decisionList',
      attrs: {
        localId: 'e9e89e90-afdd-45dd-9736-18edee2874ed',
      },
      content: [
        {
          type: 'decisionItem',
          attrs: {
            localId: '3faca0e1-3a09-4c19-9f5e-c6ef940070da',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'Hello world',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'This is a decision ',
            },
            {
              type: 'emoji',
              attrs: {
                shortName: ':wink:',
                id: '1f609',
                text: '😉',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'mention',
              attrs: {
                id: '0',
                text: '@Carolyn',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'was',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'here',
              marks: [
                {
                  type: 'em',
                },
                {
                  type: 'underline',
                },
              ],
            },
            {
              type: 'text',
              text: '.',
            },
            {
              type: 'mention',
              attrs: {
                id: 'error:NotFound',
                text: '@NoLongerWorksHere',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'is not',
              marks: [
                {
                  type: 'strong',
                },
              ],
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'text',
              text: 'here.',
            },
          ],
        },
        {
          type: 'decisionItem',
          attrs: {
            localId: '526c544e-3cbd-4017-ad7e-a685206ce5b2',
            state: 'DECIDED',
          },
          content: [
            {
              type: 'text',
              text: 'decision 2',
            },
          ],
        },
        {
          type: 'decisionItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'DECIDED',
          },
        },
      ],
    },
    {
      type: 'taskList',
      attrs: {
        localId: '6e87fd8a-d8f9-421a-b94b-cd0206e82ae4',
      },
      content: [
        {
          type: 'taskItem',
          attrs: {
            localId: 'task-1',
            state: 'TODO',
          },
          content: [
            {
              type: 'text',
              text: 'Could you please',
            },
            {
              type: 'hardBreak',
            },
            {
              type: 'text',
              text: 'do this ',
            },
            {
              type: 'mention',
              attrs: {
                id: '0',
                text: '@Carolyn',
                accessLevel: 'CONTAINER',
              },
            },
            {
              type: 'text',
              text: ' ',
            },
            {
              type: 'emoji',
              attrs: {
                shortName: ':wink:',
                id: '1f609',
                text: '😉',
              },
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            localId: 'task-2',
            state: 'DONE',
          },
          content: [
            {
              type: 'text',
              text: 'This is completed',
            },
          ],
        },
        {
          type: 'taskItem',
          attrs: {
            localId: 'to-be-ignored-as-no-content',
            state: 'TODO',
          },
        },
      ],
    },
    // {
    //   type: 'table',
    //   attrs: {
    //     isNumberColumnEnabled: false,
    //     layout: 'default',
    //     localId: '3988ba2f-ca13-4d0a-ac6b-b5d259a5a110',
    //   },
    //   content: [
    //     {
    //       type: 'tableRow',
    //       content: [
    //         {
    //           type: 'tableHeader',
    //           attrs: {
    //             colspan: 2,
    //             colwidth: [233, 100],
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Heading 1',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: 'tableHeader',
    //           attrs: {
    //             background: '#DEEBFF',
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Heading 2',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'tableRow',
    //       content: [
    //         {
    //           type: 'tableCell',
    //           attrs: {
    //             colwidth: [233],
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: 'tableCell',
    //           attrs: {
    //             colwidth: [100],
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: 'tableCell',
    //           attrs: {},
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'tableRow',
    //       content: [
    //         {
    //           type: 'tableCell',
    //           attrs: {
    //             colwidth: [233],
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: 'tableCell',
    //           attrs: {
    //             colwidth: [100],
    //           },
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           type: 'tableCell',
    //           attrs: {},
    //           content: [
    //             {
    //               type: 'paragraph',
    //               content: [
    //                 {
    //                   type: 'text',
    //                   text: 'Some content',
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: 'heading',
    //   attrs: {
    //     level: 1,
    //   },
    //   content: [
    //     {
    //       type: 'text',
    //       text: 'Media single without width defined',
    //     },
    //   ],
    // },
    // {
    //   type: 'mediaSingle',
    //   attrs: {
    //     layout: 'full-width',
    //   },
    //   content: [
    //     {
    //       type: 'media',
    //       attrs: {
    //         id: '5556346b-b081-482b-bc4a-4faca8ecd2de',
    //         type: 'file',
    //         collection: 'MediaServicesSample',
    //       },
    //     },
    //   ],
    // },
    // {
    //   type: 'bodiedExtension',
    //   attrs: {
    //     extensionType: 'com.atlassian.fabric',
    //     extensionKey: 'clock',
    //     layout: 'default',
    //   },
    //   content: [
    //     {
    //       type: 'paragraph',
    //       content: [
    //         {
    //           type: 'text',
    //           text: 'This is the default content of the extension',
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: 'heading',
    //   attrs: {
    //     level: 1,
    //   },
    //   content: [
    //     {
    //       type: 'text',
    //       text: 'Sections',
    //     },
    //   ],
    // },
    // {
    //   type: 'layoutSection',
    //   content: [
    //     {
    //       type: 'layoutColumn',
    //       attrs: {
    //         width: 33.33,
    //       },
    //       content: [
    //         {
    //           type: 'paragraph',
    //           content: [
    //             {
    //               type: 'text',
    //               text: 'This column is a 1/3rd.',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //     {
    //       type: 'layoutColumn',
    //       attrs: {
    //         width: 66.66,
    //       },
    //       content: [
    //         {
    //           type: 'paragraph',
    //           content: [
    //             {
    //               type: 'text',
    //               text: 'This column is 2/3rds.',
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   type: 'blockCard',
    //   attrs: {
    //     url: 'https://docs.google.com/document/d/1fUgIrY5s_iJpmA25np2BjLvDK5QEXAjNvaaYAmMrJuc/edit',
    //   },
    // },
  ],
};
