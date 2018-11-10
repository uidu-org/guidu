# Controlled / uncontrolled props

Related reading:

* <https://reactjs.org/docs/uncontrolled-components.html>
* <https://github.com/treshugart/react-ctrl>

## History

We used to separate our components into stateful and stateless versions. This allowed us to offer safe defaults while giving the consumer of our API full control. Unfortunately, this draws a hard line between the two patterns and offers no flexibility in between the two.

It was sort of the hot thing at the time when we made the decision to follow this pattern. It was a fairly simple separation that we could easily follow and apply to all components. This made our lives easier, but over time, we discovered that it made our consumers' lives harder and we'd selectively add this pattern to individual props for whichever component we had the complaint for, which bred inconsistency.

## Learning

We've recently been spiking some patterns to be able to give consumers the ability to selectively apply the controlled / uncontrolled pattern to any given piece of state within a component. This means that not only form fields and the `defaultValue` / `value` props get this treatment, all `state` can have corresponding default props (uncontrolled) or props (controlled).

On the component developer's end, the steps are as follows:
1. Expose a default prop for each controlled prop that you wish to also be uncontrolled. The convention for naming is the controlled prop has the
   same name as a key in state and the default prop name is prefixed with `default`. For `value`, this would mean you have a `value` prop and a `defaultValue` prop.

   ```
   type Props = {
     value?: string;
     defaultValue: string;
   }
   ```
   Note that the flow type for the default prop is required since we're going to be adding a `defaultProps` entry for it.

2. Add the default values for each uncontrolled (default) prop in the static `defaultProps` property of your component.

   ```
   class myComponent extends React.Component {
     static defaultProps = {
       defaultValue: '',
     };
     ...
   }
   ```
3. Initialise your state with keys for each controlled prop with values sourced from your uncontrolled prop value

   ```
   class myComponent extends React.Component {
     ...
     state = {
       value: this.props.defaultValue,
     }
     ...
   }
   ```
4. Create a custom `getState` method (or getter) that retrieves your state but with your controlled props merged in as well. This method will then
   be used as the single source of truth and results in controlled props being used if they exist and the uncontrolled state value if not.

   ```
   import pick from 'lodash.pick';
   ...
   class myComponent extends React.Component {
     ...
     getState = () => {
       return {...this.state, ...pick(this.props, ['value'])};
     }
     ...
   }
   ```
5. Use `this.getState()` everywhere you access state instead of `this.state`.

   ```
     handleClick = () => {
       const { value } = this.getState();
       ...
     }

     render() {
       const { value } = this.getState();
       ...
     }
   ```


[react-ctrl](https://github.com/treshugart/react-ctrl) was created to abstract most of these steps away, however, its API isn't stable yet so we have
gone with the more manual approach for now.

## Usage

Initially, we've applied this to the `calendar` and `datetime-picker` components but hope to expand support across all of our components in the near future
once we've investigated if there's a better abstraction for this pattern.

In order to get both controlled and uncontrolled behaviour from the `datetime-picker`, we used to have to do:

```js
import { DatePicker, DatePickerStateless } from '@atlaskit/datetime-picker';

// Uncontrolled.
<DatePicker defaultValue="2000-01-01" />

// Controlled.
<DatePickerStateless value="2000-01-01" />
```

However, now, all we have to do is:

```js
import { DatePicker } from '@atlaskit/datetime-picker';

// Uncontrolled.
<DatePicker defaultValue="2000-01-01" />

// Controlled.
<DatePicker value="2000-01-01" />
```

Internally, this enables us to reuse a lot more code. Externally, the consumer gets a more consistent and predictable API. It doesn't look like much initially, but because of this, you can now control - or specify defaults for - other props such as `isOpen`.

```js
<DatePicker isOpen />
```

Or just have it open by default, and state will take over:

```js
<DatePicker defaultIsOpen />
```
