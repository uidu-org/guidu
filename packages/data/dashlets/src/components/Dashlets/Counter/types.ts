export type CounterProps = {
  label: string | React.ReactNode;
  formatter?: () => void;
  itemBefore?: React.ReactNode;
  resultSet?: any;
};
