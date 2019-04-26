import { PureComponent } from 'react';
import { Avatar } from '../avatar-list';
export interface PredefinedAvatarListProps {
    avatars: Array<Avatar>;
    selectedAvatar?: Avatar;
    onShowMore?: () => void;
    onAvatarSelected: (avatar: Avatar) => void;
}
export declare class PredefinedAvatarList extends PureComponent<PredefinedAvatarListProps, {}> {
    static defaultProps: {
        avatars: any[];
    };
    componentWillMount(): void;
    render(): JSX.Element;
}
