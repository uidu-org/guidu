import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import * as jsc from 'jsverify';
import Button from '@uidu/button';
import {
  createMouseEvent,
  mountWithIntlContext,
} from '@uidu/media-test-helpers';
import { Rectangle, Camera, Vector2 } from '@uidu/media-ui';
import {
  InteractiveImg,
  zoomLevelAfterResize,
  Props,
  State,
} from '../../../../../newgen/viewers/image/interactive-img';
import { ZoomControls } from '../../../../../newgen/zoomControls';
import { ImageWrapper, Img } from '../../../../../newgen/styled';
import { ZoomLevel } from '../../../../../newgen/domain/zoomLevel';
import { Outcome } from '../../../../../newgen/domain';

function createFixture(props?: Partial<Props>) {
  const onClose = jest.fn();
  const el = mountWithIntlContext<Props, State>(
    <InteractiveImg
      onLoad={jest.fn()}
      onError={jest.fn()}
      src={''}
      onClose={onClose}
      {...props}
    />,
  );
  const viewport = new Rectangle(400, 300);
  const originalImg = new Rectangle(800, 600);
  const camera = new Camera(viewport, originalImg);
  const zoomLevel = new ZoomLevel(1);

  el.setState({
    camera: Outcome.successful(camera),
    zoomLevel,
  });
  return { el, onClose, camera, zoomLevel };
}

function clickZoomIn(el: ReactWrapper<any, any>) {
  el.find(ZoomControls)
    .find(Button)
    .last()
    .simulate('click');
}

function clickZoomOut(el: ReactWrapper<any, any>) {
  el.find(ZoomControls)
    .find(Button)
    .first()
    .simulate('click');
}

describe('InteractiveImg', () => {
  it('it allows zooming', async () => {
    const { el } = createFixture();
    expect(el.find(ZoomControls)).toHaveLength(1);
    expect(el.state().zoomLevel.value).toEqual(1);

    clickZoomOut(el);
    expect(el.state().zoomLevel.value).toBeLessThan(1);

    clickZoomIn(el);
    expect(el.state().zoomLevel.value).toEqual(1);
  });

  it('sets the correct width and height on the Img element', () => {
    const { el, camera, zoomLevel } = createFixture();
    const styleProp = el.find(Img).prop('style');
    expect(styleProp).toMatchObject(camera.scaledImg(zoomLevel.value));
  });

  it('sets the correct scrollLeft and scrollTop values on the ImageWrapper', () => {
    const { el, camera, zoomLevel } = createFixture();
    const imgWrapper = el.find(ImageWrapper).getDOMNode();

    const prevOffset = new Vector2(imgWrapper.scrollLeft, imgWrapper.scrollTop);
    const prevScale = zoomLevel.value;
    const nextScale = zoomLevel.zoomIn().value;

    clickZoomIn(el);

    const expectedOffset = camera.scaledOffset(
      prevOffset,
      prevScale,
      nextScale,
    );
    expect(imgWrapper.scrollLeft).toEqual(expectedOffset.x);
    expect(imgWrapper.scrollTop).toEqual(expectedOffset.y);
  });

  it('resizes a fitted image when the window is resized', () => {
    const { el, camera } = createFixture();
    const oldZoomLevel = new ZoomLevel(camera.scaleDownToFit);
    el.setState({ zoomLevel: oldZoomLevel });

    const newViewport = new Rectangle(100, 100);
    const newCamera = camera.resizedViewport(newViewport);
    const newWrapper = {
      clientWidth: newViewport.width,
      clientHeight: newViewport.height,
    };

    (el.instance() as any)['wrapper'] = newWrapper;
    window.dispatchEvent(new CustomEvent('resize'));

    const expectedZoomLevel = zoomLevelAfterResize(
      newCamera,
      camera,
      oldZoomLevel,
    );

    const {
      zoomLevel: actualZoomLevel,
      camera: { data: actualCamera },
    } = el.state();
    expect(actualCamera).not.toBeUndefined();
    expect(actualCamera!.viewport).toEqual(newViewport);
    expect(actualZoomLevel.value).toEqual(expectedZoomLevel.value);
  });

  it('rotates image when orientation is provided', () => {
    const { el } = createFixture({ orientation: 2 });

    expect(el.find(Img).prop('style')).toEqual(
      expect.objectContaining({
        transform: 'rotateY(180deg)',
      }),
    );
  });

  describe('drag and drop', () => {
    it('the image will not move before a mousedown event', () => {
      const { el } = createFixture();
      const wrapper = el.find(ImageWrapper).getDOMNode();
      const { scrollLeft: oldScrollLeft, scrollTop: oldScrollTop } = wrapper;
      const mouseMove = createMouseEvent('mousemove', {
        screenX: 300,
        screenY: 200,
      });
      document.dispatchEvent(mouseMove);
      expect(wrapper.scrollLeft).toEqual(oldScrollLeft);
      expect(wrapper.scrollTop).toEqual(oldScrollTop);
    });

    it('the image will move after a mousedown event', () => {
      const { el } = createFixture();

      el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });

      const wrapper = el.find(ImageWrapper).getDOMNode();
      const { scrollLeft: oldScrollLeft, scrollTop: oldScrollTop } = wrapper;

      const mouseMove = createMouseEvent('mousemove', {
        screenX: 300,
        screenY: 200,
      });
      document.dispatchEvent(mouseMove);

      expect(wrapper.scrollLeft).not.toEqual(oldScrollLeft);
      expect(wrapper.scrollTop).not.toEqual(oldScrollTop);
    });

    it('the image will stop moving after a mouseup event', () => {
      const { el } = createFixture();

      el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });
      const mouseUp = createMouseEvent('mouseup');
      document.dispatchEvent(mouseUp);

      const wrapper = el.find(ImageWrapper).getDOMNode();
      const { scrollLeft: oldScrollLeft, scrollTop: oldScrollTop } = wrapper;

      const mouseMove = createMouseEvent('mousemove', {
        screenX: 300,
        screenY: 200,
      });
      document.dispatchEvent(mouseMove);

      expect(wrapper.scrollLeft).toEqual(oldScrollLeft);
      expect(wrapper.scrollTop).toEqual(oldScrollTop);
    });

    it('the image will be draggable when it is zoomed larger than the screen', () => {
      const { el, camera } = createFixture();
      const zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
      el.setState({ zoomLevel });
      expect(el.find(Img).prop('canDrag')).toEqual(true);
    });

    it('the image will not be draggable when it is zoomed smaller than or equal to the screen', () => {
      const { el, camera } = createFixture();
      const zoomLevel = new ZoomLevel(camera.scaleToFit);
      el.setState({ zoomLevel });
      expect(el.find(Img).prop('canDrag')).toEqual(false);
    });

    it('the image will be marked as isDragging when it is being dragged', () => {
      const { el, camera } = createFixture();
      const zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
      el.setState({ zoomLevel });
      el.find(Img).simulate('mousedown', { screenX: 100, screenY: 100 });
      expect(el.find(Img).prop('isDragging')).toEqual(true);
    });

    it('the image will not be marked as isDragging when it is not being dragged', () => {
      const { el, camera } = createFixture();
      const zoomLevel = new ZoomLevel(camera.scaleToFit * 1.5);
      el.setState({ zoomLevel });
      expect(el.find(Img).prop('isDragging')).toEqual(false);
    });
  });

  it('only applies image-rendering css props when zoom level greater than 1 (zoomed in)', () => {
    const { el } = createFixture();

    expect(el.find(Img)).not.toHaveStyleRule('image-rendering', 'pixelated');
    clickZoomIn(el);
    expect(el.find(Img)).toHaveStyleRule('image-rendering', 'pixelated');
  });
});

