export type AnimatedMenuProps = {
  animatingOutTimeout: () => void;
  navbarConfig: Array<any>;
  duration: number;
};

export type AnimatedMenuState = {
  activeIndices: Array<number>;
  animatingOut: boolean;
};
