type CounterBaseProps = {
  label: string | React.ReactNode;
  formatter?: () => void;
  itemBefore?: React.ReactNode;
};

export type CounterStatelessProps = CounterBaseProps & {
  value: number;
};

export type CounterProps = CounterBaseProps & {
  resultSet?: any;
};
