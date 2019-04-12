/// <reference types="react" />
interface Props {
    icon: React.ReactChild;
    isLoading?: boolean;
    isOnlyChild: boolean;
    spacing: string;
}
declare const _default: ({ spacing, icon, isOnlyChild, isLoading, ...rest }: Props) => JSX.Element;
export default _default;
