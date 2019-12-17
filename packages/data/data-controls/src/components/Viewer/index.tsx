import { byName } from '@uidu/data-views';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import React, { useEffect, useRef, useState } from 'react';
import Configurator from '../Configurator';
import More from '../More';
import Starrer from '../Starrer';
import { ViewerProps } from './types';

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
  gridApi,
  gridColumnApi,
}: ViewerProps) {
  const node: React.RefObject<HTMLDivElement> = useRef();
  const [editingName, setEditingName] = useState(false);
  const { icon: Icon, color } = byName[currentView.kind];
  const handleSubmit = async model => {
    updateView({
      ...currentView,
      ...model,
    });
    setEditingName(false);
  };

  const handleClick = e => {
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
    <div className="d-flex align-items-center mr-auto" ref={node}>
      <div className="d-flex align-items-center mr-4">
        <span className="mr-2 d-flex align-items-center">
          <Icon strokeWidth={2} size={18} color={color} />
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
      <Configurator
        isConfiguratorOpen={isConfiguratorOpen}
        gridApi={gridApi}
        gridColumnApi={gridColumnApi}
        currentView={currentView}
        columnDefs={columnDefs}
        groupers={groupers}
        onDragEnd={onDragEnd}
        onResize={onResize}
        rowHeight={rowHeight}
        columnCount={columnCount}
        onSetColumnCount={onSetColumnCount}
        updateView={updateView}
      />
      <Starrer onToggle={updateView} currentView={currentView} />
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
