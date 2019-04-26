import { HTMLAttributes, ComponentClass, LiHTMLAttributes } from 'react';
export declare const FolderViewerWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const SpinnerWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const FolderViewerContent: ComponentClass<HTMLAttributes<{}>>;
export interface SelectableProps {
    isSelected?: boolean;
}
export declare const FolderViewerRow: ComponentClass<LiHTMLAttributes<{}> & SelectableProps>;
export declare const FileMetadataGroup: ComponentClass<HTMLAttributes<{}>>;
export declare const FileIcon: ComponentClass<HTMLAttributes<{}>>;
export declare const FileName: ComponentClass<HTMLAttributes<{}> & SelectableProps>;
export declare const FileCreateDate: ComponentClass<HTMLAttributes<{}>>;
export declare const FileSize: ComponentClass<HTMLAttributes<{}>>;
export declare const SelectedFileIconWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const MoreBtnWrapper: ComponentClass<HTMLAttributes<{}>>;
