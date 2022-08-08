export type Sort = {
  id: string;
  desc: boolean;
};

export type SorterProps = {
  sorters: Array<Sort>;
};

export type SorterFormProps = {
  closePopup: () => void;
};
