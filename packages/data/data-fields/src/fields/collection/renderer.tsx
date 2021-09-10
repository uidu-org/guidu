import {
  faFont,
  faGripVertical,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldText from '@uidu/field-text';
import { Field } from '../../types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormattedDate, useIntl } from 'react-intl';

const Trigger = ({ triggerProps, toggleDialog, value }) => (
  <div
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...triggerProps}
    style={{ backgroundColor: value, width: 30, height: 20 }}
    onClick={toggleDialog}
    className="border rounded ignore-onclickoutside"
  />
);

const reorder = (
  list: Field[],
  startIndex: number,
  endIndex: number,
): Field[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type Option = {
  id: number;
  name?: string;
  color: string;
  isNewOption: boolean;
};

export default function CollectionFieldsRenderer({
  prefix = 'attributes',
  fields = [],
}: {
  prefix?: string;
  fields: Field[];
}) {
  const intl = useIntl();

  const [currentFields, setCurrentFields] = useState<Field[]>(fields);
  // const sortAlphabetically = () => console.log('sort');

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setCurrentFields((prevCurrentFields) =>
      reorder(prevCurrentFields, result.source.index, result.destination.index),
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {currentFields.map((field, index) => (
              <Draggable
                key={field.id}
                draggableId={`draggable-${field.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className="card d-flex align-items-center flex-row mb-3"
                    ref={provided.innerRef}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.draggableProps}
                  >
                    <div
                      className="mx-2 p-3 d-flex"
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.dragHandleProps}
                    >
                      <FontAwesomeIcon icon={faGripVertical} />
                    </div>
                    <div className="flex-grow-1 d-flex align-items-center">
                      <FieldText
                        type="hidden"
                        name={`${prefix}[fields][${index}][position]`}
                        value={index}
                      />
                      <FieldText
                        name={`${prefix}[fields][${index}][name]`}
                        layout="elementOnly"
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Insert field name',
                        })}
                        required
                        value={field.name}
                        className="border-0"
                      />
                    </div>
                    <button
                      tabIndex={-1}
                      type="button"
                      className="btn btn-sm btn-simple"
                      onClick={() => {
                        setCurrentFields((prevCurrentFields) => [
                          ...prevCurrentFields.slice(0, index),
                          ...prevCurrentFields.slice(index + 1),
                        ]);
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="my-3">
        <button
          type="button"
          className="btn btn-light btn-sm btn-block"
          onClick={() => {
            setCurrentFields((prevCurrentFields) => [
              ...prevCurrentFields,
              {
                accessor: 'string',
                id: prevCurrentFields.length + 1,
                kind: 'string',
                name: <FormattedMessage defaultMessage="String" />,
                icon: <FontAwesomeIcon icon={faFont} />,
                color: '#E4BA3F',
                // form: StringForm,
              },
            ]);
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Add field' })}
        </button>
      </div>
    </DragDropContext>
  );
}
