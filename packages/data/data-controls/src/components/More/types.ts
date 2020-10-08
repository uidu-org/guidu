import React from 'react';

export type MoreAction = {
  onClick: () => void;
  icon: React.FC<any>;
  text: any;
  download?: boolean;
};

export type MoreProps = {
  onDownload: () => void;
  onRename?: () => void;
  onDuplicate?: () => void;
  onDestroy?: () => void;
  actions: Array<MoreAction>;
};
