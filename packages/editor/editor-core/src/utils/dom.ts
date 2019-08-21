/**
 * Walks a DOM tree up to the provided `stopElement`, or if falsy before.
 * @param element
 * @param stopElement
 */
export function walkUpTreeUntil(
  element: HTMLElement,
  stopElement: HTMLElement,
) {
  let rootElement = element;
  while (
    rootElement &&
    rootElement.parentElement &&
    rootElement.parentElement !== stopElement
  ) {
    rootElement = rootElement.parentElement;
  }

  return rootElement;
}
