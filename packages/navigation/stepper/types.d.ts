/// <reference types="react" />
import { RouteComponentProps } from 'react-router-dom';
export declare type StepProps = {
    children: React.ReactNode;
    name: string;
    label: string;
    number: number;
    description?: string;
    isActive?: (name: string) => boolean;
    toggleStep: (name: string, step: React.RefObject<HTMLDivElement>) => any;
    jumpToStep: (name: string) => void;
    className?: string;
    scope?: string;
    isCompleted: boolean;
    isDisabled?: boolean;
    isEditable?: boolean;
};
export declare type StepperProps = {
    defaultStep?: string;
    scrollElement?: HTMLDivElement;
    children: (props: any) => StepProps;
} & RouteComponentProps;
