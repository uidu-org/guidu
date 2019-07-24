export type Timeframes = '1W' | '2W' | '1M' | '3M' | '1Y' | '5Y' | any;

export type TimeFrameProps = {
  timeframes: Array<Timeframes>;
  handleDateChange: (any) => void;
  onChange: (timeframe: Timeframes) => void;
  activeTimeFrame?: Timeframes | string;
  from: any;
  to: any;
};
