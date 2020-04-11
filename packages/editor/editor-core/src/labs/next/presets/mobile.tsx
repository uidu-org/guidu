// #region Imports
import {
  useProvider,
  useProviderFactory,
} from '@uidu/editor-common/provider-factory';
import React from 'react';
import analyticsPlugin from '../../../plugins/analytics';
import annotationPlugin from '../../../plugins/annotation';
import basePlugin from '../../../plugins/base';
import cardPlugin from '../../../plugins/card';
import codeBlockPlugin from '../../../plugins/code-block';
import datePlugin from '../../../plugins/date';
import emojiPlugin from '../../../plugins/emoji';
import expandPlugin from '../../../plugins/expand';
import extensionPlugin from '../../../plugins/extension';
import layoutPlugin from '../../../plugins/layout';
import listsPlugin from '../../../plugins/lists';
import maxContentSizePlugin from '../../../plugins/max-content-size';
import mediaPlugin, { CustomMediaPicker } from '../../../plugins/media';
import mentionsPlugin from '../../../plugins/mentions';
import mobileScrollPlugin from '../../../plugins/mobile-scroll';
import panelPlugin from '../../../plugins/panel';
import placeholderPlugin from '../../../plugins/placeholder';
import rulePlugin from '../../../plugins/rule';
import statusPlugin from '../../../plugins/status';
import tablesPlugin from '../../../plugins/table';
import tasksAndDecisionsPlugin from '../../../plugins/tasks-and-decisions';
import textColorPlugin from '../../../plugins/text-color';
import { PresetProvider } from '../Editor';
import { useDefaultPreset } from './default';
import { EditorPresetProps } from './types';
import { addExcludesFromProviderFactory } from './utils';

// #endregion

type EditorPresetMobileProps = {
  children?: React.ReactNode;
  placeholder?: string;
  maxContentSize?: number;
  createAnalyticsEvent?: any;
  media?: {
    picker?: CustomMediaPicker;
    allowMediaSingle?: boolean;
  };
} & EditorPresetProps;

export function useMobilePreset({
  media,
  placeholder,
  maxContentSize,
  createAnalyticsEvent,
  featureFlags,
}: EditorPresetMobileProps & EditorPresetProps) {
  const mediaProvider = useProvider('mediaProvider');
  const [preset] = useDefaultPreset({
    featureFlags,
  });

  // @ts-ignore
  preset.add([
    basePlugin,
    {
      allowScrollGutter: {
        getScrollElement: () => document.body,
        allowCustomScrollHandler: false,
      },
    },
  ]);
  preset.add([analyticsPlugin, createAnalyticsEvent]);
  preset.add([
    tablesPlugin,
    {
      tableOptions: {
        allowControls: false,
      },
    },
  ]);
  preset.add(codeBlockPlugin);
  preset.add(panelPlugin);
  preset.add(listsPlugin);
  preset.add(textColorPlugin);
  preset.add(extensionPlugin);
  preset.add(rulePlugin);
  preset.add(datePlugin);
  // @ts-ignore
  preset.add(layoutPlugin);
  preset.add([
    statusPlugin,
    {
      menuDisabled: false,
      useInlineWrapper: true,
    },
  ]);
  // @ts-ignore
  preset.add([placeholderPlugin, { placeholder }]);
  preset.add(annotationPlugin);
  preset.add(mobileScrollPlugin);
  preset.add(expandPlugin);
  // Begin -> This would be exclude if the provider doesnt exist in the factory
  // @ts-ignore
  preset.add(tasksAndDecisionsPlugin);
  // @ts-ignore
  preset.add([cardPlugin, { allowBlockCards: true }]);
  // @ts-ignore
  preset.add([mentionsPlugin, { useInlineWrapper: true }]);
  // @ts-ignore
  preset.add([emojiPlugin, { useInlineWrapper: true }]);
  // End

  if (maxContentSize) {
    preset.add([maxContentSizePlugin, maxContentSize as any]);
  }

  if (media) {
    // @ts-ignore
    preset.add([
      mediaPlugin,
      {
        provider: mediaProvider,
        customMediaPicker: media.picker,
        fullWidthEnabled: false,
        allowMediaSingle: true,
        allowLazyLoading: false,
        allowMediaSingleEditable: false,
        allowRemoteDimensionsFetch: false,
        allowMarkingUploadsAsIncomplete: true,
      },
    ]);
  }

  return [preset];
}

export type MobilePresetProps = EditorPresetMobileProps & EditorPresetProps;

export function EditorPresetMobile(props: MobilePresetProps) {
  const { children, excludes } = props;
  const [preset] = useMobilePreset(props);
  const providerFactory = useProviderFactory();

  const plugins = preset.getEditorPlugins(
    addExcludesFromProviderFactory(providerFactory, excludes),
  );

  return <PresetProvider value={plugins}>{children}</PresetProvider>;
}
