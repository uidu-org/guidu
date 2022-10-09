import { faker } from '@faker-js/faker';
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
      type: 'mediaSingle',
      attrs: { layout: 'center' },
      content: [
        {
          type: 'media',
          attrs: {
            id: '3faa99da742d1e5cf85684770075568b.png',
            file: {
              id: '3faa99da742d1e5cf85684770075568b.png',
              url: 'https://me.uidu.local:8443/uploads/cache/3faa99da742d1e5cf85684770075568b.png',
              type: 'image',
              width: 1711,
              height: 1299,
              metadata: {
                size: 334036,
                width: 1711,
                height: 1299,
                filename: 'Screenshot 2022-09-16 alle 17.51.27.png',
              },
            },
            type: 'file',
          },
        },
      ],
    },
    { type: 'paragraph', content: [{ text: 'Holacracy', type: 'text' }] },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: '14b142104182a9961dcfbcb767f79d99.png',
            file: {
              id: '14b142104182a9961dcfbcb767f79d99.png',
              url: faker.image.imageUrl(),
              type: 'image',
              width: 2560,
              height: 1354,
              metadata: {
                size: 371929,
                width: 2560,
                height: 1354,
                filename: 'cover-default.png',
                mime_type: 'image/png',
              },
            },
            type: 'file',
          },
        },
      ],
    },
    {
      type: 'video',
      attrs: {
        url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
      },
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
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          text: 'Ciao come stai?',
          type: 'text',
        },
        {
          type: 'hardBreak',
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: '14b142104182a9961dcfbcb767f79d99.png',
            file: {
              id: '14b142104182a9961dcfbcb767f79d99.png',
              url: 'https://uidu.local:8443/uploads/cache/14b142104182a9961dcfbcb767f79d99.png',
              type: 'image',
              width: 2560,
              height: 1354,
              metadata: {
                size: 371929,
                width: 2560,
                height: 1354,
                filename: 'cover-default.png',
                mime_type: 'image/png',
              },
            },
            type: 'file',
          },
        },
      ],
    },
  ],
  version: 1,
};
