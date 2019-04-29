import { Context } from '@uidu/media-core';
import { IntlProvider } from 'react-intl';
import { LocalUploadComponent } from '../localUpload';
import { whenDomReady } from '../../util/documentReady';
import dropzoneUI from './dropzoneUI';
import {
  DropzoneReactContext,
  DropzoneUploadEventPayloadMap,
  DropzoneConfig,
  DropzoneDragEnterEventPayload,
  DropzoneDragLeaveEventPayload,
  Dropzone,
} from '../types';

const toArray = (arr: any) => [].slice.call(arr, 0);

export class DropzoneImpl
  extends LocalUploadComponent<DropzoneUploadEventPayloadMap>
  implements Dropzone {
  private container: HTMLElement;
  private instance?: HTMLElement;
  private headless: boolean;
  private uiActive: boolean;
  private proxyReactContext?: DropzoneReactContext;

  constructor(context: Context, config: DropzoneConfig = { uploadParams: {} }) {
    super(context, config);
    const { container, headless, proxyReactContext } = config;
    this.container = container || document.body;
    this.headless = headless || false;
    this.uiActive = false;
    this.proxyReactContext = proxyReactContext;
  }

  public activate(): Promise<void> {
    return whenDomReady
      .then(() => {
        this.container = this.container || document.body;
        if (!this.instance) {
          return this.createInstance();
        }
      })
      .then(() => {
        this.deactivate(); // in case we call activate twice in a row
        this.container.addEventListener('dragover', this.onDragOver, false);
        this.container.addEventListener('dragleave', this.onDragLeave, false);
        this.addDropzone();
      });
  }

  private readonly onFileDropped = (dragEvent: DragEvent) => {
    if (!dragEvent.dataTransfer) {
      return;
    }

    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.onDrop(dragEvent);

    const filesArray = [].slice.call(dragEvent.dataTransfer.files);
    this.uploadService.addFiles(filesArray);
  };

  public deactivate(): void {
    this.container.removeEventListener('dragover', this.onDragOver, false);
    this.container.removeEventListener('dragleave', this.onDragLeave, false);
    this.removeDropzone();
  }

  private addDropzone() {
    this.container.addEventListener('drop', this.onFileDropped);
  }

  private removeDropzone() {
    this.container.removeEventListener('drop', this.onFileDropped);
  }

  private onDragOver = (e: DragEvent): void => {
    e.preventDefault();

    if (this.instance && e.dataTransfer && DropzoneImpl.dragContainsFiles(e)) {
      const dataTransfer = e.dataTransfer;
      let allowed;

      try {
        allowed = dataTransfer.effectAllowed;
      } catch (e) {} // the error is expected in IE11

      dataTransfer.dropEffect =
        'move' === allowed || 'linkMove' === allowed ? 'move' : 'copy';
      this.instance.classList.add('active');
      const length = this.getDraggedItemsLength(dataTransfer);
      this.emitDragOver({ length });
    }
  };

  // Cross-browser way of getting dragged items length, we prioritize "items" if present
  // https://www.w3.org/TR/html51/editing.html#the-datatransfer-interface
  // This method is used on 'dragover' and we have no way to retrieve FileSystemFileEntry,
  // which contains info about if the dropped item is a file or directory. That info is only
  // available on 'drop'
  private getDraggedItemsLength(dataTransfer: DataTransfer): number {
    if (dataTransfer.items) {
      const items = toArray(dataTransfer.items);

      return items.filter((i: DataTransferItem) => i.kind === 'file').length;
    }

    // This is required for IE11
    return dataTransfer.files.length;
  }

  private onDragLeave = (e: DragEvent): void => {
    if (this.instance && e.dataTransfer) {
      e.preventDefault();
      this.instance.classList.remove('active');
      let length = 0;
      if (DropzoneImpl.dragContainsFiles(e)) {
        const dataTransfer = e.dataTransfer;
        length = this.getDraggedItemsLength(dataTransfer);
      }
      this.emitDragLeave({ length });
    }
  };

  private createInstance(): void {
    this.instance = this.getDropzoneUI();
    this.container.appendChild(this.instance);
  }

  private getDropzoneUI(): HTMLElement {
    if (this.headless) {
      const container = document.createElement('DIV');
      container.classList.add('headless-dropzone');
      return container;
    } else {
      if (this.proxyReactContext && this.proxyReactContext.intl) {
        const { formatMessage } = this.proxyReactContext.intl;

        return dropzoneUI(formatMessage);
      }
      const defaultFormatMessage = new IntlProvider({
        locale: 'en',
      }).getChildContext().intl.formatMessage;

      return dropzoneUI(defaultFormatMessage);
    }
  }

  private onDrop = (e: DragEvent): void => {
    const { instance } = this;

    if (instance && e.dataTransfer && DropzoneImpl.dragContainsFiles(e)) {
      instance.classList.remove('active');
      const dataTransfer = e.dataTransfer;
      const length = this.getDraggedItemsLength(dataTransfer);
      this.emit('drop', undefined);
      this.emitDragLeave({ length });
    }
  };

  private emitDragOver(e: DropzoneDragEnterEventPayload): void {
    if (!this.uiActive) {
      this.uiActive = true;
      this.emit('drag-enter', e);
    }
  }

  private emitDragLeave(payload: DropzoneDragLeaveEventPayload): void {
    if (this.uiActive) {
      this.uiActive = false;
      /*
       when drag over child elements, container will issue dragleave and then dragover immediately.
       The 50ms timeout will prevent from issuing that "false" dragleave event
       */
      window.setTimeout(() => {
        if (!this.uiActive) {
          this.emit('drag-leave', payload);
        }
      }, 50);
    }
  }

  private static dragContainsFiles(event: DragEvent): boolean {
    if (!event.dataTransfer) {
      return false;
    }

    const { types } = event.dataTransfer;

    return toArray(types).indexOf('Files') > -1;
  }
}
