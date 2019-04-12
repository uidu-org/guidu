import { HTMLAttributes, ComponentClass } from 'react';
export declare const maxAvatarCount = 6;
export declare const ContentWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const LeftWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const RightWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const FooterWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const Title: ComponentClass<HTMLAttributes<{}>>;
export declare const Byline: ComponentClass<HTMLAttributes<{}>>;
export declare const Description: ComponentClass<HTMLAttributes<{}>>;
export declare const IconWrapper: ComponentClass<HTMLAttributes<{}>>;
export interface ThumbnailProps {
    src: string;
}
export declare const Thumbnail: ComponentClass<HTMLAttributes<{}> & ThumbnailProps>;
export declare const UsersWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const ActionsWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const AlertWrapper: ComponentClass<HTMLAttributes<{}>>;
