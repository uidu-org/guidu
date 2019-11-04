// export type fn = (e: any) => any;
// export type InnerProps = {
//   'aria-selected': boolean,
//   id: string,
//   innerRef: Ref,
//   key: string,
//   onClick: MouseEventHandler,
//   onMouseOver: MouseEventHandler,
//   role: 'option',
//   tabIndex: number,
// };

// export type ValueType = OptionType | OptionsType | null | void;

// export type OptionsType = Array<OptionType>;

// export type OptionType = {
//   [string]: any,
// };

// export type ClassNamesState = { [string]: boolean } | void;

// export type ActionTypes =
//   | 'select-option'
//   | 'deselect-option'
//   | 'remove-value'
//   | 'pop-value'
//   | 'set-value'
//   | 'clear'
//   | 'create-option';

// export type CommonProps = {
//   clearValue: () => void;
//   cx: (className: string | Array<string>, classNameState: ClassNamesState) => string | void;
//   /**
//       Get the styles of a particular part of the select. Pass in the name of the
//       property as the first argument, and the current props as the second argument.
//       See the `styles` object for the properties available.
//     */
//   getStyles: (string, any) => {};
//   getValue: () => ValueType;
//   hasValue: boolean;
//   multiple: boolean;
//   options: OptionsType;
//   selectOption: (OptionType) => void;
//   selectProps: any;
//   setValue: (ValueType, ActionTypes) => void;
// };
