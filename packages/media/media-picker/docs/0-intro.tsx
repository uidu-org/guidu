import * as React from 'react';
import { md, code, Example } from '@uidu/docs';

import dropzone from './dropzone.png';
import browser from './browser.png';
import popup from './popup.png';

const CreateImage = (filename: string) => <img src={filename} />;

export default md`
  # Documentation

  ## Table of contents

  - [Working with the Library](#working-with-the-library)
  - [Arguments](#arguments)
  - [Component Creation](#component-creation)
  - [Typescript](#typescript)
  - [Events](#events)
  - [Components](#components)
    - [Dropzone](#dropzone)
    - [Clipboard](#clipboard)
    - [Browser](#browser)
    - [Binary](#binary)
    - [Popup](#popup)

  <a name="working-with-the-library"></a>
  ## Working with the Library

  MediaPicker library is the composition of different components. All of the components have the same interface.

  Let's take the **Browser** component as an example and see how to write a simple file uploading app around it.
  The easiest integration may look like this:


  ${code`import { MediaPicker } from '@uidu/media-picker';

  const authProvider = (context) => Promise.resolve({
    clientId: 'your-app-client-id',
    token: 'your-generated-token',
    baseUrl: 'https://media-api.atlassian.io'
  });

  const context = ContextFactory.create({authProvider});

  const browser = MediaPicker('browser', context);
  browser.on('upload-end', payload => {console.log(payload.public)});

  ...

  browser.browse();
