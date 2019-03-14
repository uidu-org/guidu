// tslint:disable:no-console
import * as React from 'react';
import { Avatar, AvatarPickerDialog } from '../src';
import { generateAvatars } from '../example-helpers';
import { tallImage } from '@uidu/media-test-helpers';

const avatars: Array<Avatar> = generateAvatars(30);

export default () => (
  <AvatarPickerDialog
    avatars={avatars}
    imageSource={tallImage}
    onImagePicked={(selectedImage, crop) => {
      console.log('onImagePicked', selectedImage, crop);
    }}
    onAvatarPicked={selectedAvatar =>
      console.log('onAvatarPicked', selectedAvatar)
    }
    onCancel={() => console.log('onCancel')}
    errorMessage="Image size is 3264px * 2448px. The maximum allowed image size is 2000px * 2000px."
  />
);
