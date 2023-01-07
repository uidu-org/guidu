import { defaultSchema } from '@uidu/adf-schema';
import {
  ADNode,
  CardEventClickHandler,
  EventHandlers,
  LinkEventClickHandler,
  MentionEventHandler,
  SmartCardEventClickHandler,
  Transformer,
} from '@uidu/editor-common';
import { JSONTransformer } from '@uidu/editor-json-transformer';
import { Node as PMNode, Schema } from 'prosemirror-model';

function createEncoder<T>(parser: Transformer<T>, encoder: Transformer<any>) {
  return (value: T) => encoder.encode(parser.parse(value));
}
export type TransformerProvider<T> = (schema: Schema) => Transformer<T>;
export class ADFEncoder<T> {
  encode: (value: T) => any;

  constructor(createTransformerWithSchema: TransformerProvider<T>) {
    const transformer = createTransformerWithSchema(defaultSchema);
    this.encode = createEncoder(transformer, new JSONTransformer());
  }
}

export const getText = (node: PMNode | ADNode): string =>
  node.text ||
  (node.attrs && (node.attrs.text || node.attrs.shortName)) ||
  `[${typeof node.type === 'string' ? node.type : node.type.name}]`;

type GetEventHandlerResponse =
  | MentionEventHandler
  | CardEventClickHandler
  | LinkEventClickHandler
  | SmartCardEventClickHandler;

export const getEventHandler = (
  eventHandlers?: EventHandlers,
  type?: keyof EventHandlers,
  eventName: string = 'onClick',
): GetEventHandlerResponse =>
  eventHandlers &&
  type &&
  eventHandlers[type] &&
  eventHandlers[type][eventName];

// The IDs for html must start with a letter (a-z or A-Z),
// and all subsequent characters can be:
// letters, numbers (0-9), hyphens (-), underscores (_), colons (:), and periods (.).
export const generateIdFromString = (str: string) =>
  str
    .trim()
    // ^[^a-z]+ asserts position at start of the string, Match a single character not present in [^a-z]+
    // [^\w-:\.]+ Match a single character not present in the list below
    //   \w matches any word character (equal to [a-zA-Z0-9_])
    //   -: matches a single character in the list -: (case insensitive)
    //   \. matches the character . literally (case insensitive)
    // g modifier: global
    // i modifier: insensitive
    .replace(/^[^a-z]+|[^\w-:\.]+/gi, ' ')
    .trim()
    .replace(/ /g, '-');
