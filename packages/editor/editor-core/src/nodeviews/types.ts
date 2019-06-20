export interface ReactNodeProps {
  selected: boolean;
}
export type ReactComponentConstructor = new (props: any) => React.Component<
  any,
  any
>;
export type ProsemirrorGetPosHandler = () => number;
