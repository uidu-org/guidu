// @flow
import React, { PureComponent } from 'react';
import { Form } from '@uidu/form';
import { Checkbox } from '../src/index';

const PARENT_ID = 'PARENT';
const CHILD_1_ID = 'CHILD1';
const CHILD_2_ID = 'CHILD2';

const getCheckedChildrenCount = checkedItems => {
  const childItems = Object.keys(checkedItems).filter(i => i !== PARENT_ID);
  return childItems.reduce(
    (count, i) => (checkedItems[i] ? count + 1 : count),
    0,
  );
};

const getIsParentIndeterminate = checkedItems => {
  const checkedChildrenCount = getCheckedChildrenCount(checkedItems);
  return checkedChildrenCount > 0 && checkedChildrenCount < 2;
};

export default class IndeterminateExample extends PureComponent {
  state = {
    checkedItems: {
      [PARENT_ID]: false,
      [CHILD_1_ID]: false,
      [CHILD_2_ID]: false,
    },
  };

  onChange = event => {
    const { checkedItems } = this.state;
    const itemValue = event.target.value;

    if (itemValue === PARENT_ID) {
      const newCheckedState = !checkedItems[PARENT_ID];
      this.setState({
        // Set all items to the checked state of the parent
        checkedItems: Object.keys(checkedItems).reduce(
          (items, i) => ({ ...items, [i]: newCheckedState }),
          {},
        ),
      });
    } else {
      const newCheckedItems = {
        ...checkedItems,
        [itemValue]: !checkedItems[itemValue],
      };
      this.setState({
        checkedItems: {
          ...newCheckedItems,
          // If all children would be unchecked, also uncheck the parent
          [PARENT_ID]: getCheckedChildrenCount(newCheckedItems) > 0,
        },
      });
    }
  };

  render() {
    const { checkedItems } = this.state;

    return (
      <Form>
        <p style={{ marginBottom: '8px' }}>
          An indeterminate checkbox can be used to show partially checked
          states. The parent checkbox below will be indeterminate until all
          its&#39; children are checked.
        </p>
        <Checkbox
          isChecked={checkedItems[PARENT_ID]}
          isIndeterminate={getIsParentIndeterminate(checkedItems)}
          onChange={this.onChange}
          label="Parent Checkbox"
          value={PARENT_ID}
          name="parent"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '24px',
          }}
        >
          <Checkbox
            isChecked={checkedItems[CHILD_1_ID]}
            onChange={this.onChange}
            label="Child Checkbox 1"
            value={CHILD_1_ID}
            name="child-1"
          />
          <Checkbox
            isChecked={checkedItems[CHILD_2_ID]}
            onChange={this.onChange}
            label="Child Checkbox 2"
            value={CHILD_2_ID}
            name="child-1"
          />
        </div>
      </Form>
    );
  }
}
