import { code, md } from '@uidu/docs';
import SectionMessage from '@uidu/section-message';
import * as React from 'react';

export default md`
  ### Media Core
  <p class="lead">Holds shared code between Media Components, such as interfaces and utils.</p>

  This package is required by other Media Components, and should not be used
  directly. It provides interfaces and utils to manage MediaCard, MediaViewer, MediaPicker and MediaFilmstrip.

  Medias are uploaded via
  - [media-picker](/packages/media/media-picker)
  - [field-image-uploader](/packages/forms/field-image-uploader)
  - [field-file-uploader](/packages/forms/field-file-uploader)
  - [editor-core](/packages/editor/editor-core) (plugins/media)

  #### Upload flow

  Medias are always uploaded asyncronously, as soon as user selects them. If needed (for manipulating purposes), a thumbnail is generated immediately client-side. Medias are initally stored in cache storages (either locally or remotely (eg. S3)), the promoted to persistent storage once form is submitted.

  ${(
    <div className="mb-4">
      <SectionMessage appearance="warning">
        IDs change when promoting an attachment from cache to persistent
        storage, keep in mind when id references are stored as strings (eg:
        editor core schemas)
      </SectionMessage>
    </div>
  )}

  Uploading a file to storage returns this kind of JSON response (FileIdentifier interface)

  ${code`{
    "id": "test.jpg",
    "storage": "cache",
    "kind": "image",
    "url": "/uploads/cache/test.jpg",
    "metadata": {
      "mimeType": "image/jpg",
      "filename": "Test-immagine.jpg",
      "width": 320,
      "height": 120,
      ...
    }
  }`}

  #### Rendering flow

  Media are referenced with an ID, aka a storage identifier (see Shrine), that allows clients to retrieve it from its storage.
  Media differ in kind (image | video | doc | ... | other) and _can_ have derivatives (aka variations), eagerly and/or on-the-fly. How derivatives are built is set by back-end, clients can consume urls.

  Media size is set by their wrapper: this way you can decide how to render each media differently in different components / sections.

  ${(
    <div className="mb-4">
      <SectionMessage>
        When media are stored inside an @uidu/adf-schema remember to extract
        media ids and store them, and to sync schema when media state changes
        (eg: when transformed, or cropped)
      </SectionMessage>
    </div>
  )}

  MediaCard expects same props as \<file\>_data from Srhine in a *file props*.

  ${code`{
  ...
  ...
  "file": {
    "id": "test.jpg",
    "storage": "cache",
    "kind": "image",
    "metadata": {
      "mimeType": "image/jpg",
      "filename": "Test-immagine.jpg",
      "width": 320,
      "height": 120,
      ...
    }
  }
}`}

  When stored in adf-schema, media node (as stated in Media node type) is expressed like this.
  Attachment id is set when saving model, and used to sync file_data after shrine promotion to persistent storage.

  ${code`{
    "id": "attachment_id" // Global ID from relay, for instance,
    "file": {
      "id": "test.jpg",
      "storage": "cache",
      "kind": "image",
      "metadata": {
        "mimeType": "image/jpg",
        "filename": "Test-immagine.jpg",
        "width": 320,
        "height": 120,
        ...
      }
    }
}`}
`;
