export type TimeFrames = {
  name: string;
  title: string | React.ReactNode;
};

export type Groupers = {
  title: string | React.ReactNode;
  name: string;
};

export type TimeFrameGrouperProps = {
  groupers: Array<Groupers>;
  activeGrouper?: string;
  onChange: (grouper: string) => void;
};

export type TimeFrameProps = {
  timeframes: Array<TimeFrames>;
  onChange: (timeframe: string) => void;
  activeTimeFrame?: string;
};

export type MembersProps = {
  members: Array<any>;
  label: string | React.ReactNode;
};
