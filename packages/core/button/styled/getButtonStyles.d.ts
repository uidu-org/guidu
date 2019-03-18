import getButtonProps from '../components/getButtonProps';
declare type StyleProps = Partial<ReturnType<typeof getButtonProps>> & {
    theme?: any;
};
export declare const getPropertyAppearance: (property: string, props?: StyleProps, definitions?: any) => any;
export default function getButtonStyles(props: StyleProps): import("styled-components").FlattenInterpolation<import("styled-components").ThemedStyledProps<StyleProps, any>>;
export {};
