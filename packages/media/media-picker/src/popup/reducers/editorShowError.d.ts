import { Action } from 'redux';
import { State } from '../domain';
export default function editorShowError<A extends Action>(state: State, action: A): State;
