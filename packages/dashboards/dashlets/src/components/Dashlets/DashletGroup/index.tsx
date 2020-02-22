import React from 'react';
import DashletHeader from '../../DashletHeader';
import Dashlets from '../../Dashlets';

export default function DashletGroup({
  isCard = true,
  block,
  blocks,
  rowData,
  ...rest
}) {
  return (
    <div className={`h-100${isCard ? ' card' : ' card border-0'}`}>
      {block.label && (
        <DashletHeader
          name={block.label}
          description={block.description}
          isCard={isCard}
        />
      )}
      <Dashlets
        blocks={blocks.map(b => ({ ...b, isCard: false }))}
        rowData={rowData}
        {...rest}
      />
    </div>
  );
}
