import { faGripVertical, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldText from '@uidu/field-text';
import Toggle from '@uidu/toggle';
import React, { PureComponent } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';

export default class SingleSelectForm extends PureComponent<any, any> {
  static defaultProps = {
    prefix: 'attributes',
  };

  constructor(props) {
    super(props);

    this.state = {
      options: [{}],
    };
  }

  sortAlphabetically = () => console.log('sort');

  render() {
    const { prefix } = this.props;
    const { options } = this.state;

    return (
      <DragDropContext>
        <div className="form-group">
          <div className="d-flex align-items-center justify-content-between py-2 mb-2 border-bottom">
            <div className="d-flex align-items-center">
              <Toggle
                name={`${prefix}[preferences][withColor]`}
                onChange={console.log}
                isDefaultChecked
              />
              <span className="text-muted small ml-2">
                <FormattedMessage
                  defaultMessage="Colored options"
                  id="field.singleSelect.form.preferences.withColors"
                />
              </span>
            </div>
            {/* <button
              className="btn btn-sm btn-light"
              type="button"
              onClick={this.sortAlphabetically}
            >
              <FormattedMessage
                defaultMessage="Sort alphabetically"
                id="field.singleSelect.form.preferences.sortAlphabetically"
              />
            </button> */}
          </div>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {options.map((option, index) => (
                  <Draggable draggableId={`draggable-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="d-flex align-items-center mb-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        {options.length > 1 && (
                          <div className="px-3" {...provided.dragHandleProps}>
                            <FontAwesomeIcon icon={faGripVertical} />
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <FormattedMessage
                            id="field.singleSelect.form.option.name"
                            defaultMessage="Insert option name"
                          >
                            {placeholder => (
                              <FieldText
                                name={`${prefix}[options][${index}][name]`}
                                layout="elementOnly"
                                placeholder={placeholder}
                                className="form-control-sm"
                                autoFocus
                                required
                              />
                            )}
                          </FormattedMessage>
                        </div>
                        <button
                          type="button"
                          className="btn btn-sm btn-simple"
                          onClick={() =>
                            this.setState(prevState => ({
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
                this.setState(prevState => ({
                  options: [...prevState.options, {}],
                }))
              }
            >
              Add option
            </button>
          </div>
        </div>
      </DragDropContext>
    );
  }
}
