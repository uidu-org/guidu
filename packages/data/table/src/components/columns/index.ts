import addressColumn from './address';
import attachmentsColumn from './attachments';
import avatarColumn from './avatar';
import checkboxColumn from './checkbox';
import countryColumn from './country';
import coverColumn from './cover';
import currencyColumn from './currency';
import dateColumn from './date';
import defaultColumn from './default';
import emailColumn from './email';
import memberColumn from './member';
import multipleSelectColumn from './multipleSelect';
import numberColumn from './number';
import percentColumn from './percent';
import phoneColumn from './phone';
import primaryColumn from './primary';
import progressColumn from './progress';
import ratingColumn from './rating';
import singleSelectColumn from './singleSelect';
import stringColumn from './string';
import textColumn from './text';
import uidColumn from './uid';
import urlColumn from './url';
import voteColumn from './vote';

export { default as addressColumn } from './address';
export { default as attachmentsColumn } from './attachments';
export { default as avatarColumn } from './avatar';
export { default as checkboxColumn } from './checkbox';
export { default as countryColumn } from './country';
export { default as coverColumn } from './cover';
export { default as currencyColumn } from './currency';
export { default as dateColumn } from './date';
export { default as defaultColumn } from './default';
export { default as emailColumn } from './email';
export { default as memberColumn } from './member';
export { default as multipleSelectColumn } from './multipleSelect';
export { default as numberColumn } from './number';
export { default as percentColumn } from './percent';
export { default as phoneColumn } from './phone';
export { default as primaryColumn } from './primary';
export { default as progressColumn } from './progress';
export { default as ratingColumn } from './rating';
export { default as singleSelectColumn } from './singleSelect';
export { default as stringColumn } from './string';
export { default as textColumn } from './text';
export { default as uidColumn } from './uid';
export { default as urlColumn } from './url';
export { default as voteColumn } from './vote';

export default [
  addressColumn(),
  attachmentsColumn(),
  avatarColumn(),
  checkboxColumn(),
  countryColumn(),
  coverColumn(),
  currencyColumn(),
  dateColumn({}),
  defaultColumn(),
  emailColumn(),
  memberColumn({}),
  multipleSelectColumn({}),
  numberColumn(),
  percentColumn(),
  phoneColumn(),
  primaryColumn(),
  progressColumn(),
  ratingColumn(),
  singleSelectColumn({}),
  stringColumn(),
  textColumn(),
  uidColumn(),
  urlColumn(),
  voteColumn(),
];
