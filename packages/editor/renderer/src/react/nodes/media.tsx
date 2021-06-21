import * as React from 'react';
import { MediaCard } from '../../ui/MediaCard';

export interface MediaProps {
  file: any;
}

export default function Media(props: MediaProps) {
  return <MediaCard {...props} />;
}
