import { useState } from 'react';
import { useDataManagerContext } from './DataManagerContext';

export default function useDataManagerState() {
  const { tableInstance } = useDataManagerContext();
  const [state, setState] = useState(tableInstance.initialState);

  tableInstance.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
  }));

  return [state, setState];
}
