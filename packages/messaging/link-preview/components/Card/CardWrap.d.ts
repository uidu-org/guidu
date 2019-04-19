/// <reference types="react" />
declare const CardWrap: {
    ({ rel, href, target, ...props }: {
        [x: string]: any;
        rel: any;
        href: any;
        target: any;
    }): import("react").DetailedReactHTMLElement<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    defaultProps: {
        as: string;
        rel: string;
        target: string;
    };
};
export default CardWrap;
