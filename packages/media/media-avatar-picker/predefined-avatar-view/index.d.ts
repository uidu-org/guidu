import { PureComponent } from 'react';
import { Avatar } from '../avatar-list';
export interface BackBtnProps {
    onClick?: () => void;
}
export interface PredefinedAvatarViewProps {
    avatars: Array<Avatar>;
    onGoBack?: () => void;
    onAvatarSelected: (avatar: Avatar) => void;
    selectedAvatar?: Avatar;
    predefinedAvatarsText?: string;
}
export declare class PredefinedAvatarView extends PureComponent<PredefinedAvatarViewProps, {}> {
    static defaultProps: PredefinedAvatarViewProps;
    render(): JSX.Element;
    createOnItemClickHandler(avatar: Avatar): () => void;
}
