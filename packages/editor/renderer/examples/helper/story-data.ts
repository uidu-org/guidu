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
export const story2 = {
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
export const story = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'a' },
        {
          type: 'token',
          attrs: {
            id: '7c129f60-ffb8-48fb-bb08-67484c883162',
            name: 'Ronald Von',
          },
        },
        {
          type: 'emoji',
          attrs: {
            shortName: ':smile:',
            id: '1f604',
            text: ':smile:',
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: { layout: 'center' },
      content: [
        {
          type: 'media',
          attrs: {
            id: '184ef6b8417d85b75752cac44e3c7f15.jpg',
            type: 'file',
            foo: 'bar',
            file: {
              id: '184ef6b8417d85b75752cac44e3c7f15.jpg',
              type: 'image',
              metadata: {
                filename: '232736274_226533902772534_6120448366188471115_n.jpg',
                size: 68382,
                mime_type: 'image/jpeg',
                width: 640,
                height: 640,
              },
              width: 640,
              height: 640,
              url: 'https://me.uidu.local:8443/uploads/cache/184ef6b8417d85b75752cac44e3c7f15.jpg',
            },
          },
        },
      ],
    },
    { type: 'paragraph', content: [] },
  ],
};

export const document2 = {
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

export const document3 = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you ',
        },
        {
          type: 'text',
          text: 'really are',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We get lots of complaints about it actually, with people regularly asking us things like:',
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
              text: 'Why is Tailwind removing the default styles on my ',
              marks: [
                {
                  type: 'em',
                },
              ],
            },
            {
              type: 'text',
              text: 'h1',
              marks: [
                {
                  type: 'code',
                },
              ],
            },
            {
              type: 'text',
              text: ' elements? How do I disable this? What do you mean I lose all the other base styles too?',
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
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a ",
        },
        {
          type: 'text',
          text: 'p',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look ',
        },
        {
          type: 'text',
          text: 'awesome',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ', not awful.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'The ',
        },
        {
          type: 'text',
          text: '@tailwindcss/typography',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' plugin is our attempt to give you what you ',
        },
        {
          type: 'text',
          text: 'actually',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' want, without any of the downsides of doing something stupid like disabling our base styles.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'It adds a new ',
        },
        {
          type: 'text',
          text: 'prose',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {},
      content: [
        {
          type: 'text',
          text: '<article class="prose">\n  <h1>Garlic bread with cheese: What the science tells us</h1>\n  <p>\n    For years parents have espoused the health benefits of eating garlic bread with cheese to their\n    children, with the food earning such an iconic status in our culture that kids will often dress\n    up as warm, cheesy loaf for Halloween.\n  </p>\n  <p>\n    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases\n    springing up around the country.\n  </p>\n  <!-- ... -->\n</article>\n',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'For more information about how to use the plugin and the features it includes, ',
        },
        {
          type: 'text',
          text: 'read the documentation',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://github.com/tailwindcss/typography/blob/master/README.md',
              },
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
          text: 'What to expect from here on out',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like ",
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
        {
          type: 'text',
          text: ', unordered lists, ordered lists, code blocks, block quotes, ',
        },
        {
          type: 'text',
          text: 'and even italics',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: '.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "It's important to cover all of these use cases for a few reasons:",
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
                  text: 'We want everything to look good out of the box.',
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
                  text: "Really just the first reason, that's the whole point of the plugin.",
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
                  text: "Here's a third pretend reason though a list with three items looks more realistic than a list with two items.",
                },
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
          text: "Now we're going to try out another header style.",
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
          text: 'Typography should be easy',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Something a wise person once told me about typography is:',
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
              text: "Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.",
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
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "It's probably important that images look okay here by default as well:",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
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
            type: 'external',
            file: {
              id: '',
              type: 'file',
              metadata: {},
            },
            url: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Now I'm going to show you an example of an unordered list to make sure that looks good, too:",
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
                  text: 'So here is the first item in this list.',
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
                  text: "In this example we're keeping the items short.",
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
                  text: "Later, we'll use longer, more complex list items.",
                },
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
          text: "And that's the end of this section.",
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
          text: 'What if we stack headings?',
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
          text: 'We should make sure that looks good, too.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.',
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
          text: 'When a heading comes after a paragraph …',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.",
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
                  text: 'I often do this thing where list items have headings.',
                  marks: [
                    {
                      type: 'strong',
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
                  text: "For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.",
                },
              ],
            },
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: "I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.",
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
                  text: 'Since this is a list, I need at least two items.',
                  marks: [
                    {
                      type: 'strong',
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
                  text: "I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.",
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
                  text: "It's not a bad idea to add a third item either.",
                  marks: [
                    {
                      type: 'strong',
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
                  text: "I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it. I'm going to press Enter now.",
                },
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
          text: 'After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.',
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
          text: 'Code should look okay by default.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'I think most people are going to use ',
        },
        {
          type: 'text',
          text: 'highlight.js',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://highlightjs.org/',
              },
            },
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'text',
          text: ' or ',
        },
        {
          type: 'text',
          text: 'Prism',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://prismjs.com/',
              },
            },
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'text',
          text: " or something if they want to style their code blocks but it wouldn't hurt to make them look ",
        },
        {
          type: 'text',
          text: 'okay',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' out of the box, even with no syntax highlighting.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Here's what a default ",
        },
        {
          type: 'text',
          text: 'tailwind.config.js',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' file looks like at the time of writing:',
        },
      ],
    },
    {
      type: 'codeBlock',
      attrs: {},
      content: [
        {
          type: 'text',
          text: 'module.exports = {\n  purge: [],\n  theme: {\n    extend: {},\n  },\n  variants: {},\n  plugins: [],\n}\n',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hopefully that looks good enough to you.',
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
          text: 'What about nested lists?',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.",
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
                  text: 'Nested lists are rarely a good idea.',
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
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
                          text: 'You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.',
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
                          text: 'Nested navigation in UIs is a bad idea too, keep things as flat as possible.',
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
                          text: 'Nesting tons of folders in your source code is also not helpful.',
                        },
                      ],
                    },
                  ],
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
                  text: "Since we need to have more items, here's another one.",
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
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
                          text: "I'm not sure if we'll bother styling more than two levels deep.",
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
                          text: 'Two is already too much, three is guaranteed to be a bad idea.',
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
                          text: 'If you nest four levels deep you belong in prison.',
                        },
                      ],
                    },
                  ],
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
                  text: "Two items isn't really a list, three is good though.",
                  marks: [
                    {
                      type: 'strong',
                    },
                  ],
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
                          text: "Again please don't nest lists if you want people to actually read your content.",
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
                          text: 'Nobody wants to look at this.',
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
                          text: "I'm upset that we even have to bother styling this.",
                        },
                      ],
                    },
                  ],
                },
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
          text: 'The most annoying thing about lists in Markdown is that ',
        },
        {
          type: 'text',
          text: '<li>',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: " elements aren't given a child ",
        },
        {
          type: 'text',
          text: '<p>',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.',
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
                  text: "For example, here's another nested list.",
                  marks: [
                    {
                      type: 'strong',
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
                  text: 'But this time with a second paragraph.',
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
                          text: "These list items won't have ",
                        },
                        {
                          type: 'text',
                          text: '<p>',
                          marks: [
                            {
                              type: 'code',
                            },
                          ],
                        },
                        {
                          type: 'text',
                          text: ' tags',
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
                          text: 'Because they are only one line each',
                        },
                      ],
                    },
                  ],
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
                  text: 'But in this second top-level list item, they will.',
                  marks: [
                    {
                      type: 'strong',
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
                  text: 'This is especially annoying because of the spacing on this paragraph.',
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
                          text: "As you can see here, because I've added a second line, this list item now has a ",
                        },
                        {
                          type: 'text',
                          text: '<p>',
                          marks: [
                            {
                              type: 'code',
                            },
                          ],
                        },
                        {
                          type: 'text',
                          text: ' tag.',
                        },
                      ],
                    },
                    {
                      type: 'paragraph',
                      content: [
                        {
                          type: 'text',
                          text: "This is the second line I'm talking about by the way.",
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
                          text: "Finally here's another list item so it's more like a list.",
                        },
                      ],
                    },
                  ],
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
                  text: 'A closing list item, but with no nested list, because why not?',
                },
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
          text: 'And finally a sentence to close off this section.',
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
          text: "We didn't forget about description lists",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Well, that's not exactly true, we first released this plugin back in 2020 and it took three years before we added description lists. But they're here now, so let's just be happy about that…okay? They can be great for things like FAQs.",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Why do you never see elephants hiding in trees?',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Because they're so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'What do you call someone with no body and no nose?',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Why can't you hear a pterodactyl go to the bathroom?",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.',
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
          text: 'There are other elements we need to style',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'I almost forgot to mention links, like ',
        },
        {
          type: 'text',
          text: 'this link to the Tailwind CSS website',
          marks: [
            {
              type: 'link',
              attrs: {
                href: 'https://tailwindcss.com/',
              },
            },
            {
              type: 'underline',
            },
          ],
        },
        {
          type: 'text',
          text: ". We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'We even included table styles, check it out:',
        },
      ],
    },
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
      },
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
                    {
                      type: 'text',
                      text: 'Wrestler',
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
                      text: 'Origin',
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
                      text: 'Finisher',
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
                  content: [
                    {
                      type: 'text',
                      text: 'Bret "The Hitman" Hart',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Calgary, AB',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Sharpshooter',
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
                  content: [
                    {
                      type: 'text',
                      text: 'Stone Cold Steve Austin',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Austin, TX',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Stone Cold Stunner',
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
                  content: [
                    {
                      type: 'text',
                      text: 'Randy Savage',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Sarasota, FL',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Elbow Drop',
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
                  content: [
                    {
                      type: 'text',
                      text: 'Vader',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Boulder, CO',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Vader Bomb',
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
                  content: [
                    {
                      type: 'text',
                      text: 'Razor Ramon',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: 'Chuluota, FL',
                    },
                  ],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'paragraph',
                  content: [
                    {
                      type: 'text',
                      text: "Razor's Edge",
                    },
                  ],
                },
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
          text: 'We also need to make sure inline code looks good, like if I wanted to talk about ',
        },
        {
          type: 'text',
          text: '<span>',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' elements or tell you the good news about ',
        },
        {
          type: 'text',
          text: '@tailwindcss/typography',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: '.',
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
          text: 'Sometimes I even use ',
        },
        {
          type: 'text',
          text: 'code',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' in headings',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Even though it's probably a bad idea, and historically I've had a hard time making it look good. This ",
        },
        {
          type: 'text',
          text: '"wrap the code blocks in backticks"',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' trick works pretty well though really.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Another thing I've done in the past is put a ",
        },
        {
          type: 'text',
          text: 'code',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' tag inside of a link, like if I wanted to tell you about the ',
        },
        {
          type: 'text',
          text: 'tailwindcss/docs',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: " repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.",
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
          text: "We haven't used an ",
        },
        {
          type: 'text',
          text: 'h4',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' yet',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "But now we have. Please don't use ",
        },
        {
          type: 'text',
          text: 'h5',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' or ',
        },
        {
          type: 'text',
          text: 'h6',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a ',
        },
        {
          type: 'text',
          text: 'before',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' pseudo-element to scream at you if you use an ',
        },
        {
          type: 'text',
          text: 'h5',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' or ',
        },
        {
          type: 'text',
          text: 'h6',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: '.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "We don't style them at all out of the box because ",
        },
        {
          type: 'text',
          text: 'h4',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' elements are already so small that they are the same size as the body copy. What are we supposed to do with an ',
        },
        {
          type: 'text',
          text: 'h5',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ', make it ',
        },
        {
          type: 'text',
          text: 'smaller',
          marks: [
            {
              type: 'em',
            },
          ],
        },
        {
          type: 'text',
          text: ' than the body copy? No thanks.',
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
          text: 'We still need to think about stacked headings though.',
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
          text: "Let's make sure we don't screw that up with ",
        },
        {
          type: 'text',
          text: 'h4',
          marks: [
            {
              type: 'code',
            },
          ],
        },
        {
          type: 'text',
          text: ' elements, either.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Phew, with any luck we have styled the headings above this text and they look pretty good.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.",
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: "What I've written here is probably long enough, but adding this final sentence can't hurt.",
        },
      ],
    },
  ],
};
