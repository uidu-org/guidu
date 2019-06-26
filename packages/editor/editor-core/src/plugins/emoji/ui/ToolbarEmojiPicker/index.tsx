import { EmojiPicker as AkEmojiPicker } from '@atlaskit/emoji/picker';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import { EmojiId } from '@atlaskit/emoji/types';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import { Popup } from '@uidu/editor-common';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent, ReactInstance } from 'react';
import * as ReactDOM from 'react-dom';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../components/ToolbarButton';
import { EmojiState } from '../../pm-plugins/main';
import { OuterContainer } from './styles';

export interface Props {
  isReducedSpacing?: boolean;
  isDisabled?: boolean;
  editorView: EditorView;
  pluginKey: PluginKey;
  emojiProvider: Promise<EmojiProvider>;
  /**
   * The number of secondary toolbar buttons between and including ToolbarEmojiPicker and the right edge of the editor
   * This must be passed in by the integrator (e.g. SecondaryToolbar) that contains the buttons
   * TODO: Implement a better solution as part of ED-2565
   */
  numFollowingButtons: number;
  popupsMountPoint?: HTMLElement | undefined;
  popupsBoundariesElement?: HTMLElement | undefined;
  popupsScrollableElement?: HTMLElement | undefined;
}

export interface State {
  button?: HTMLElement;
  disabled?: boolean;
  isOpen: boolean;
}

/**
 * Checks if an element is detached (i.e. not in the current document)
 */
const isDetachedElement = (el: HTMLElement) => !document.body.contains(el);

export default class ToolbarEmojiPicker extends PureComponent<Props, State> {
  private pickerRef?: ReactInstance;
  private buttonRef?: ToolbarButton | null;
  private pluginState?: EmojiState;

  state: State = {
    isOpen: false,
  };

  componentWillMount() {
    this.setPluginState(this.props);
  }

  componentDidMount() {
    this.state.button = this.buttonRef
      ? (ReactDOM.findDOMNode(this.buttonRef) as HTMLElement)
      : undefined;
    if (this.pluginState) {
      this.pluginState.subscribe(this.handlePluginStateChange);
    }
    // Keymapping must be added here at the document level as editor focus is lost
    // when the picker opens so plugins/emojis/keymaps.ts will not register ESC
    document.addEventListener('keydown', this.handleEscape);
  }

  componentWillReceiveProps(props: Props) {
    if (!this.pluginState && props.pluginKey) {
      this.setPluginState(props);
    }
  }

  componentDidUpdate() {
    const { button } = this.state;
    if (!button || !button.getBoundingClientRect().width) {
      this.state.button = this.buttonRef
        ? (ReactDOM.findDOMNode(this.buttonRef) as HTMLElement)
        : undefined;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
    if (this.pluginState) {
      this.pluginState.unsubscribe(this.handlePluginStateChange);
    }
  }

  handleEscape = (e: KeyboardEvent) => {
    // ESC key pressed
    if (this.state.isOpen && (e.which === 27 || e.keyCode === 27)) {
      this.close();
    }
  };

  private setPluginState(props: Props) {
    const { editorView, pluginKey } = props;

    if (!editorView) {
      return undefined;
    }

    const pluginState = pluginKey.getState(editorView.state);

    if (pluginState) {
      this.pluginState = pluginState;
      pluginState.subscribe(this.handlePluginStateChange);
      this.handlePluginStateChange(pluginState);
    }
  }

  private handlePluginStateChange = (pluginState: EmojiState) => {
    const disabled = !pluginState.isEnabled();
    const newState: any = {
      disabled,
    };
    if (disabled) {
      // Ensure closed if disabled, so it does reappear later
      newState.isOpen = false;
    }
    this.setState(newState);
  };

  private handleButtonRef = (ref: ToolbarButton | null): void => {
    this.buttonRef = ref;
  };

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  };

  private close = () => {
    this.setState({
      isOpen: false,
    });
  };

  private toggleOpen = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  };

  private handleClickOutside = (e: MouseEvent) => {
    if (!this.pickerRef) {
      return undefined;
    }
    const picker = ReactDOM.findDOMNode(this.pickerRef);
    // Ignore click events for detached elements.
    // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
    // still in the document, and one once it's detached. Does not always occur, and
    // may be a side effect of a react render optimisation
    if (
      !picker ||
      (e.target instanceof HTMLElement &&
        !isDetachedElement(e.target) &&
        !picker.contains(e.target))
    ) {
      this.close();
    }
  };

  private renderPopup() {
    const { disabled, isOpen, button } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      emojiProvider,
    } = this.props;
    if (disabled || !isOpen || !button) {
      return null;
    }

    return (
      <Popup
        target={button}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
      >
        <AkEmojiPicker
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
        />
      </Popup>
    );
  }

  render() {
    const { isDisabled, isReducedSpacing } = this.props;
    const { isOpen, disabled } = this.state;
    const toolbarButton = (
      <ToolbarButton
        selected={isOpen}
        disabled={disabled || isDisabled}
        onClick={this.toggleOpen}
        iconBefore={<EmojiIcon label="Emoji" />}
        ref={this.handleButtonRef}
        title="Emoji :"
        hideTooltip={isOpen}
        spacing={isReducedSpacing ? 'none' : 'default'}
      />
    );
    return (
      <OuterContainer width={isReducedSpacing ? 'large' : 'small'}>
        {toolbarButton}
        {this.renderPopup()}
      </OuterContainer>
    );
  }

  private handleSelectedEmoji = withAnalytics(
    'atlassian.editor.emoji.button',
    (emojiId: EmojiId): boolean => {
      if (this.state.isOpen && this.pluginState) {
        this.pluginState.insertEmoji(emojiId);
        this.close();
        return true;
      }
      return false;
    },
  );
}
