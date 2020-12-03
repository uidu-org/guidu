import FieldDownshift, { DownshiftHorizontalCard } from '@uidu/field-downshift';
import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Slot = styled(Link)`
  font-weight: 500;
`;

const SlotsContainer = styled.div`
  height: 385px;
  overflow: scroll;
`;

export default function Slots({
  selectedService,
  selectedDay,
  onSelect,
  slotsByDay = [],
}) {
  return (
    <SlotsContainer>
      <FieldDownshift
        scope="primary"
        name="beginsAt"
        options={slotsByDay.map((slot) => ({
          id: dayjs(slot.split(' - ')[0]).format(),
          name: dayjs(slot.split(' - ')[0]).format('HH:mm'),
        }))}
        option={DownshiftHorizontalCard}
        required
        layout="elementOnly"
        onChange={(name, value) => onSelect(value)}
      />
    </SlotsContainer>
  );
}
