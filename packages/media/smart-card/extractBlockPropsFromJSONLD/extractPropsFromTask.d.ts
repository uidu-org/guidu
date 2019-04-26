/// <reference types="react" />
import { BlockCardResolvedViewProps, LozengeViewModel } from '@uidu/media-ui';
export declare const buildTaskTitle: (json: any) => {
    title: {
        text: any;
    };
} | {
    title?: undefined;
};
export declare const buildTaskDescription: (json: any) => {
    description: {
        text: any;
    };
} | {
    description?: undefined;
};
export declare const buildTaskLink: (json: any) => {
    link: any;
} | {
    link?: undefined;
};
export declare const buildTaskByline: (json: any) => {
    byline: JSX.Element;
} | {
    byline?: undefined;
};
export declare const buildTaskUser: (json: any) => {
    user: {};
} | {
    user?: undefined;
};
export declare const buildTaskUsers: (json: any) => {
    users: any;
} | {
    users?: undefined;
};
export declare const buildTaskCommentCount: (json: any) => {
    icon: JSX.Element;
    text: string;
} | {
    icon?: undefined;
    text?: undefined;
};
export declare const buildTaskDetailsLozenge: (json: any) => {
    lozenge: LozengeViewModel;
} | {
    lozenge?: undefined;
};
export declare const buildTaskDetails: (json: any) => {
    details: ({
        lozenge: LozengeViewModel;
    } | {
        lozenge?: undefined;
    } | {
        icon: JSX.Element;
        text: string;
    } | {
        icon?: undefined;
        text?: undefined;
    })[];
} | {
    details?: undefined;
};
export declare const buildTaskContext: (json: any) => {
    context: {
        icon: any;
        text: string;
    } | {
        text: string;
    };
} | {
    context?: undefined;
};
export declare function extractBlockViewPropsFromTask(json: any): BlockCardResolvedViewProps;