`}

  This little app will let the user browse a file on his hard drive and upload it by clicking the button.
  The upload-end event provides the file selected/uploaded, with a new public id.
  You can read more detailed documentation of the MediaPickerBrowser component below.

  ---
  <a name="arguments"></a>
  ## Arguments

  There are two required and 1 optional arguments:

  ${code`const browser = MediaPicker(typeOfPicker, context, config);`}

  ### Type of picker

  First argument is a <_string_>. It defined what kind of picker will be created:

  - **binary**: allows you to upload object of type File
  - **browser**: will open browser default file dialog for user to choose file from
  - **clipboard**: allows user to paste a file from clipboard
  - **dropzone**: allows user to drag and drop a file
  - **popup**: will open a custom rich user experience for picking file from multiple sources

  ### Context object

  Second argument is all about providing authentication. To create object of this type special factory
  needs to be used:


  ${code`const context = ContextFactory.create({
    authProvider, // Required property. See bellow
    userAuthProvider, // Optional property. Required if popup type is chosen.
    cacheSize  // Optional property. Number of items cached. Default ios 200
  });`}

  authProvider and userAuthProvider are of type <_[AuthProvider](./authProvider.md)_>

  ### Config object

  Third is an optional parameter where you can configure some of the parameters:

  ---
  <a name="components-creation"></a>
  ## Component creation

  All MediaPicker components are created the same way. The first parameter is always the name of the component,
  the second is the general MediaPicker context and the third is the component-specific config

 ${code`
  const dropzone = MediaPicker('dropzone', context, {
    container: document.body,
  });
  `}

  Please note that you don't need to specify the **new** keyword before creating a component.
  MediaPicker will do it internally.

  #### Typescript

  MediaPicker is fully written in Typescript, and it exports all its public types and interfaces.
  We refer to some of those objects in the docs, if you want to know more about those please have a look into:

  - media-picker/src/domain
  - media-picker/popup/src/domain

  <a name="events"></a>
  ## Events

  All MediaPicker components are emitting the same set of generic events. It doesn't matter whether file was uploaded from the local drive or picked from Dropbox — all the following events will be emitted in the same way.

  ### Events

  #### uploads-start _{file: MediaFile[]}_

  Emitted when uploads have started

  #### upload-preview-update _{file: MediaFile, preview: Preview}_

  Emitted when MediaPicker has a preview. Will not be raised if a preview could not be generated,
  therefore preview will always have a value.

  #### upload-status-update _{file: MediaFile, progress: MediaProgress}_

  Emitted when upload is in action

  #### upload-processing _{file: MediaFile}_

  Emitted when server got all the chunks and started to process the file

  #### upload-end _{file: MediaFile, public: &lt;the object returned by fileStore get method&gt;}_

  Emitted when server finished processing file and made it available to download

  #### upload-error _{error: MediaError}_

  Emitted if library got an error it can not recover from

 ${code`
  browser.on('upload-end', payload => {
    console.log(payload.public);
  });
  `}

  <a name="components"></a>
  ## Components

  <a name="dropzone"></a>
  ### Dropzone

  Allows user to drag & drop files into the page. Has a design first seen in [https://enso.me/](Enso).

  ${CreateImage(dropzone)}

  #### Usage

 ${code`
  const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: 'your-app-client-id',
        token: 'your-generated-token',
        baseUrl: 'https://media-api.atlassian.io',
      }),
  });

  const dropzone = MediaPicker('dropzone', context, {
    container: document.getElementById('container'),
  });
  dropzone.on('upload-end', payload => {
    console.log(payload.public);
  });
  dropzone.activate();
  `}

  #### Additional parameters

  **container?** <_HTML Element | JQuery Selector_> —
  Element where the popup should be placed. The default value is the document Body.

  **headless?** <_boolean_> — If true, no UI will be shown. The integrator should listen
  to drag-enter and drag-leave events to show custom UI.

  #### Methods

  **activate()** — Activates the dropzone

  **deactivate()** — Make container ignore the dragged & dropped files

  #### Dropzone Events

  **drag-enter** <_{ length: number }_> — Emitted when user dragged file over the container and
  contains the number of dragged files

  > Special cases

  - This event doesn't support dragged directories, it will return 1 as length.
  - IE11 and Safari don't return the number of dragged items. This will return 0 as length.

  **drag-leave** <_{ }_> — Emitted when user moved file away from the container

  **_drop_** <_{ }_> — Emitted when user dropped a file

  > Special cases

  - IE11: doesn't upload files when a folder is dropped.
  - Firefox: doesn't upload files recursively within a folder.

  ---
  <a name="clipboard"></a>
  ### Clipboard

  Allows a user to paste files from the clipboard. You can try this feature in project.

  #### Usage

 ${code`
  const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: 'your-app-client-id',
        token: 'your-generated-token',
        baseUrl: 'https://media-api.atlassian.io',
      }),
  });

  const clipboard = MediaPicker('clipboard', context);
  clipboard.on('upload-end', payload => {
    console.log(payload.public);
  });
  clipboard.activate();
  `}

  #### Methods

  **activate()** — Start listen to clipboard events

  **deactivate()** — Stop listen to clipboard events

  ---
  <a name="browser"></a>
  ### Browser

  Opens native Operating System file browser window.

  ${CreateImage(browser)}

  #### Usage

  ${code`const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: 'your-app-client-id',
        token: 'your-generated-token',
        baseUrl: ''https://media-api.atlassian.io'
      }),
  });

  const browserConfig = {
    multiple: true,
    fileExtensions: ['.jpg'],
  };

  const browser = MediaPicker('browser', context, browserConfig);
  browser.on('upload-end', payload => {
    console.log(payload.public);
  });

  browser.browse();
  `}

  #### Additional parameters

  **multiple?** <_boolean_> —
  Defines whether client app accepts multiple files. The default value is true.

  **fileExtensions?** <_array<*string*>_> —
  An array of allowed file extensions. All extensions are allowed by default.

  #### Methods

  **browse()** — Open a dialog with the files on the local drive. Allows multiple file uploads.

  ---
  <a name="binary"></a>
  ### Binary

  Allows client app to upload a file without user interaction.

  #### Usage

  ${code`const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: 'your-app-client-id',
        token: 'your-generated-token',
        baseUrl: ''https://media-api.atlassian.io'
      }),
  });

  const binary = MediaPicker('binary', context);
  binary.on('upload-end', payload => {
    console.log(payload.public);
  });
  binary.upload(
    'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
    'screen-capture.gif',
  );
  `}

  #### Methods

  **upload(base64 <string>, fileName <string>)** —
  Starts upload of the file encoded in base64 with the specified fileName

  #### Special events

  No special events for this module

  ---
  <a name="popup"></a>
  ### Popup

  Lets user pick files from their local computer or cloud storage.

  The popup component requires userAuthProvider (in addition to the authProvider because it displays
  files from and uploads files to the user's recent file collection). You will be need to cache this
  token returned by userAuthProvider because the popup will call this provider on every request
  to the media api concerning the users collection and cloud accounts. You cannot use the popup component
  if you can't obtain a token for the user's collection - use the Browser component instead.
  It can be optionally passed Legacy Context from any "parent" element to make analytics-next events bubble up to listeners.

  ${CreateImage(popup)}

  #### Usage

  ${code`const context = ContextFactory.create({
    authProvider: () =>
      Promise.resolve({
        clientId: 'your-app-client-id',
        token: 'your-generated-token',
        baseUrl: ''https://media-api.atlassian.io'
      }),
    userAuthProvider: () =>
      Promise.resolve({
        clientId: 'your-user-client-id',
        token: 'your-user-generated-token',
        baseUrl: ''https://media-api.atlassian.io'
      })
  });

  const popupConfig = {
    container: document.getElementById('container'),
    proxyReactContext?: {
      getAtlaskitAnalyticsEventHandlers: () => {}
    }
  };

  const popup = MediaPicker('popup', context, popupConfig);
  popup.on('upload-end', payload => {
    console.log(payload.public);
  });
  popup.show();
  `}

  #### Additional parameters

  **container?** <_HTML Element | JQuery Selector_> —
  The element where the popup should be placed. The default value is the document Body.

  #### Methods

  **show()** – Shows the popup

  **hide()** – Hides the popup

  #### Special events

  **closed** - emitted when the popup its disappears, this can happen when its either closed or submitted.

  ${(
    <Example
      Component={require('../examples/0-popup').default}
      title="Pop up"
      source={require('!!raw-loader!../examples/0-popup')}
    />
  )}
  `;
// TODO: add all the props from all the components using react prop types instead.
// There is a bug at the moment that does not allow to do it properly.
