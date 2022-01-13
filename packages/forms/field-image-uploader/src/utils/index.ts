export enum ZoomDirectionType {
  IN = 'in',
  OUT = 'out',
}

export const zoom = ({
  direction,
  scale,
  min = 1,
  max = 2,
  step = 0.1,
  callbackFn,
}: {
  direction: ZoomDirectionType;
  scale: number;
  callbackFn: (scale: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) => {
  if (direction === ZoomDirectionType.IN) {
    if (scale + step > max) {
      callbackFn(max);
    } else {
      callbackFn(scale + step);
    }
  } else if (direction === ZoomDirectionType.OUT) {
    if (scale - step < min) {
      callbackFn(min);
    } else {
      callbackFn(scale - step);
    }
  }
};
