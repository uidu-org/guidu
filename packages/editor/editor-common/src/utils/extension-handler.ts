import { Extension, ExtensionHandler } from '../types/extension-handler';

export function getExtensionRenderer<T>(
  extensionHandler: Extension<T> | ExtensionHandler<T>,
): ExtensionHandler<T> {
  if (typeof extensionHandler === 'object') {
    return extensionHandler.render;
  } else {
    return extensionHandler;
  }
}
