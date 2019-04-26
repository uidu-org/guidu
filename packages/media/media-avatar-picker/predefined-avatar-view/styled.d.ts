import { HTMLAttributes, ComponentClass, ImgHTMLAttributes } from 'react';
export interface AvatarImageProps {
    isSelected: boolean;
}
export declare const LargeAvatarImage: ComponentClass<ImgHTMLAttributes<{}> & AvatarImageProps>;
export declare const SmallAvatarImage: ComponentClass<ImgHTMLAttributes<{}> & AvatarImageProps>;
export declare const PredefinedAvatarViewWrapper: ComponentClass<HTMLAttributes<{}>>;
