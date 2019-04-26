import { HTMLAttributes, ComponentClass, ImgHTMLAttributes } from 'react';
export declare const Container: ComponentClass<HTMLAttributes<{}>>;
export interface GridCellProps {
    width: number;
}
export declare const GridCell: ComponentClass<HTMLAttributes<{}> & GridCellProps>;
export declare const Title: ComponentClass<HTMLAttributes<{}>>;
export declare const ButtonContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const WarningContainer: ComponentClass<HTMLAttributes<{}>>;
export declare const WarningIconWrapper: ComponentClass<HTMLAttributes<{}>>;
export declare const WarningImage: ComponentClass<ImgHTMLAttributes<{}>>;
export declare const WarningHeading: ComponentClass<HTMLAttributes<{}>>;
export declare const WarningSuggestion: ComponentClass<HTMLAttributes<{}>>;
