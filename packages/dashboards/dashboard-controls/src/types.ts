export type MembersProps = {
  members: Array<any>;
  label: string | React.ReactNode;
};

export type NavigatorProps = {
  onNext: () => void;
  onPrev: () => void;
  label: string | React.ReactNode;
};
