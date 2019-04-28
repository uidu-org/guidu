import * as React from 'react';
import Avatar from '@uidu/avatar';
import AvatarGroup from '@uidu/avatar-group';
import Tooltip from '@uidu/tooltip';
import Button from '@uidu/button';
import { ImageIcon } from '../ImageIcon';
import LinkGlyph from '@atlaskit/icon/glyph/link';
import { minWidth, maxWidth } from '../dimensions';
import { LozengeViewModel } from '../../common';
import { ExpandedFrame } from '../ExpandedFrame';
import AlertView from './AlertView';
import { PreviewView } from './PreviewView';
import Widgets from './Widgets';
import {
  maxAvatarCount,
  ContentWrapper,
  LeftWrapper,
  RightWrapper,
  Title,
  Byline,
  Description,
  Thumbnail,
  IconWrapper,
  UsersWrapper,
  ActionsWrapper,
  AlertWrapper,
} from './styled';
import Transition from './Transition';

export interface ContextViewModel {
  icon?: string;
  text: string;
}

export interface IconWithTooltip {
  url: string;
  tooltip?: string;
}

export interface TextWithTooltip {
  text: string;
  tooltip?: string;
}

export interface UserViewModel {
  icon?: string;
  name?: string;
  // in the future we might add other things supported by <Avatar/> e.g. href
}

export interface BadgeViewModel {
  value: number;
  max?: number;
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed'; // defaults to 'default'
}

export interface DetailViewModel {
  title?: string;
  icon?: string | React.ReactNode;
  badge?: BadgeViewModel;
  lozenge?: LozengeViewModel;
  text?: string;
  tooltip?: string;
}

export interface ActionHandlerCallbacks {
  pending: () => void;
  success: (message?: string) => void;
  failure: () => void;
}

export interface Action {
  id: string;
  text: string;
  handler: (callbacks: ActionHandlerCallbacks) => void;
}

export interface BlockCardResolvedViewProps {
  /** The context view model */
  context?: ContextViewModel;
  /** The link to display */
  link?: string;
  /** The optional con of the service (e.g. Dropbox/Asana/Google/etc) to display */
  icon?: IconWithTooltip | React.ReactNode;
  /** The user view model */
  user?: UserViewModel;
  /** The thumbnail to display */
  thumbnail?: string;
  /** The preview to display */
  preview?: string;
  /** The name of the resource */
  title?: TextWithTooltip;
  /** The line to display */
  byline?: TextWithTooltip | React.ReactNode;
  /** The description to display */
  description?: TextWithTooltip;
  /** The detail view model */
  details?: DetailViewModel[];
  /** An array of user */
  users?: UserViewModel[];
  /** An array of action */
  actions?: Action[];
  /** A flag that determines whether the card is selected in edit mode. */
  isSelected?: boolean;
  /** The optional click handler */
  onClick?: () => void;
}

export interface ResolvedViewState {
  lastFailedAction?: Action;
  pendingActionsById: { [id: string]: boolean };
  alert?: {
    type: 'success' | 'failure';
    text: string;
  };
}

function getActionPendingState(
  action: Action,
): (state: ResolvedViewState) => Pick<ResolvedViewState, 'pendingActionsById'> {
  return state => ({
    pendingActionsById: {
      ...state.pendingActionsById,
      [action.id]: true,
    },
  });
}

function getActionSuccessState(
  action: Action,
  message?: string,
): (
  state: ResolvedViewState,
) => Pick<ResolvedViewState, 'pendingActionsById' | 'alert'> {
  return state => ({
    pendingActionsById: {
      ...state.pendingActionsById,
      [action.id]: false,
    },
    alert: message
      ? {
          type: 'success',
          text: message,
        }
      : state.alert,
  });
}

function getActionFailureState(
  action: Action,
  message?: string,
): (
  state: ResolvedViewState,
) => Pick<
  ResolvedViewState,
  'pendingActionsById' | 'lastFailedAction' | 'alert'
> {
  return state => ({
    lastFailedAction: action,
    pendingActionsById: {
      ...state.pendingActionsById,
      [action.id]: false,
    },
    alert: message
      ? {
          type: 'failure',
          text: message,
        }
      : state.alert,
  });
}

function clearActionSuccessState(): Pick<ResolvedViewState, 'alert'> {
  return {
    alert: undefined,
  };
}

function clearActionFailureState(): Pick<
  ResolvedViewState,
  'lastFailedAction' | 'alert'
> {
  return {
    lastFailedAction: undefined,
    alert: undefined,
  };
}

export class BlockCardResolvedView extends React.Component<
  BlockCardResolvedViewProps,
  ResolvedViewState
