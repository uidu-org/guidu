import { ActivityProvider } from '@atlaskit/activity';
import {
  ContextIdentifierProvider,
  ErrorReportingHandler,
  ExtensionHandlers,
  ExtensionProvider,
  Providers,
  Transformer,
} from '@uidu/editor-common';
import { MentionProvider } from '@uidu/mentions';
import { TaskDecisionProvider } from '@uidu/task-decision';
import { Node, Schema } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { ReactElement } from 'react';
import EditorActions from '../actions';
import { AnalyticsHandler } from '../analytics/handler';
import { AnnotationProvider } from '../plugins/annotation/types';
import { CardOptions } from '../plugins/card/types';
import { CollabEditOptions } from '../plugins/collab-edit/types';
import { MediaOptions, MediaState } from '../plugins/media/types';
import { QuickInsertOptions } from '../plugins/quick-insert/types';
import { TextFormattingOptions } from '../plugins/text-formatting/types';
import { MenuItem } from '../ui/DropdownMenu/types';
import { EditorAppearance } from './editor-appearance';
import { EditorOnChangeHandler } from './editor-onchange';
import { EditorPlugin } from './editor-plugin';

export type ReactComponents = ReactElement<any> | ReactElement<any>[];

export type FeedbackInfo = {
  product?: string;
  packageVersion?: string;
  packageName?: string;
  labels?: Array<string>;
};

export interface EditorProps {
  /*
  Configure the display mode of the editor. Different modes may have different feature sets supported.

  - `comment` - should be used for things like comments where you have a field input but require a toolbar & save/cancel buttons
  - `full-page` - should be used for a full page editor where it is the user focus of the page
  - `chromeless` - is essentially the `comment` editor but without the editor chrome, like toolbar & save/cancel buttons
  - `mobile` - should be used for the mobile web view. It is a full page editor version for mobile.
  */
  appearance?: EditorAppearance;
  children?: (editorProps) => any;
  containerElement?: HTMLElement | undefined;
  // Legacy analytics support handler, which will be removed soon. **Do not use**.
  analyticsHandler?: AnalyticsHandler;

  contentComponents?: ReactComponents;
  primaryToolbarComponents?: ReactComponents;
  secondaryToolbarComponents?: ReactComponents;

  // Plugins
  plugins?: (EditorPlugin[] | EditorPlugin)[];

  // Set to enable the quick insert menu i.e. '/' key trigger.
  // You can also provide your own insert menu options that will be shown in addition to the enabled
  // editor features e.g. Confluence uses this to provide its macros.
  quickInsert?: QuickInsertOptions;

  UNSAFE_cards?: CardOptions;

  allowExpand?:
    | boolean
    | { allowInsertion?: boolean; allowInteractiveExpand?: boolean };

  // Submits on the enter key. Probably useful for an inline comment editor use case.
  saveOnEnter?: boolean;

  // Set if the editor should be focused.
  shouldFocus?: boolean;

  // Set if the editor should be disabled.
  disabled?: boolean;

  // Content to appear in the context panel. Displays as a right sidebar in the full-page appearance.
  // You'll want to pass it a `ContextPanel` component from this package, and your content as its children.
  contextPanel?: ReactComponents;

  errorReporterHandler?: ErrorReportingHandler;
  uploadErrorHandler?: (state: MediaState) => void;

  activityProvider?: Promise<ActivityProvider>;

  annotationProvider?: AnnotationProvider;

  collabEditProvider?: Providers['collabEditProvider'];
  presenceProvider?: Promise<any>;
  emojiProvider?: Providers['emojiProvider'];
  taskDecisionProvider?: Promise<TaskDecisionProvider>;
  allowNestedTasks?: boolean;
  contextIdentifierProvider?: Promise<ContextIdentifierProvider>;

  legacyImageUploadProvider?: Providers['imageUploadProvider'];
  mentionProvider?: Promise<MentionProvider>;

  // Allows you to define custom autoformatting rules.
  autoformattingProvider?: Providers['autoformattingProvider'];

