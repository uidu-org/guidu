import { useNode } from '@craftjs/core';
import UiduFieldText from '@uidu/field-text';
import Form, { useForm } from '@uidu/form';
import { Select } from '@uidu/select';
import React from 'react';
import { useIntl } from 'react-intl';
import { useIconColors, useIconSizes } from './constants';
import { VideoProps } from './types';

export default function VideoSettings() {
  const intl = useIntl();
  const {
    actions: { setProp },
    url,
    iconType = 'play',
    iconColor = 'white',
    iconSize = 'small',
  } = useNode<VideoProps>((node) => ({
    url: node.data.props.url,
    iconType: node.data.props.iconType,
    iconColor: node.data.props.iconColor,
    iconSize: node.data.props.iconSize,
  }));

  const iconSizes = useIconSizes();
  const iconColors = useIconColors();

  const form = useForm({
    mode: 'all',
    values: {
      url,
      iconType,
      iconColor,
      iconSize,
    },
  });

  const handleChange = (name, value) =>
    setProp((props) => (props[name] = value));

  return (
    <Form form={form} footerRenderer={() => null} handleSubmit={async () => {}}>
      <UiduFieldText
        name="url"
        type="url"
        onChange={handleChange}
        label={intl.formatMessage({
          defaultMessage: 'Video URL',
          id: 'uidu.email-builder.video.settings.url.label',
        })}
        help={intl.formatMessage({
          defaultMessage:
            'Add a YouTube or Vimeo URL to automatically generate a preview image. The image will link to the provided URL.',
          id: 'uidu.email-builder.video.settings.url.help',
        })}
      />
      <hr tw="my-6" />
      <Select
        name="iconType"
        onChange={handleChange}
        label={intl.formatMessage({
          defaultMessage: 'Play Icon Type',
          id: 'uidu.email-builder.video.settings.iconType.label',
        })}
        options={[
          {
            id: 'play',
            name: 'Play',
          },
          {
            id: 'play-circle',
            name: 'Play Circle',
          },
        ]}
      />
      <Select
        name="iconColor"
        label={intl.formatMessage({
          defaultMessage: 'Play Icon Color',
          id: 'uidu.email-builder.video.settings.iconColor.label',
        })}
        onChange={handleChange}
        options={iconColors}
      />
      <Select
        name="iconSize"
        label={intl.formatMessage({
          defaultMessage: 'Play Icon Color',
          id: 'uidu.email-builder.video.settings.iconColor.label',
        })}
        onChange={handleChange}
        options={iconSizes}
      />
    </Form>
  );
}
