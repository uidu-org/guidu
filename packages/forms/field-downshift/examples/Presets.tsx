import Form from '@uidu/form';
import React, { useState } from 'react';
import { Columns, Feather, GitHub, Gitlab, Map } from 'react-feather';
import { ScrollableContainer } from '../../../navigation/shell/src';
import { inputDefaultProps } from '../../field-base/examples-utils';
import useDefaultForm from '../../form/examples-utils';
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

const presets = {
  HorizontalCard: {
    option: DownshiftHorizontalCard,
    menu: (props) => <div tw="flex flex-col space-y-4" {...props} />,
  },
  VerticalCard: {
    option: DownshiftVerticalCard,
    menu: (props) => <div tw="grid gap-4 grid-cols-3" {...props} />,
  },
  Checkbox: {
    option: DownshiftCheckbox,
    menu: (props) => <div {...props} />,
  },
  Radio: {
    option: DownshiftRadio,
    menu: (props) => <div {...props} />,
  },
};

export default function Basic() {
  const defaultForm = useDefaultForm();
  const [preset, setPreset] = useState('HorizontalCard');

  const currentPreset = presets[preset];

  return (
    <ScrollableContainer>
      <div tw="container py-4">
        <Form {...defaultForm} footerRenderer={() => null}>
          <select
            tw="w-full"
            name="status"
            onChange={(e) => setPreset(e.target.value)}
          >
            {Object.keys(presets).map((p) => (
              <option value={p}>{p}</option>
            ))}
          </select>
          <div tw="mt-4">
            <FieldDownshift
              {...inputDefaultProps}
              value={iconItems[2].id}
              layout="elementOnly"
              menu={currentPreset.menu}
              option={currentPreset.option}
              options={iconItems}
            />
          </div>
        </Form>
      </div>
    </ScrollableContainer>
  );
}
