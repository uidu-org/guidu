import ExitingPersistence, {
  ExitingPersistenceProps,
} from '@atlaskit/motion/exiting-persistence';
import React from 'react';

function ModalTransition({
  children,
}: Pick<ExitingPersistenceProps, 'children'>) {
  return <ExitingPersistence appear>{children}</ExitingPersistence>;
}

export default ModalTransition;
