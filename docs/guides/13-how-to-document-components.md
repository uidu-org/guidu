---
title: Adding documentation
description: A guide to adding documentation to atlaskit.atlassian.com
---

# Adding documentation to atlaskit.atlassian.com

The documentation for a package on the `atlaskit.atlassian.com` website consists of three main parts; the main component page, possibly sub-pages, and examples pages. This document details how to write and format all of these so they are rendered correctly, as well as some information on the tools being used in the website.

## The Pages

### Main page
Exists: Always

#### Header
Header content is automatically generated. The links come from the package.json information, and extrapolating from them. The changelog info is pulled from the changelog md file at the package root. All packages have a link to examples.

- link to examples modal
- link to examples full-screen explorer
- install command
- npm link
- source link
- bundle unpkg link
- latest changelog
- button to full changelog explorer

#### Content
The main content below the header. This is pulled from a JS file exporting a react component. The first file found in the `docs` subdirectory of the component will be used for the main page.

We expect the main page to contain:

- A description of the component
- A simple example of how to use the component
- The props documentation.

Some components are either too complicated to explain all their concepts on a single docs page, or export enough components that each should be given their own page.

See information on the `docs/` folder below for information on how to create these.

### Sub-pages
Exists: As needed

Sub-pages within docs exist when a single document will be too unwieldy. Common reasons to use sub-pages are:

- Explicitly detail a concept that you will need to use the package effectively
- Call out and explain a common use-case that requires a particular pattern
- Details exports other than the default export of a package, so that it can be easily found

See information on the `docs/` folder below for information on how to create these.

### Examples (modal, explorer, isolated)
Exists: Always

Examples are displayed in three different formats:

- The examples modal which can be launched from the main docs page of a package. This is useful for quickly checking an example, and displays the other examples for the package in a sidebar of the modal. This examples is rendered in an iframe.
- The explorer, which is a full page, and has dropdowns for both the examples within this package, as well as switching which package you are seeing the examples for. This examples is rendered in an iframe.
- The 'isolated view', which renders the code for the example and nothing else. This allows you to look at the example without worrying other page elements may interfere with it. Some packages such as navigation may require looking at in an isolated view.

The modal and the explorer also contain links to view the file the example comes from, and to open the example in codesandboxer so it can be remixed.

## The docs/ folder

When generating the website, we look at every `.js` file in the docs folder for a package, and make a page on the website that renders the export of that file.

For example, a package folder that looks like:

```
/my-component
- package.json
- README.md
- docs/
	- 0-introduction.js
	- 1-complex-use-case.js

```

will generate two pages of documentation. The 'main' page of the documentation will be generated from the first file it finds, in this case, `my-component/docs/0-introduction.js`. The second docs file will create a sub-page named 'Complex Use Case'. Sup-pages strip trailing numbers but otherwise use the file's name to generate the name of the documentation page. We strip numbers so that you can use numbering to order your documentation pages.

Only `.js` files directly within the docs folder are used. Sub-directories are not added.


### Writing a file in docs

