import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import DropdownMenu, { DropdownItem } from '@uidu/dropdown-menu';
import AnnotateIcon from '@atlaskit/icon/glyph/media-services/annotate';
import CrossIcon from '@atlaskit/icon/glyph/cross';

import {
  CardActionsView,
  CardActionIconButton,
  CardActionsDropdownMenu,
} from '../../cardActions';
import { CardActionButton } from '../../cardActions/styled';
import { CardAction } from '../../../actions';
import PreventClickThrough from '../../preventClickThrough';

describe('CardActions', () => {
  const openAction = {
    label: 'Open',
    handler: jest.fn(),
  };
  const closeAction = {
    label: 'Close',
    handler: jest.fn(),
  };
  const annotateAction = {
    label: 'Annotate',
    handler: jest.fn(),
    icon: <AnnotateIcon size="small" label="annotate" />,
  };
  const deleteAction = {
    label: 'Delete',
    handler: jest.fn(),
    icon: <CrossIcon size="small" label="delete" />,
  };

  const menuActions = [openAction, closeAction, annotateAction, deleteAction];

  const openDropdownMenuIfExists = (card: ReactWrapper) => {
    const dropdownMenu = card.find(DropdownMenu);
    if (dropdownMenu.length > 0) {
      dropdownMenu.find(CardActionButton).simulate('click');
    }
  };

  const setup = (actions: CardAction[], triggerColor?: string) => {
    const card = mount(
      <CardActionsView actions={actions} triggerColor={triggerColor} />,
    );
    openDropdownMenuIfExists(card);

    const iconButtons = card.find(CardActionIconButton);
    const dropdownMenu = card.find(CardActionsDropdownMenu);
    const dropdownItems = dropdownMenu.find(DropdownItem);

    return {
      card,
      iconButtons,
      dropdownMenu,
      dropdownItems,
    };
  };

  it('should render nothing given no actions', () => {
    const { card } = setup([]);

    expect(card.find(PreventClickThrough)).toHaveLength(0);
  });

  /* Disabled because Dropdown now defers rendering children until layer is positioned. Integration test will replace these https://ecosystem.atlassian.net/browse/AK-5183
  it('should render only dropdown menu given one action with no icon', () => {
    const { iconButtons, dropdownMenu, dropdownItems } = setup([openAction]);

    expect(iconButtons).toHaveLength(0);
    expect(dropdownMenu).toHaveLength(1);
    expect(dropdownItems).toHaveLength(1);
    expect(dropdownItems.prop('children')).toEqual(openAction.label);

    expect(openAction.handler).not.toHaveBeenCalled();
  });

  it('should render only dropdown menu given multiple actions with no icon', () => {
    const { iconButtons, dropdownMenu, dropdownItems } = setup([
      openAction,
      closeAction,
    ]);

    expect(iconButtons).toHaveLength(0);
    expect(dropdownMenu).toHaveLength(1);
    expect(dropdownItems).toHaveLength(2);
  });
  */
  it('should render only icon button given one action with an icon', () => {
    const triggerColor = 'some-trigger-color';
    const { iconButtons, dropdownMenu, dropdownItems } = setup(
      [annotateAction],
      triggerColor,
    );

    expect(iconButtons).toHaveLength(1);
    const actionButton = iconButtons.find(CardActionButton);
    expect(actionButton.find(AnnotateIcon)).toHaveLength(1);
    expect(actionButton.prop('style')).toEqual({ color: triggerColor });
    expect(dropdownMenu).toHaveLength(0);
    expect(dropdownItems).toHaveLength(0);
  });

  it('should render two icon button given two actions with an icon', () => {
    const { iconButtons, dropdownMenu, dropdownItems } = setup([
      annotateAction,
      deleteAction,
    ]);

    expect(iconButtons).toHaveLength(2);
    expect(dropdownMenu).toHaveLength(0);
    expect(dropdownItems).toHaveLength(0);
  });

  /* Disabled because Dropdown now defers rendering children until layer is positioned. Integration test will replace these https://ecosystem.atlassian.net/browse/AK-5183
  it('should render one icon button and a dropdown menu given more than two actions', () => {
    const { iconButtons, dropdownMenu, dropdownItems } = setup(menuActions);

    expect(iconButtons).toHaveLength(1);
    expect(dropdownMenu).toHaveLength(1);
    expect(dropdownItems).toHaveLength(3);
  });
  */

  it('should call onToggle callback when dropdown menu trigger is clicked', () => {
    const onToggle = jest.fn();
    const card = mount(
      <CardActionsView actions={menuActions} onToggle={onToggle} />,
    );

    card
      .find(DropdownMenu)
      .find(CardActionButton)
      .simulate('click');

    expect(onToggle).toHaveBeenCalled();
  });

  it('should call action handler when icon button is pressed', () => {
    const triggerColor = 'some-color-string';
    const { iconButtons } = setup([annotateAction], triggerColor);

    iconButtons.simulate('click');

    expect(annotateAction.handler).toHaveBeenCalled();
  });
  /* Disabled because Dropdown now defers rendering children until layer is positioned. Integration test will replace these https://ecosystem.atlassian.net/browse/AK-5183
  it('should call action handler when item is pressed', () => {
    const triggerColor = 'some-color-string';
    const { dropdownItems } = setup([openAction], triggerColor);

    dropdownItems.simulate('click');

    expect(openAction.handler).toHaveBeenCalled();
  });
  */

  it('should pass supplied trigger color to dropdown menu trigger when there are multiple actions', () => {
    const triggerColor = 'some-color-string';
    const { dropdownMenu } = setup(menuActions, triggerColor);
    const trigger = dropdownMenu.find(CardActionButton);

    expect(trigger.prop('style')).toMatchObject({ color: triggerColor });
  });

  it('should pass supplied trigger color to delete button when there is a single action', () => {
    const triggerColor = 'some-color-string';
    const { iconButtons } = setup([deleteAction], triggerColor);

    expect(iconButtons.prop('triggerColor')).toEqual(triggerColor);
  });
});
