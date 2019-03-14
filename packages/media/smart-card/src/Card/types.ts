import { Client } from '../Client';

export type CardAppearance = 'inline' | 'block';

type BaseCardProps = {
  appearance: CardAppearance;
  isSelected?: boolean;
  onClick?: () => void;
  importer?: (target: any) => void;
};

export type CardWithData = BaseCardProps & {
  data: any;
};

export type CardWithUrl = BaseCardProps & {
  url: string;
  client?: Client;
};

export type CardProps = CardWithUrl | CardWithData;