  // This is temporary for Confluence. **Please do not use**.
  macroProvider?: Providers['macroProvider'];

  // Set if you want to wait for media file uploads before save.
  waitForMediaUpload?: boolean;
  contentTransformerProvider?: (schema: Schema) => Transformer<string>;

  // Set to configure media features. Media single refers to the embedded version of media,
  // which is probably what you want. Media group refers to a filmstrip, thumbnail view of media files which was used in Stride.
  media?: MediaOptions;
  collabEdit?: CollabEditOptions;

  // Set to disable text formatting styles. If not specified, they will be all enabled by default. Code here refers to inline code.
  // Smart text completion refers to the auto replacement of characters like arrows, quotes and correct casing of Atlassian product names.
  // This should only be disabled if the user has an OS setting that disables this.
  textFormatting?: TextFormattingOptions;

  // Set to configure the maximum editor height in pixels for `comment`, `chromeless` and `mobile` editor modes.
  maxHeight?: number;

  // Set to configure the maximum ADF node document size.
  // Understandably this isn’t the best logical max parameter for content, but its the cheapest for now.
  maxContentSize?: number;

  // Default placeholder text to be displayed if the document content is empty. e.g. 'Add a comment...'
  placeholder?: string;

  // Default placeholder text to be displayed if line is empty but the document content is not. e.g. 'Type / to insert content'
  placeholderHints?: string[];

  // Default placeholder text to be displayed when a bracket '{' is typed and the line is empty e.g. 'Did you mean to use '/' to insert content?'
  placeholderBracketHint?: string;

  // Set the default editor content.
  defaultValue?: Node | string | Object;

  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;

  // Set to add custom menu items to the insert (plus) menu dropdown.
  insertMenuItems?: MenuItem[];
  editorActions?: EditorActions;

  // Set a callback for the editor when users are able to interact.
  // Also provides access to `EditorActions` for controlling editor.
  onEditorReady?: (editorActions: EditorActions) => void;

  // Called when editor is being unmounted
  onDestroy?: () => void;

  // Set for an on change callback.
  // `meta.source === 'remote'` means that a change is coming from remote source, e.g. collab editing session.
  onChange?: EditorOnChangeHandler;

  // Set for an on save callback.
  onSave?: (editorView: EditorView) => void;

  // Set for an on cancel callback.
  onCancel?: (editorView: EditorView) => void;

  // Set to provide your extensions handlers.
  extensionHandlers?: ExtensionHandlers;

  // Flag to remove private content such as mention names
  sanitizePrivateContent?: boolean;

  // flag to indicate display name instead of nick name should be inserted for mentions
  // default: false, which inserts the nick name
  mentionInsertDisplayName?: boolean;

  // The nth keystroke after which an input time taken event is sent, 0 to disable it
  // default: 100
  inputSamplingLimit?: number;

  // New extension API
  // This eventually is going to replace `quickInsert.provider`, `extensionHandlers`, `macroProvider`.
  extensionProviders?: Array<ExtensionProvider>;

  // Control transaction tracking
  // default:
  // {
  //   enabled: false,
  //   countNodes: true,
  //   samplingRate: 100,
  //   slowThreshold: 300,
  //   slowOutlierThreshold: 3,
  //   pluginMethodThreshold: 1,
  //   outlierFactor: 3
  // }
  transactionTracking?: {
    // Wether transactionTracking should be enabled
    // default: false
    enabled: boolean;

    // The nth transaction after which a `dispatchTransaction` event is sent.
    // default: 100
    samplingRate?: number;

    // Transactions that need longer to dispatch than this generate a `dispatchTransaction` event
    // unit: ms
    // default: 300
    slowThreshold?: number;

    // Transactions that need longer to dispatch than AND have outlier plugins
    // generate a `dispatchTransaction` event
    // unit: ms
    // default: 30
    outlierThreshold?: number;

    // The factor by which statistically significant outliers in plugin execution times are computed
    // where t = p75 + (p75 - p25) * outlierFactor
    // minor outliers: 1.5
    // majour outliers: 3.0
    // default: 3
    outlierFactor?: number;
  };
}
