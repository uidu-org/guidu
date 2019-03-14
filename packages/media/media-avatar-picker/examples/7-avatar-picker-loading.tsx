import * as React from 'react';
import { tallImage } from '@uidu/media-test-helpers';
import StatefulAvatarPickerDialog from '../example-helpers/StatefulAvatarPickerDialog';

export default () => (
  <StatefulAvatarPickerDialog imageSource={tallImage} isLoading={true} />
);