describe('zoomLevelAfterResize', () => {
  const sideLenGenerator = () => jsc.integer(1, 10000);

  jsc.property(
    'a fitted image will be resized to fit the new viewport',
    sideLenGenerator(),
    sideLenGenerator(),
    sideLenGenerator(),
    sideLenGenerator(),
    (w1, h1, w2, h2) => {
      const originalImg = new Rectangle(800, 600);
      const oldViewport = new Rectangle(w1, h1);
      const newViewport = new Rectangle(w2, h2);

      const oldCamera = new Camera(oldViewport, originalImg);
      const newCamera = oldCamera.resizedViewport(newViewport);

      const oldZoomLevel = new ZoomLevel(oldCamera.scaleDownToFit);
      const newZoomLevel = zoomLevelAfterResize(
        newCamera,
        oldCamera,
        oldZoomLevel,
      );
      return newZoomLevel.value === newCamera.scaleDownToFit;
    },
  );

  jsc.property(
    'a non-fitted image will maintain its size when viewport is resized',
    sideLenGenerator(),
    sideLenGenerator(),
    sideLenGenerator(),
    sideLenGenerator(),
    (w1, h1, w2, h2) => {
      const originalImg = new Rectangle(800, 600);
      const oldViewport = new Rectangle(w1, h1);
      const newViewport = new Rectangle(w2, h2);

      const oldCamera = new Camera(oldViewport, originalImg);
      const newCamera = oldCamera.resizedViewport(newViewport);

      const oldZoomLevel = new ZoomLevel(oldCamera.scaleDownToFit + 1);
      const newZoomLevel = zoomLevelAfterResize(
        newCamera,
        oldCamera,
        oldZoomLevel,
      );
      return newZoomLevel.value === oldZoomLevel.value;
    },
  );
});
