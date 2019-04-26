import { Action } from 'redux';
import { State } from '../domain';
export default function deselectItem<A extends Action>(state: State, action: A): State;
