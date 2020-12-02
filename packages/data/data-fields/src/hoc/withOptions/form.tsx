import { faGripVertical, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldColorPicker from '@uidu/field-color-picker';
import FieldText from '@uidu/field-text';
import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';

const Trigger = ({ toggleDialog, value }) => (
  <div
    style={{ backgroundColor: value, width: 18, height: 18, borderRadius: 36 }}
    onClick={toggleDialog}
    className="border"
  />
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class SingleSelectForm extends PureComponent<any, any> {
  static defaultProps = {
    prefix: 'attributes',
    options: [
      {
        id: 1,
        color: 'red',
        isNewOption: true,
      },
    ],
  };

  constructor(props) {
    super(props);

    this.state = {
      options: props.options,
    };
  }

  sortAlphabetically = () => console.log('sort');

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const options = reorder(
      this.state.options,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      options,
    });
  };

  render() {
    const { prefix } = this.props;
    const { options } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...provided.droppableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
            >
              {options.map((option, index) => (
                <Draggable
                  key={option.id}
                  draggableId={`draggable-${option.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className="d-flex align-items-center mb-2"
                      ref={provided.innerRef}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      {...provided.draggableProps}
                    >
                      <div
                        className="px-3 d-flex"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...provided.dragHandleProps}
                      >
                        <FontAwesomeIcon icon={faGripVertical} />
                      </div>
                      <div className="flex-grow-1 d-flex align-items-center">
                        <div className="mr-3">
                          <FieldColorPicker
                            name={`${prefix}[options][${index}][color]`}
                            trigger={Trigger}
                            layout="elementOnly"
                            value={option.color}
                          />
                        </div>
                        {!option.isNewOption && (
                          <FieldText
                            type="hidden"
                            name={`${prefix}[options][${index}][id]`}
                            value={option.id}
                          />
                        )}
                        <FieldText
                          type="hidden"
                          name={`${prefix}[options][${index}][position]`}
                          value={index}
                        />
                        <FormattedMessage
                          id="field.singleSelect.form.option.name"
                          defaultMessage="Insert option name"
                        >
                          {(placeholder) => (
                            <FieldText
                              name={`${prefix}[options][${index}][name]`}
                              layout="elementOnly"
                              placeholder={placeholder}
                              className="form-control-sm"
                              required
                              value={option.name}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                      <button
                        tabIndex={-1}
                        type="button"
                        className="btn btn-sm btn-simple"
                        onClick={() =>
                          this.setState((prevState) => ({
                            options: [
                              ...prevState.options.slice(0, index),
                              ...prevState.options.slice(index + 1),
                            ],
                          }))
                        }
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
        <div className="mt-2 py-2 border-top">
          <button
            type="button"
            className="btn btn-light btn-sm btn-block"
            onClick={() =>
              this.setState((prevState) => ({
                options: [
                  ...prevState.options,
                  {
                    id: prevState.options.length + 1,
                    isNewOption: true,
                  },
                ],
              }))
            }
          >
            Add option
          </button>
        </div>
      </DragDropContext>
    );
  }
}
