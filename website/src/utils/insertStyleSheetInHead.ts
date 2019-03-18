/**
 * This will insert the reset styles as first in the head ( fallback to body if head is not available ).
 * We need to do this because css-reset is a js file now which gives us all the reset styles in string format
 * and thus we need to insert them as styles manually.
 * We cannot use injectGlobal from styled components as it inserts styles at the end of head which defeats the
 * purpose of styles component
 */
export default function insertStyleSheetInHead(cssResetStyles: string) {
  const parentElement = document.head || document.body;
  if (parentElement) {
    const insertBeforeElement =
      document.getElementsByTagName('style')[0] || parentElement.firstChild;

    const style = document.createElement('style');
    style.innerHTML = cssResetStyles;
    parentElement.insertBefore(style, insertBeforeElement);
  }
}
