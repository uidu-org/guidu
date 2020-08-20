import { Form } from '@uidu/form';
import { ShellBody } from '@uidu/shell';
import React, { PureComponent } from 'react';
import { Columns, Feather, GitHub, Gitlab, Map } from 'react-feather';
import { inputDefaultProps } from '../../field-base/examples-utils';
import { formDefaultProps } from '../../form/examples-utils';
import FieldDownshift, {
  DownshiftCheckbox,
  DownshiftHorizontalCard,
  DownshiftRadio,
  DownshiftVerticalCard,
} from '../src';

const iconItems = [
  {
    id: 'stuck',
    beforeIcon: <Columns size={32} />,
    name: 'Stuck',
    description: 'Stuck tasks cannot proceed',
    bg: 'rgb(226, 68, 92)',
  },
  {
    id: 'wip',
    beforeIcon: <GitHub size={32} />,
    name: 'Working on it',
    bg: 'rgb(253, 171, 61)',
  },
  {
    id: 'done',
    beforeIcon: <Feather size={32} />,
    name: 'Done',
    bg: 'rgb(0, 200, 117)',
  },
  {
    id: 'waiting',
    beforeIcon: <Gitlab size={32} />,
    name: 'Waiting for review',
    bg: 'rgb(87, 155, 252)',
  },
  {
    id: 'nill',
    beforeIcon: <Map size={32} />,
    name: 'Not set',
    bg: 'rgb(196, 196, 196)',
  },
];

export default class Basic extends PureComponent {
  render() {
    return (
        <div className="container py-4">
          <Form {...formDefaultProps} footerRenderer={() => null}>
            <FieldDownshift
              {...inputDefaultProps}
              scope="donations"
              value={iconItems[2].id}
              onChange={console.log}
              label="HorizontalCard"
              menu={props => <div {...props} />}
              option={DownshiftHorizontalCard}
              options={iconItems}
            />
            <FieldDownshift
              {...inputDefaultProps}
              scope="teams"
              value={iconItems[2].id}
              onChange={console.log}
              label="VerticalCard"
              menu={props => <div className="card-deck" {...props} />}
              option={DownshiftVerticalCard}
              options={iconItems}
            />
            <FieldDownshift
              {...inputDefaultProps}
              scope="donations"
              value={[iconItems[2].id]}
              onChange={console.log}
              label="Checkbox"
              menu={props => <div {...props} />}
              option={DownshiftCheckbox}
              options={iconItems}
              multiple
            />
            <FieldDownshift
              {...inputDefaultProps}
              scope="secondary"
              value={iconItems[2].id}
              onChange={console.log}
              label="Radio"
              menu={props => <div {...props} />}
              option={DownshiftRadio}
              options={iconItems}
            />
          </Form>
        </div>
    );
  }
}
