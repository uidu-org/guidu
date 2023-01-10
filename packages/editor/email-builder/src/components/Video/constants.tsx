import { useIntl } from 'react-intl';

export function useIconSizes() {
  const intl = useIntl();

  return [
    {
      id: 'small',
      name: intl.formatMessage({
        defaultMessage: 'Small',
        id: 'uidu.email-builder.video.icon-size.small',
      }),
    },
    {
      id: 'medium',
      name: intl.formatMessage({
        defaultMessage: 'Medium',
        id: 'uidu.email-builder.video.icon-size.medium',
      }),
    },
    {
      id: 'large',
      name: intl.formatMessage({
        defaultMessage: 'Large',
        id: 'uidu.email-builder.video.icon-size.large',
      }),
    },
  ];
}

export function useIconColors() {
  const intl = useIntl();

  return [
    {
      id: 'ruby',
      name: intl.formatMessage({
        defaultMessage: 'Ruby',
        id: 'uidu.email-builder.video.icon-color.ruby',
      }),
    },
    {
      id: 'white',
      name: intl.formatMessage({
        defaultMessage: 'White',
        id: 'uidu.email-builder.video.icon-color.white',
      }),
    },
    {
      id: 'black',
      name: intl.formatMessage({
        defaultMessage: 'Black',
        id: 'uidu.email-builder.video.icon-color.black',
      }),
    },
  ];
}
