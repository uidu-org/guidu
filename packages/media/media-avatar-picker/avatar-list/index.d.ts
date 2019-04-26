import { PureComponent } from 'react';
export interface Avatar {
    dataURI: string;
}
export interface AvatarListProps {
    avatars: Array<Avatar>;
    onItemClick?: (avatar: Avatar) => void;
    selectedAvatar?: Avatar;
}
export declare class AvatarList extends PureComponent<AvatarListProps, {}> {
    static defaultProps: {
        avatars: any[];
    };
    render(): JSX.Element;
    onItemClick: (avatar: Avatar) => () => void;
}
