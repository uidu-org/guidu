export interface LozengeViewModel {
  text: string;
  appearance?:
    | 'default'
    | 'success'
    | 'removed'
    | 'inprogress'
    | 'new'
    | 'moved'; // defaults to 'default'
  isBold?: boolean; // defaults to false
}
