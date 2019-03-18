export declare type IsLoadingProps = {
    isLoading?: boolean;
};
declare const isLoadingStyle: import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<IsLoadingProps, any>>;
declare const getLoadingStyle: ({ isLoading }: IsLoadingProps) => {
    transition: string;
    opacity: number;
};
export { isLoadingStyle, getLoadingStyle };
