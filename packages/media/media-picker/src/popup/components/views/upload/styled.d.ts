import { HTMLAttributes, ImgHTMLAttributes, ComponentClass } from 'react';
export interface IsEmptyProps {
    isEmpty?: boolean;
}
export declare const SpinnerWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const DefaultImage: ComponentClass<ImgHTMLAttributes<{}>>;
export declare const TextWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const DropzoneText: ComponentClass<HTMLAttributes<{}>>;
export declare const ButtonWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const DropzoneContentWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const DropzoneContainer: ComponentClass<HTMLAttributes<{}> & IsEmptyProps>;
export declare const RecentUploadsTitle: ComponentClass<HTMLAttributes<{}>>;
export declare const CardsWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const CardWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const Wrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const LoadingNextPageWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
