export declare type AnimatedMenuProps = {
    animatingOutTimeout: () => void;
    navbarConfig: Array<any>;
    duration: number;
};
export declare type AnimatedMenuState = {
    activeIndices: Array<number>;
    animatingOut: boolean;
};
