import { byName } from '@uidu/data-views';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import Spinner from '@uidu/spinner';
import Tooltip from '@uidu/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedDate } from 'react-intl';
import More from '../More';
import { ViewerProps } from './types';

const renderAutoSaving = ({ isAutoSaving, icon }) => {
  if (!isAutoSaving) {
    return icon;
  }

  if (isAutoSaving === 'in-progress') {
    return (
      <Tooltip content="Saving now..." className="d-flex">
        <Spinner size={18} />
      </Tooltip>
    );
  }

  if (isAutoSaving === 'done') {
    return (
      <Tooltip className="d-flex" content="All changes have been saved">
        {icon}
      </Tooltip>
    );
  }

  return (
    <Tooltip
      className="d-flex"
      content={
        <span>
          Last editeded at <FormattedDate value={isAutoSaving} />
        </span>
      }
    >
      {icon}
    </Tooltip>
  );
};

export default function Viewer({
  currentView,
  updateView,
  isConfiguratorOpen,
  availableControls,
  columnDefs,
  groupers,
  onDragEnd,
  onResize,
  rowHeight,
  onDownload,
  columnCount,
  onSetColumnCount,
  isAutoSaving,
  startDateField,
  endDateField,
  primaryField,
  tableInstance,
}: ViewerProps) {
  const node: React.RefObject<HTMLDivElement> = useRef();
  const [editingName, setEditingName] = useState(false);
  const { icon: Icon, color } = byName[currentView.kind];
  const handleSubmit = async (model) => {
    updateView(currentView, {
      ...model,
    });
    setEditingName(false);
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setEditingName(false);
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className="d-flex align-items-center flex-shrink-0" ref={node}>
      <div className="d-flex align-items-center mr-3">
        <span className="mr-2 d-flex align-items-center">
          {renderAutoSaving({
            isAutoSaving,
            icon: <Icon strokeWidth={2} size={18} color={color} />,
          })}
        </span>
        {editingName ? (
          <Form handleSubmit={handleSubmit} footerRenderer={() => null}>
            <FieldText
              name="name"
              value={currentView.name}
              layout="elementOnly"
              autoFocus
            />
          </Form>
        ) : (
          <h6 className="m-0">{currentView.name}</h6>
        )}
      </div>

      {/* <Starrer onToggle={updateView} currentView={currentView} /> */}
      {availableControls.more.visible && (
        <More
          onDownload={onDownload}
          onRename={() => setEditingName(true)}
          {...availableControls.more.props}
        />
      )}
    </div>
  );
}
