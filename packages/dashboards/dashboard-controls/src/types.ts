export type TimeFrameKeys = '1W' | '4W' | '1Y' | 'MTD' | 'QTD' | 'YTD' | '5Y';

export type TimeFrames = {
  key: TimeFrameKeys;
  name: string;
};

export type GroupersKeys = 'day' | 'week' | 'month' | 'year';

export type Groupers = {
  key: GroupersKeys;
  name: string;
};

export type TimeFrameGrouperProps = {
  groupers: Array<Groupers>;
  activeGrouper?: GroupersKeys | string;
  onChange: (grouper: GroupersKeys) => void;
};

export type TimeFrameProps = {
  timeframes: Array<TimeFrames>;
  handleDateChange: (any) => void;
  onChange: (timeframe: TimeFrameKeys) => void;
  activeTimeFrame?: TimeFrameKeys | string;
  from: any;
  to: any;
};
