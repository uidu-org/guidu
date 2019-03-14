import { BlockCardResolvedViewProps } from '@uidu/media-ui';
import { extractPropsFromObject } from './extractPropsFromObject';

export function extractBlockViewPropsFromProject(
  json: any,
): BlockCardResolvedViewProps {
  const props = extractPropsFromObject(json);
  props.byline = 'Project';

  if (
    json.member &&
    json.member['@type'] === 'Collection' &&
    json.member.totalItems > 0
  ) {
    props.details = props.details || [];
    props.details.push({
      title: 'Members',
      text: json.member.totalItems,
    });
  }

  return props;
}
