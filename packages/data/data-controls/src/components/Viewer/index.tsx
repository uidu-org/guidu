import { byName } from '@uidu/data-views';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import React, { useState } from 'react';
import Configurator from '../Configurator';
import More from '../More';
import Starrer from '../Starrer';
import { ViewerProps } from './types';

export default function Viewer({
  currentView,
  availableControls,
  columnDefs,
  addGrouper,
  removeGrouper,
  groupers,
  onToggle,
  onDragEnd,
  onResize,
  rowHeight,
  onDownload,
  columnCount,
  onSetColumnCount,
}: ViewerProps) {
  const [editingName, setEditingName] = useState(false);
  const { icon: Icon, color } = byName[currentView.kind];
  return (
    <div className="d-flex align-items-center mr-auto">
      <div className="d-flex align-items-center mr-4">
        <span className="mr-2 d-flex align-items-center">
          <Icon strokeWidth={2} size={18} color={color} />
        </span>
        {editingName ? (
          <Form
            handleSubmit={async model => console.log(model)}
            footerRenderer={() => null}
          >
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
        currentView={currentView}
        columnDefs={columnDefs.filter(
          column => column.type !== 'cover' && column.type !== 'avatar',
        )}
        addGrouper={addGrouper}
        removeGrouper={removeGrouper}
        groupers={groupers}
        onToggle={onToggle}
        onDragEnd={onDragEnd}
        onResize={onResize}
        rowHeight={rowHeight}
        columnCount={columnCount}
        onSetColumnCount={onSetColumnCount}
      />
      <Starrer />
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
