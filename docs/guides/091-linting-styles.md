# Linting Styles

Our [styled-components](https://www.styled-components.com) are now linted via [styledlint](https://stylelint.io/).

Linting not only keeps our styles consistent but also catches syntax errors such as invalid properties and missing semicolons, the latter of which will now cause styling bugs in styled components version 3.

## Usage

To lint your styled-components, run the following command:

```
bolt run lint:stylelint
```

Linting is also run as part of our CI build process.

### Vscode IDE support

A couple of steps are required to set linting integration within vscode.

1. Download the stylelint vscode extension: <https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint>
2. Add the following rules to your vscode workspace settings (or user settings if you prefer):
```
{
  "css.validate": false,
  "scss.validate": false,
  "stylelint.additionalDocumentSelectors": [
    "javascript",
    "javascriptreact",
    "typescript"
  ],
}
```
3. Reload your window

The additionalDocumentSelectors setting is required to make stylelint run in javascript and typescript files.

## Common linting issues

Below are some common linting issues that may be hard to track down due to minor issues with the [stylelint processor](https://github.com/styled-components/stylelint-processor-styled-components) we use for styled-components.

### Unknown word - CssSyntaxError

This error will most often be accompanied with a line number that is incorrect. The most likely cause for this will be non-primary/incorrect usage of the styled-components [css](https://www.styled-components.com/docs/api#css) helper function. 

Although styled-components will allow css tagged template literals to work in more places than they need to be used, the linter has trouble with this.

#### Option 1 - Change css body to declare property name and values
The linter requires the css function's template literal to contain both a property and a value rather than just a value.
For example,

```
const complexMixin = css`
  ${props => props.whiteColor ? 'white' : 'black'}
`;

const StyledComp = styled.div`
  /* This is an example of a nested interpolation */
  color: ${props => props.complex ? complexMixin : 'blue'};
`;
```

The `css` function only contains the color property value instead of both the property name and value.

This can be changed to:

```
const complexMixin = css`
  color: ${props => props.whiteColor ? 'white' : 'black'};
`;

const StyledComp = styled.div`
  /* This is an example of a nested interpolation */
  ${props => props.complex ? complexMixin : color: 'blue'}
`;
```

#### Option 2 - Remove redundant usages of css tagged template literal

As per the [docs](https://www.styled-components.com/docs/api#css), the function is only required when you're returning interpolations within interpolations where your nested interpolations are function definitions (that would automatically be called with props by styled-components).

If you either don't have nested interpolations or your interpolations are just primitive values like string or number, you can just use template literals instead of css tagged template literals.

For example, here we have a nested interpolation that is using the css function:

```
const previewWidth = 24;

const CardContent = styled.div`
   flex-grow: 1;
   max-width: ${({ hasPreview }) =>
    (hasPreview && css`calc(100% - ${previewWidth}px)`) || '100%'};
`;
```

The css tagged template literal doesn't have any function interpolations, it just has a primitive number.
Therefore, we can remove the css function and everything will work fine:

```
const previewWidth = 24;

const CardContent = styled.div`
   flex-grow: 1;
   max-width: ${({ hasPreview }) =>
    (hasPreview && `calc(100% - ${previewWidth}px)`) || '100%'};
`;
```

#### Option 3 - Remove css function and call the nested function interpolation directly

If it is not feasible to add the css property name to a nested template literal, you can remove css tagged template literal and call your function interpolations directly with the props from the parent function interpolation.

For example,

```
const keylineHeight = 24;

// keylineColor is a function expression
const keylineColor = themed(...);

const Header = styled.div`
  ...
  box-shadow: ${p =>
    p.showKeyline ? css`0 ${keylineHeight}px 0 0 ${keylineColor}` : 'none'};
  ...
`;
 ```

 Technically, the box-shadow declaration could be abstracted into a function which included the property name but lets pretend that we could not do that for some reason. Perhaps we just want inline arrow functions.

 We can change it to:

 ```
const Header = styled.div`
  ...
  box-shadow: ${p =>
    p.showKeyline ? `0 ${keylineHeight}px 0 0 ${keylineColor(p)}` : 'none'};
  ...
`;
 ```

 We're now just calling the keylineColor function directly with the props that were passed in to the outer function interpolation.


###  Missed semicolon CssSyntaxError

This error is pretty self-explanatory, a semi-colon is missing at the end of a css declaration. This will now result in malformed css in styled components >= 2 (until [this styled-components commit](https://github.com/styled-components/styled-components/commit/0fb244f9ac41505801ad817d89794ade355201af) is released so these need to be addressed.

However, sometimes the linting processor will give the wrong line number. In this case you'll have to manually look at the code below the reported line yourself.

### Misc

Sometimes when using interpolations for things like property names, the processor won't be able to tell what it is. The solution is to help the processor out by tagging your interpolations with some comments. More information about this is provided here: <https://www.styled-components.com/docs/tooling#interpolation-tagging>

E.g.

```
const direction = {
  horizontal: 'overflow-x',
  vertical: 'overflow-y',
  nested: 'overflow',
};

const Parent = styled.div`
  ${ p => direction[p.scroll]}: scroll;
`;
```

Here the linter will complain about an unexpected unknown property 'scroll'.
This can be fixed by adding an sc-prop comment:

```
const Parent = styled.div`
  ${/* sc-prop */ p => direction[p.scroll]}: scroll;
`;
```

## Disabling Rules

Stylelint rules can be disabled within css, see <https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#turning-rules-off-from-within-your-css>.

### Globally disabled rules

Some rules have been disabled via the stylelint-config-styled-components and stylelint-config-prettier plugins so they don't conflict with those two libraries.

We have also manually disabled some rules in our [.stylelintrc](../../.stylelintrc) that we thought didn't add value or would have required a lot of change to existing code.

Finally, some rules didn't work well with typescript so we have disabled them for now although they may be fixed in a future update, see <https://www.styled-components.com/docs/tooling#known-issues>.

