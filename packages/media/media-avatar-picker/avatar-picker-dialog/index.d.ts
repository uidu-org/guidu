import { PureComponent } from 'react';
import { Avatar } from '../avatar-list';
import { CropProperties } from '../image-navigator';
import { LoadParameters } from '../image-cropper';
import { AvatarPickerDialogProps, AvatarPickerDialogState } from './types';
export declare const MAX_SIZE_MB = 10;
export declare const ERROR: {
    URL: any;
    FORMAT: any;
    SIZE: any;
};
export declare const ACCEPT: string[];
export declare class AvatarPickerDialog extends PureComponent<AvatarPickerDialogProps, AvatarPickerDialogState> {
    static defaultProps: {
        avatars: any[];
    };
    state: AvatarPickerDialogState;
    setSelectedImageState: (selectedImage: File, crop: CropProperties) => Promise<void>;
    setSelectedAvatarState: (avatar: Avatar) => void;
    /**
     * Updates the image position state. These numbers are always positive.
     *
     * @param x the number of pixels from the left edge of the image
     * @param y the number of pixels from the top edge of the image
     */
    setPositionState: (x: number, y: number) => void;
    setSizeState: (size: number) => void;
    onImageNavigatorLoad: (loadParams: LoadParameters) => void;
    /**
     * Initialised with no-op function.  Is assigned cropped image exporting
     * function when internal ImageCropper mounts via this.onImageNavigatorLoad
     */
    exportCroppedImage: () => string;
    onSaveClick: () => void;
    onShowMore: () => void;
    onGoBack: () => void;
    onRemoveImage: () => void;
    clearErrorState: () => void;
    setErrorState: (errorMessage: string) => void;
    onImageUploaded: () => void;
    onImageError: (errorMessage: string) => void;
    static contextTypes: {
        intl: ReactIntl.IntlShape;
    };
    render(): JSX.Element;
    headerContent: () => JSX.Element;
    footerContent: () => JSX.Element;
    readonly isDisabled: boolean;
    getPredefinedAvatars(): Avatar[];
    renderPredefinedAvatarList(): JSX.Element;
    renderBody(): JSX.Element;
}
