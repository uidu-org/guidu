import React from 'react';
import { FieldExampleScaffold } from '../../field-base/examples-utils';
import { RadioGroup } from '../src';

export default function Group() {
  return (
    <FieldExampleScaffold
      component={RadioGroup}
      defaultValue={'inline'}
      options={[
        {
          id: 'inline',
          name: 'Inline',
        },
        {
          id: 'stacked',
          name: 'Stacked',
        },
      ]}
    />
  );
}

// export default class Group extends Component<any, any> {
//   state = {
//     isInline: false,
//   };

//   onChange = (name, value) => {
//     this.setState({
//       isInline: value === 'inline',
//     });
//   };

//   render() {
//     const { isInline } = this.state;
//     return (
//       <Form {...formDefaultProps}>
//         <div className="form-group">
//           <RadioGroup
//             {...inputDefaultProps}
//             layout="elementOnly"
//             isInline
//             name="isInline"
//             options={[
//               {
//                 id: 'inline',
//                 name: 'Inline',
//               },
//               {
//                 id: 'stacked',
//                 name: 'Stacked',
//               },
//             ]}
//             onChange={this.onChange}
//             // onBlur={this.onBlur}
//             // onFocus={this.onFocus}
//             label="With change, blur & focus handlers"
//             value={isInline ? 'inline' : 'stacked'}
//           />
//         </div>
//         <RadioGroup
//           {...inputDefaultProps}
//           isInline={isInline}
//           options={defaultOptions}
//           // onBlur={this.onBlur}
//           // onFocus={this.onFocus}
//           label="With change, blur & focus handlers"
//           value={defaultOptions[2].id}
//         />
//       </Form>
//     );
//   }
// }
