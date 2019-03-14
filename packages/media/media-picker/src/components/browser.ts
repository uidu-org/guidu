import { LocalUploadComponent } from './localUpload';
import { Context } from '@uidu/media-core';
import * as exenv from 'exenv';
import { Browser, BrowserConfig } from './types';

export class BrowserImpl extends LocalUploadComponent implements Browser {
  private readonly browseElement: HTMLInputElement;

  constructor(
    context: Context,
    browserConfig: BrowserConfig = { uploadParams: {} },
  ) {
    super(context, browserConfig);
    if (!exenv.canUseDOM) {
      this.browseElement = {} as any;
      return;
    }
    this.browseElement = document.createElement('input');
    this.browseElement.setAttribute('type', 'file');
    this.browseElement.style.display = 'none';

    if (browserConfig.multiple) {
      this.browseElement.setAttribute('multiple', '');
    }

    if (browserConfig.fileExtensions) {
      this.browseElement.setAttribute(
        'accept',
        browserConfig.fileExtensions.join(','),
      );
    }

    // IE11 hack - click will not execute if input has no parent
    // WebDriver hack - click will not execute if input isn't in the document
    document.body.appendChild(this.browseElement);

    this.addEvents();
  }

  private addEvents() {
    this.browseElement.addEventListener('change', this.onFilePicked);
  }

  private removeEvents() {
    this.browseElement.removeEventListener('change', this.onFilePicked);
  }

  private onFilePicked = () => {
    const filesArray = [].slice.call(this.browseElement.files);
    this.uploadService.addFiles(filesArray);
  };

  public browse(): void {
    this.browseElement.click();
  }

  public teardown(): void {
    this.removeEvents();
    const parentNode = this.browseElement.parentNode;
    if (parentNode) {
      parentNode.removeChild(this.browseElement);
    }
  }
}
