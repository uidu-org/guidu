import {
  combineProviders,
  ExtensionProvider,
  getItemsFromModule,
  resolveImport,
} from '@uidu/editor-common';
import {
  QuickInsertItem,
  QuickInsertProvider,
} from '@uidu/editor-common/provider-factory';
import React from 'react';
import Loadable from 'react-loadable';
import EditorActions from '../actions';

export async function extensionProviderToQuickInsertProvider(
  extensionProvider: ExtensionProvider,
  editorActions: EditorActions,
): Promise<QuickInsertProvider> {
  const extensions = await extensionProvider.getExtensions();

  return {
    getItems: () => {
      const quickInsertItems = getItemsFromModule<QuickInsertItem>(
        extensions,
        'quickInsert',
        (item) => {
          const Icon = Loadable<{ label: string }, any>({
            loader: item.icon,
            loading: () => null,
          });

          return {
            title: item.title,
            description: item.description,
            icon: () => <Icon label={item.title} />,
            action: (insert) => {
              if (typeof item.node === 'function') {
                resolveImport(item.node()).then((node) => {
                  editorActions.replaceSelection(node);
                });
                return insert('');
              } else {
                return insert(item.node);
              }
            },
          };
        },
      );

      return Promise.all(quickInsertItems);
    },
  };
}

export async function combineQuickInsertProviders(
  quickInsertProviders: Array<
    QuickInsertProvider | Promise<QuickInsertProvider>
  >,
): Promise<QuickInsertProvider> {
  const { invokeList } =
    combineProviders<QuickInsertProvider>(quickInsertProviders);

  return {
    getItems() {
      return invokeList('getItems');
    },
  };
}
