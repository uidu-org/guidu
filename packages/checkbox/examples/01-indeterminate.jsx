// @flow
import React, { PureComponent } from 'react';
import { Form } from '../../form/src/index';
import { Checkbox } from '../src/index';

const getCheckedChildrenCount = checkedItems => {
  const childItems = Object.keys(checkedItems).filter(i => i !== 'parent');
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
      parent: false,
      'child-1': false,
      'child-2': false,
    },
  };

  onChange = (name, value) => {
    const { checkedItems } = this.state;

    if (name === 'parent') {
      this.setState({
        // Set all items to the checked state of the parent
        checkedItems: {
          parent: value,
          'child-1': value,
          'child-2': value,
        },
      });
    } else {
      const newCheckedItems = {
        ...checkedItems,
        [name]: !checkedItems[name],
      };
      this.setState({
        // Set all items to the checked state of the parent
        checkedItems: {
          ...newCheckedItems,
          parent: getCheckedChildrenCount(newCheckedItems) > 0,
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
          value={checkedItems.parent}
          isIndeterminate={getIsParentIndeterminate(checkedItems)}
          onChange={this.onChange}
          layout="elementOnly"
          label="Parent Checkbox"
          id="parent"
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
            value={checkedItems['child-1']}
            onChange={this.onChange}
            layout="elementOnly"
            label="Child Checkbox 1"
            id="child-1"
            name="child-1"
          />
          <Checkbox
            value={checkedItems['child-2']}
            onChange={this.onChange}
            layout="elementOnly"
            label="Child Checkbox 2"
            id="child-2"
            name="child-2"
          />
        </div>
      </Form>
    );
  }
}
