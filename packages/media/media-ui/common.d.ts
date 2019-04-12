export interface LozengeViewModel {
    text: string;
    appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
    isBold?: boolean;
}