> {
  state: ResolvedViewState = {
    pendingActionsById: {},
  };

  alertTimeout?: number;

  /* prevent the parent link handler from opening a URL when clicked */
  handleAvatarClick = ({ event }: { event: React.MouseEvent }) => {
    event.preventDefault();
    event.stopPropagation();
  };

  /* prevent the parent link handler from opening a URL when clicked */
  /* NOTE: this prevents the dropdown from showing with more items */
  handleMoreAvatarsClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  getActionHandlerCallbacks(action: Action) {
    return {
      pending: () => this.setState(getActionPendingState(action)),
      success: (message?: string) => {
        this.setState(getActionSuccessState(action, message), () => {
          // hide the alert after 2s
          this.alertTimeout = window.setTimeout(
            () => this.setState(clearActionSuccessState()),
            2000,
          );
        });
      },
      failure: () =>
        this.setState(getActionFailureState(action, 'Something went wrong.')),
    };
  }

  createActionHandler = (action: Action) => {
    return (event: React.MouseEvent) => {
      /* prevent the parent handler from opening a URL when clicked */
      event.preventDefault();
      event.stopPropagation();

      // prevent the next alert from being cleared by any previous success alerts that haven't already been cleared
      if (this.alertTimeout) {
        clearTimeout(this.alertTimeout);
      }

      // handle the action
      action.handler(this.getActionHandlerCallbacks(action));
    };
  };

  handleActionRetry = () => {
    const { lastFailedAction } = this.state;
    if (lastFailedAction) {
      lastFailedAction.handler(
        this.getActionHandlerCallbacks(lastFailedAction),
      );
    }
  };

  handleActionDismis = () => {
    this.setState(clearActionFailureState());
  };

  componentWillUnmount() {
    // prevent the alert from being cleared and unmounted
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }
  renderIcon() {
    const { icon } = this.props;

    if (!icon) {
      return null;
    }

    if ((icon as IconWithTooltip).url) {
      // TODO: handle if there is an error loading the image -> show the placeholder
      return (
        <IconWrapper>
          <Tooltip content={(icon as IconWithTooltip).tooltip}>
            <ImageIcon src={(icon as IconWithTooltip).url} size={24} />
          </Tooltip>
        </IconWrapper>
      );
    }

    return icon;
  }

  renderThumbnail() {
    const { thumbnail } = this.props;

    if (!thumbnail) {
      return null;
    }

    // TODO: handle if there is an error loading the image -> show the placeholder
    return <Thumbnail src={thumbnail} />;
  }

  renderUser() {
    const { user } = this.props;

    if (!user) {
      return null;
    }

    return <Avatar size="medium" src={user.icon} name={user.name} />;
  }

  renderUsers() {
    const { users = [] } = this.props;

    if (users.length === 0) {
      return null;
    }

    return (
      <UsersWrapper>
        <AvatarGroup
          maxCount={maxAvatarCount}
          appearance="stack"
          size="small"
          data={users.map(user => ({
            name: user.name,
            src: user.icon,
            size: 'small',
          }))}
          onAvatarClick={this.handleAvatarClick}
          onMoreClick={this.handleMoreAvatarsClick}
        />
      </UsersWrapper>
    );
  }

  renderActions() {
    const { actions = [] } = this.props;
    const { alert, pendingActionsById } = this.state;

    if (!actions.length) {
      return null;
    }

    const isAnyActionFailed = alert && alert.type === 'failure';

    return (
      <ActionsWrapper>
        {actions.slice(0, 3).map(action => {
          const { id, text } = action;
          const isPending = pendingActionsById[id];
          return (
            <Button
              key={id}
              spacing="compact"
              isDisabled={isPending || isAnyActionFailed}
              isLoading={isPending}
              onClick={this.createActionHandler(action)}
            >
              {text}
            </Button>
          );
        })}
      </ActionsWrapper>
    );
  }

  renderAlert() {
    const { alert } = this.state;
    return (
      <AlertWrapper>
        <Transition
          enter={['fade', 'slide-up']}
          exit={['fade', 'slide-down']}
          timeout={300}
        >
          {alert ? (
            <AlertView
              type={alert.type === 'success' ? 'success' : 'failure'}
              text={alert.text}
              onRetry={this.handleActionRetry}
              onDismis={this.handleActionDismis}
            />
          ) : null}
        </Transition>
      </AlertWrapper>
    );
  }

  renderWithToolTip(Elem: any, model: { text: string; tooltip?: string }) {
    if (model.tooltip) {
      return (
        <Tooltip content={model.tooltip}>
          <Elem>{model.text}</Elem>
        </Tooltip>
      );
    } else {
      return <Elem>{model.text}</Elem>;
    }
  }

  render() {
    const {
      link,
      context,
      title,
      byline,
      description,
      icon,
      user,
      preview,
      details,
      onClick,
      isSelected,
    } = this.props;
    return (
      <ExpandedFrame
        minWidth={minWidth}
        maxWidth={maxWidth}
        isSelected={isSelected}
        href={link}
        icon={
          <ImageIcon
            src={context && context.icon}
            default={<LinkGlyph label="icon" size="small" />}
          />
        }
        text={context && context.text}
        onClick={onClick}
      >
        {preview && <PreviewView url={preview} />}
        <ContentWrapper>
          {this.renderAlert()}
          {(icon || user) && (
            <LeftWrapper>
              {this.renderIcon()}
              {!icon && this.renderUser()}
            </LeftWrapper>
          )}
          <RightWrapper>
            {this.renderThumbnail()}
            {title && title.text && this.renderWithToolTip(Title, title)}
            {!byline ? null : !(byline as TextWithTooltip).text ? (
              <Byline>{byline}</Byline>
            ) : (
              this.renderWithToolTip(Byline, byline as TextWithTooltip)
            )}
            {description &&
              description.text &&
              this.renderWithToolTip(Description, description)}
            <Widgets details={details} />
            {this.renderUsers()}
            {this.renderActions()}
          </RightWrapper>
        </ContentWrapper>
      </ExpandedFrame>
    );
  }
}