To allow maximum flexibility when writing your docs, we assume each files exports a react component which we will render, however to make writing these files simple for simple text, we are using [react-markings](https://github.com/Thinkmill/react-markings) filtered through `@atlaskit/docs` as a way to provide several helpers for writing docs files.

An average intro file may look something like this:

```
import { md, Props, Example } from '@atlaskit/docs'
import SpecialCustomThing from '../somwhere'

export default md`
# Hello

This markdown will be rendered to components. This makes writing the documentation contents easy.

## We can insert components into our markdown

If we want specific effects, we can always add react components:

${<SpecialCustomThing />}

## Main uses for adding components:

### Adding an inline example:

${<Example src="../examples/first-example.js" />}

### Adding prop definitions

${<Props src="../src/components/MainComponent.js"
 />}

${<Props
    props={require('!!extract-react-types-loader!../src/components/MainComponent.js')}
/>}
`
```
#### Documentation template

A documentation file template to use as a starter is available [here](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/docs/templates/0-intro-template.js).

An example file template to use as a starter is available [here](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/docs/templates/1-example-template.js).

#### What your documentation text should cover

#### How to use inline examples

Inline examples can be a good way to show off the component in action. When using inline examples a good guide is that you should:

- show simple examples to demonstrate the look and feel of the component.
- show the core of the component, not edge cases.

Opening the examples modal or page should be the best way to view the full range of options open to the component.

#### Correctly pointing your props imports

For a react component, props are its API, so documenting them is absolutely vital. Thankfully, we have a few open source packages that allow you to do this automagically.

Here is the magical invocation to use:

```
<Props
    props={require('!!extract-react-types-loader!../src/components/MainComponent.js')}
/>
```

To explain what we are doing, we have written two bits of software that combine to give you prop definitions on a page.

The first is [extract-react-types](https://github.com/atlassian/extract-react-types), which we are using a webpack loader of to create an object representation of the prop types of the react class from the targeted file.

The second is [pretty-proptypes](https://github.com/Noviny/pretty-proptypes), which is responsible for reading in this data. We export the `<Props />` from `@atlaskit/docs`, which is a re-exporting of the default export from `pretty-proptypes`.

For anything other than the standard use-case, see the pretty-proptypes docs.

## The examples folder

Every `.js` file in the examples folder is assumed to export a react component. each file uses its name, minus any initial numbers. As such, naming these files to be clear about their contents is vital to making useful examples.

Only `.js` files directly within the examples folder are used. Sub-directories are not added.

There are several different kinds of examples, which will have different use-cases, but all share some core principles.

Here is an example of a simple example file:

```js
// @flow
import React from 'react';
import Button, { ButtonGroup } from '../src';

export default () => (
  <ButtonGroup>
    <Button>First Button</Button>
    <Button>Second Button</Button>
    <Button>Button Tertius</Button>
    <Button>Fourth Button</Button>
  </ButtonGroup>
);

```

### Quick gotcha: pointing at src, not the component.

Because examples are written within the mono-repo, we point to the `../src` file to get the exports instead of `@atlaskit/packageName`. We correct this in the examples themselves. Pointing to the package as if it were an export will cause odd errors.

Pointing to `../src/` or `../src/index` will stop the path from being transformed. It should be explicitly `../src`.

### Keep the core logic in this file

On the website, the example file itself can be viewed in its entirety with a `view source` button. This allows developers using our examples to easily read and understand how something was implemented. While it may be tempting to extract repetitive code for your examples into helpers, this will hinder consumers understanding what your example does.

Any code that is needed to understand the example must be in the example's file. Extracting this defeats the purpose of an example.

Writing examples that can be copy/pasted is the gold standard, although not all examples need to be copy-pasted.

### Hide explanation text outside this file

Some examples are going to require explanations of what is occurring in them. A good pattern in this case is to split the example text out into its own file, to make it easy to read the example code. Example:

```jsx
import React, { Fragment } from 'react;
import Description from './utils/MyExampleDescription'
import Button from '../src'

export default () => (
	<Fragment>
		<Description />
		<Button>Example Button</Button
	<Fragment>
)
```

Be very careful when doing this. It should be possible to remove the description component and not change the usefulness of the code in rendering an example.

### Example code is an implicit recommendation on how to use the component

This is really important to state. When you write examples, you are making the code visible to consumers as written by the maintainers. The patterns you use here are likely to be reused within the system.

As such you should not just make sure the code is readable, but is code you would be comfortable seeing in an app. This is a very poor place to take shortcuts.

### Quick notes on kinds of examples

Examples serve several different use-cases. It is worth having in mind which kind of example you are writing, to tailor the user-experience of someone referencing the example.

#### Copyable examples

These are our main kind of examples, which are intended to be simple, and have very legible code. If they are related to a feature, they should be the simplest implementation of that feature with no bells or whistles.

#### Playgrounds

These are not designed to be copied, but are instead designed to show how props affect the components. These examples often feature several toggles or lists, or possibly tables showing different component states.

Playgrounds can be more complicated than copyable examples, but finding what each change is doing in the component should still be easy, so when the desired state is found, it can be easily extracted.

#### Edge Case Testing

With the removal of storybooks, there is a gap for having examples that are useful for us as component developers to make sure a particular case works. Edge case examples, while they are rendered on the website, are not intended to be used as examples. If you are making an edge case example, please leave comments in the code to indicate that this should not be used as a basis for consumers writing their own code.
