import { DataView } from '@uidu/data-views';
import { ConfiguratorProps } from '../Configurator/types';
import { MoreProps } from '../More/types';

export type ViewerProps = ConfiguratorProps &
  MoreProps & {
    currentView?: DataView;
    updateView?: (currentView: DataView) => void;
    availableControls: any;
    columnCount?: number;
    onSetColumnCount?: (columnCount: number) => void;
    isAutoSaving: string;
  };
