import * as React from 'react';
import ImageCropper, { ImageCropperProp } from '../../image-cropper';
import { ERROR } from '../../avatar-picker-dialog';
import {
  Container,
  DragOverlay,
  RemoveImageButton,
  Image,
} from '../../image-cropper/styled';
import { smallImage, mountWithIntlContext } from '@uidu/media-test-helpers';

const imageWidth = 600;
const imageHeight = 400;
const imageSource = smallImage;
const top = 10;
const left = 20;
const containerSize = 400;
const scale = 0.8;

describe('Image cropper', () => {
  const createComponent = (props = {}) => {
    const onDragStartedSpy = jest.fn();
    const onImageSizeSpy = jest.fn();
    const onLoadSpy = jest.fn();
    const onRemoveImageSpy = jest.fn();
    const onImageErrorSpy = jest.fn();

    const allProps: ImageCropperProp = {
      imageSource,
      scale,
      containerSize,
      top,
      left,
      onDragStarted: onDragStartedSpy,
      onImageSize: onImageSizeSpy,
      onLoad: onLoadSpy,
      onRemoveImage: onRemoveImageSpy,
      onImageError: onImageErrorSpy,
      ...props,
    };
    const component = mountWithIntlContext(<ImageCropper {...allProps} />);
    const img = component.find('img');
    const container = component.find(Container);
    const removeImageButton = component.find(RemoveImageButton);
    const dragOverlay = component.find(DragOverlay);

    return {
      onDragStartedSpy,
      onImageSizeSpy,
      onLoadSpy,
      onRemoveImageSpy,
      onImageErrorSpy,
      component,
      img,
      container,
      removeImageButton,
      dragOverlay,
    };
  };

  describe('with image width', () => {
    describe('image tag', () => {
      it('should have defined source', () => {
        const { img } = createComponent({ imageWidth });

        expect(img.props().src).toBe(imageSource);
      });

      it('should have defined position', () => {
        const { img } = createComponent({ imageWidth });

        expect(img.props().style).toMatchObject({
          top: `${top}px`,
          left: `${left}px`,
        });
      });

      it('should have scaled width', () => {
        const { img } = createComponent({ imageWidth });

        expect(img.props().style).toMatchObject({
          width: `${imageWidth * scale}px`,
        });
      });
    });

    describe('container', () => {
      it('should have defined size', () => {
        const { container } = createComponent({ imageWidth });

        expect(container.props().style).toEqual({
          width: `${containerSize}px`,
          height: `${containerSize}px`,
        });
      });
    });

    it('should call onDragging callback', () => {
      const { dragOverlay, onDragStartedSpy } = createComponent({ imageWidth });

      dragOverlay.simulate('mousedown');
      expect(onDragStartedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('without image width', () => {
    it('should call onImageSize when image is loaded', () => {
      const { img, onImageSizeSpy } = createComponent({ imageWidth });

      img.simulate('load', {
        target: { naturalWidth: imageWidth, naturalHeight: imageHeight },
      });
      expect(onImageSizeSpy).toHaveBeenCalledTimes(1);
      expect(onImageSizeSpy).toHaveBeenCalledWith(imageWidth, imageHeight);
    });
  });

  describe('when an image is removed', () => {
    it('should call onRemoveImage prop when cross clicked', () => {
      const { removeImageButton, onRemoveImageSpy } = createComponent({
        imageWidth,
      });

      removeImageButton.simulate('click');
      expect(onRemoveImageSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('image errors', () => {
    const badImageURI = 'data:image/png;base64,bm90IGFuIGltYWdl=='; // === base64 data = btoa("not an image")

    it('should call onImageError prop with url error message when bad image url given', () => {
      const { onImageErrorSpy } = createComponent({
        imageSource: 'some-bad-url',
      });
      expect(onImageErrorSpy).toHaveBeenCalledTimes(1);
      expect(onImageErrorSpy).toHaveBeenCalledWith(ERROR.URL.defaultMessage);
    });

    it('should call onImageError prop with bad format message when bad image url given', () => {
      const { component, onImageErrorSpy } = createComponent({
        imageSource: badImageURI,
      });

      const onError = component.find(Image).prop('onError')!;
      onError({} as React.SyntheticEvent<HTMLImageElement>);

      expect(onImageErrorSpy).toHaveBeenCalledTimes(1);
      expect(onImageErrorSpy).toHaveBeenCalledWith(ERROR.FORMAT.defaultMessage);
    });
  });
});
