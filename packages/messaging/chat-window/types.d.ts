export declare type MessageableType = {
    /** The base styling to apply to the button */
    messages: Array;
};
export declare type ChatWindowType = {
    /** The base styling to apply to the button */
    messageable: MessageableType;
    /** The base styling to apply to the button */
    fetchMessages: () => Array;
};
