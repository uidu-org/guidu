import type { DisableSpellcheckByBrowser } from './supported-browsers';

/**
 * Feature Flags for experimental features/behaviours.
 *
 * This feature flags are not meant to be used as plugin configuration and are only for temporary flags that will eventually be enabled be default or removed.
 * If your plugin requires permanent configuration options it's better to keep them in plugin options.
 *
 * # ADDING NEW FEATURE FLAG
 *
 * – Every feature flag must have a description explaining what it's meant to be doing.
 * – Every feature flag must have an associated ticket and a DUE DATE when this flag will be removed and an owner who will remove it.
 *
 * ## TEMPLATE
 *
 * When adding a new feature flag use the following template:
 *
 * ```
 * @description
 * What this feature flag is doing. Do not lead with "Feature flag to".
 *
 * @see https://product-fabric.atlassian.net/browse/ED-1
 * @default false
 * ```
 *
 * ## NAMING
 * – Name feature flags without `allow`.
 * – A name should read as "Feature flag to enable ...".
 *
 * Example: name = "newInsertionBehaviour" -> "Enable new insertion behaviour"
 */
export type FeatureFlags = {
  /**
   * @description Enable single layout option
   *
   * @see https://hello.atlassian.net/browse/LOVE-187
   * @default false
   */
  singleLayout?: boolean;
  /**
   * @description Enable new insertion behaviour
   *
   * @see https://product-fabric.atlassian.net/l/c/JYoSEu00
   * @default false
   */
  newInsertionBehaviour?: boolean;

  /**
   * @description Allows to toggle expand open state
   * @default true
   */
  interactiveExpand?: boolean;

  /**
   * @description
   * Whether a placeholder bracket hint was provided (`string => boolean`)
   * Placeholder text to be displayed when a bracket '{' is typed and the line is empty e.g. 'Did you mean to use '/' to insert content?'
   * This is used to aid migration for TinyMCE power users to the new Fabric editor power user shortcuts.
   *
   * @see https://product-fabric.atlassian.net/l/c/4JLjusAP
   * @default true
   */
  placeholderBracketHint?: boolean;

  /**
   * @description
   * Whether placeholder hints were provided (`string[] => boolean`)
   * Placeholder text values to display on new empty lines.
   *
   * @see https://product-fabric.atlassian.net/l/c/GG1Yv9cK
   * @default false
   */
  placeholderHints?: boolean;

  /**
   * @description
   * Enable additional text colours within the colour palette.
   *
   * @see https://product-fabric.atlassian.net/l/c/YhyvfWqg
   * @default false
   */
  moreTextColors?: boolean;

  /**
   * @description
   * Enable find/replace functionality within the editor
   *
   * @see https://product-fabric.atlassian.net/browse/ED-3504
   * @default false
   */
  findReplace?: boolean;

  /**
   * @description
   * Enable case matching functionality in find/replace feature within the editor
   *
   * @see https://product-fabric.atlassian.net/browse/ED-9684
   * @default false
   */
  findReplaceMatchCase?: boolean;

  /**
   * @description
   * Enable `localId` generation for extensions.
   *
   * @see https://product-fabric.atlassian.net/l/c/2m0i9jLX
   * @default false
   */
  extensionLocalIdGeneration?: boolean;

  /**
   * @description
   * Enable date picker which has a textbox for internationalised keyboard date
   * input.
   *
   * @see https://product-fabric.atlassian.net/browse/ED-8928
   * @default false
   */
  keyboardAccessibleDatepicker?: boolean;
  /**
   * @description
   * Enable add column custom step
   *
   * @see https://product-fabric.atlassian.net/browse/ED-8856
   * @default false
   */
  addColumnWithCustomStep?: boolean;

  /**
   * @description
   * Enable undo/redo buttons and functionality within the editor
   *
   * @see https://product-fabric.atlassian.net/browse/ED-9537
   * @default false
   */
  undoRedoButtons?: boolean;

  /**
   * @description
   * Measure render performance for all tracked analytics events
   *
   * @default false
   */
  catchAllTracking?: boolean;

  /**
   * @description
   * Enables performance optimization for sticky headers in tables
   *
   * @see https://product-fabric.atlassian.net/browse/ED-11807
   * @default false
   */
  stickyHeadersOptimization?: boolean;

  /**
   * @description
   * Enables performance optimization for initial table render
   *
   * @see https://product-fabric.atlassian.net/browse/ED-11647
   * @default false
   */
  initialRenderOptimization?: boolean;

  /**
   * @description
   * Enables performance optimization for mousemove inside table
   *
   * @see https://product-fabric.atlassian.net/browse/ED-11577
   * @default false
   */
  mouseMoveOptimization?: boolean;

  /**
   * @description
   * Enables performance optimization for table rendering on keypress
   *
   * @see https://product-fabric.atlassian.net/browse/ED-11640
   * @default false
   */
  tableRenderOptimization?: boolean;

  /**
   * @description
   * Enables performance optimization for table rendering on keypress
   *
   * @see https://product-fabric.atlassian.net/browse/ED-11781
   * @default false
   */
  tableOverflowShadowsOptimization?: boolean;

  /**
   * Enable extend floating toolbars
   * @see https://product-fabric.atlassian.net/browse/ED-11963
   * @default false
   */
  extendFloatingToolbar?: boolean;

  /**
   * Show the avatar group as a plugin
   * @see https://product-fabric.atlassian.net/browse/CERN-747
   * @default false
   */
  showAvatarGroupAsPlugin?: boolean;

  /**
   * @description
   * Enables docStructure for unhandleErrorEvents
   *
   * @see https://product-fabric.atlassian.net/browse/ED-12998
   * @default false
   */
  errorBoundaryDocStructure?: boolean;

  /**
   * @description
   * Enables docStructure for synchronyError
   *
   * @see https://product-fabric.atlassian.net/browse/ED-12998
   * @default false
   */
  synchronyErrorDocStructure?: boolean;

  /**
   * @decsription
   * Enables the view update subscription plugin
   *
   * @default false
   */
  enableViewUpdateSubscription?: boolean;

  /**
   * @description
   * Enable scroll-to-telepointer for collab avatars
   *
   * @see https://product-fabric.atlassian.net/browse/ED-12460
   * @default false
   */
  collabAvatarScroll?: boolean;

  /**
   * @description
   * Enable UFO experiences
   *
   * @see https://product-fabric.atlassian.net/browse/ED-13059
   * @default false
   */
  ufo?: boolean;

  /**
   * Split editor toolbar to two lines when viewport is small
   * @see https://product-fabric.atlassian.net/browse/CERN-1124
   * @default false
   */
  twoLineEditorToolbar?: boolean;

  /**
   * Prevent transactions from being mutated (e.g. apply, filterTransaction,
   * appendTransaction) after being dispatched
   * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/3131836958/Editor+DACI+013+Avoid+content+loss+with+bad+transactions+Ghost+Steps
   * @see https://product-fabric.atlassian.net/browse/ED-14002
   * @default false
   */
  saferDispatchedTransactions?: boolean;

  /**
   * Create non-smart hyperlinks on plain text paste (Cmd/Ctrl+Shift+v)
   * @see https://product-fabric.atlassian.net/browse/EDM-2492
   * @default false
   */
  plainTextPasteLinkification?: boolean;

  /**
   * @description
   * Enable new collab service
   * @see https://product-fabric.atlassian.net/browse/ED-14097
   * @default false
   */
  useNativeCollabPlugin?: boolean;

  /**
   * Enable custom up/down key handler when cursor below/above an inline media
   * @see https://product-fabric.atlassian.net/browse/ED-13066
   * Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=1227468
   * @default undefined
   */
  chromeCursorHandlerFixedVersion?: number;

  /**
   * Enable table cell options in the floating toolbar
   * @see https://product-fabric.atlassian.net/browse/ED-14418
   * @default false
   */
  tableCellOptionsInFloatingToolbar?: boolean;

  /**
   * Number to distinguish between which different toolbar is being displayed
   * as part of the smart link view changing experiment run by the Linking Platform.
   * @see https://product-fabric.atlassian.net/browse/EDM-2640
   * @default null
   */
  viewChangingExperimentToolbarStyle?: string;

  /**
   * @description
   * Enable display of a preview modal on mouse over of inline smart card
   *
   * @see https://product-fabric.atlassian.net/browse/EDM-2860
   * @default false
   */
  showHoverPreview?: boolean;

  /**
   * @description
   * Generic way of disabling spellcheck per browser by version range
   *
   * @see https://product-fabric.atlassian.net/browse/ED-14510
   * @default {}
   * Example:
   * {
   *    ie: {
   *      minimum: 101,
   *    },
   *    chrome: {
   *      minimum: 96,
   *      maximum: 109,
   *    },
   * };
   */
  disableSpellcheckByBrowser?: DisableSpellcheckByBrowser | undefined;

  /**
   * @description
   * Show indentation buttons in the Editor toolbar
   *
   * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/3237512038/EXPLORE+Indentation+buttons+in+the+Editor+toolbar
   * @see https://product-fabric.atlassian.net/browse/ED-15067
   * @default false
   */
  indentationButtonsInTheToolbar?: boolean;

  /**
   * @description
   * Show copy buttons in the Floating toolbar
   *
   * @see https://product-fabric.atlassian.net/wiki/spaces/E/pages/3237609689/Cubone+Mini+project+-+Copy+button+in+the+floating+toolbar
   * @see https://product-fabric.atlassian.net/browse/ED-15090
   * @default false
   */
  floatingToolbarCopyButton?: boolean;

  /**
   * @description
   * Use the linking platform link picker for link insertion and edit
   *
   * @see https://product-fabric.atlassian.net/wiki/spaces/EM/pages/3158246501/PP+Link+Picker+-+Standalone
   * @see https://product-fabric.atlassian.net/browse/EDM-2577
   * @default false
   */
  lpLinkPicker?: boolean;

  /**
   * @description
   * Show link settings button in the Floating toolbar
   *
   * @see https://product-fabric.atlassian.net/wiki/spaces/EM/pages/3199172609/POP+Some+users+need+to+work+with+URLs+to+get+their+job+done
   * @see https://product-fabric.atlassian.net/browse/EDM-3268
   * @default null
   */
  floatingToolbarLinkSettingsButton?: string;
};

export type FeatureFlagKey = keyof FeatureFlags;
export type GetEditorFeatureFlags = () => FeatureFlags;
