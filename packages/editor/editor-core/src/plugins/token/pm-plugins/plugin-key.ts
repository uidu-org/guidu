import { PluginKey } from 'prosemirror-state';
import { TokenPluginState } from './types';

export const pluginKey = new PluginKey<TokenPluginState>('tokenPlugin');

export default pluginKey;
