import { insertTypeAheadQuery } from '../../type-ahead/commands/insert-query';

export function insertMentionQuery() {
  insertTypeAheadQuery('@');
}
