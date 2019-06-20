import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const GUTTER_SIZE_IN_PX = 120; // Gutter size

/**
 * Create a gutter that can be added or removed it from the dom
 */
function createGutter() {
  const $gutter = document.createElement('div');
  $gutter.style.paddingBottom = `${GUTTER_SIZE_IN_PX}px`;
  let mounted = false;
  let currentParent: HTMLElement | null = null;
  return {
    addGutter(parent: HTMLElement) {
      if (parent) {
        currentParent = parent;
        parent.appendChild($gutter);
        mounted = true;
      }
    },
    removeGutter() {
      if (currentParent && mounted) {
        mounted = false;
        currentParent.removeChild($gutter);
      }
    },
    isMounted() {
      return mounted;
    },
  };
}

/**
 * Get caret top position given the current selection,
 * use start container position as fallback
 */
function getCaretTopPosition(): number | undefined {
  const windowSelection = window.getSelection();
  if (windowSelection && windowSelection.rangeCount > 0) {
    const range = windowSelection.getRangeAt(0);
    if (range) {
      const clientRects = range.getClientRects();
      // Return client rects
      if (clientRects && clientRects.length > 0) {
        return clientRects[0].top;
      }

      // Return container top
      const container = range.startContainer as HTMLElement;
      if (container && container.getBoundingClientRect) {
        return container.getBoundingClientRect().top;
      }
    }
  }
  return undefined;
}

export default () => {
  const gutter = createGutter();

  return new Plugin({
    view(view: EditorView) {
      let currentCaretPosition: number | undefined;
      return {
        update() {
          if (!view.state.selection.empty) {
            return undefined; // We dont handle selection
          }

          const { dom: editorRootDom } = view;
          const scrollContainer = (editorRootDom as HTMLElement)
            .offsetParent as HTMLElement;

          if (scrollContainer) {
            const {
              scrollTop: scrollContainerTop,
              offsetHeight: scrollContainerOffsetHeight,
            } = scrollContainer;

            const {
              top: scrollContainerTopPosition,
            } = scrollContainer.getBoundingClientRect();

            // Check if the content is higher enough, if not return
            const {
              height: editorRootHeight,
            } = editorRootDom.getBoundingClientRect();

            // We need to check if the current editor has enough content, if we dont do this we well force a scroll on a empty document.
            const currentContentIsHigherEnough =
              editorRootHeight + GUTTER_SIZE_IN_PX >=
              scrollContainerOffsetHeight;

            if (!currentContentIsHigherEnough) {
              gutter.removeGutter();
              return undefined;
            }

            // Check if cursor position
            const lastCaretPosition = currentCaretPosition;
            const caretTopPosition = getCaretTopPosition();
            if (!caretTopPosition) {
              return undefined;
            }

            currentCaretPosition = caretTopPosition + scrollContainerTop;

            // If I dont have caret position cannot detect right behavior
            if (!lastCaretPosition || !currentCaretPosition) {
              return undefined;
            }

            // If last caret position is higher that current, means that is going upward, so we do nothing
            if (lastCaretPosition >= currentCaretPosition) {
              return undefined;
            }

            const caretTopFromContainer =
              caretTopPosition - scrollContainerTopPosition;

            // Check if scroll is in the right position,
            // Caret position should be between end of the page and expected gutter
            const scrollIsInValidRange =
              scrollContainerOffsetHeight <=
                caretTopFromContainer + GUTTER_SIZE_IN_PX &&
              scrollContainerOffsetHeight > caretTopFromContainer;
            if (!scrollIsInValidRange) {
              return undefined;
            }

            if (!gutter.isMounted()) {
              gutter.addGutter(editorRootDom.parentElement!);
            }

            // If I reach here is because I should scroll to expected position from caret
            scrollContainer.scrollTop =
              scrollContainerTop +
              GUTTER_SIZE_IN_PX -
              scrollContainerOffsetHeight +
              caretTopFromContainer;
          }
        },
      };
    },
  });
};
