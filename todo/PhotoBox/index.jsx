import React, { Component } from 'react';
import { render } from 'react-dom';

import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI from 'photoswipe/dist/photoswipe-ui-default';

import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

export default class PhotoBox extends Component {
  constructor(props) {
    super(props);
    this.getPhotoSwipeWrapper = () => (
      <div className="pswp" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="pswp__bg" />
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item" />
            <div className="pswp__item" />
            <div className="pswp__item" />
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter" />
              <button
                className="pswp__button pswp__button--close"
                title="Close (Esc)"
              />

              <button
                className="pswp__button pswp__button--share"
                title="Share"
              />

              <button
                className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"
              />

              <button
                className="pswp__button pswp__button--zoom"
                title="Zoom in/out"
              />
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip" />
            </div>

            <button
              className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"
            />
            <button
              className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"
            />
            <div className="pswp__caption">
              <div className="pswp__caption__center" />
            </div>
          </div>
        </div>
      </div>
    );
    this.pswpElement = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.pswpElement);
    render(this.getPhotoSwipeWrapper(), this.pswpElement);
  }

  componentWillUnmount() {
    document.body.removeChild(this.pswpElement);
  }

  // componentDidUpdate() {
  //   ReactDOM.render(this.getPhotoSwipeWrapper(), this.pswpElement);
  // }

  open = (item, index) => {
    const { items } = this.props;
    if (items.length > 0) {
      const pswpElement = document.querySelectorAll('.pswp')[0];
      const itemsToRender = items.map(image => {
        if (image.kind === 'image') {
          return {
            ...image,
            src: image.blob.file,
            w: image.blob.metadata.width ? image.blob.metadata.width : 800,
            h: image.blob.metadata.height ? image.blob.metadata.height : 600,
            title: image.blob.name,
            description: image.blob.caption,
          };
        }
        return {
          ...image,
          html: `<iframe
            width="80%"
            frameborder="0"
            height="100%"
            style="left: 10%; position: relative; margin: 43px 0; padding-bottom: 43px; border: 0;"
            src="https://docs.google.com/gview?url=${
              image.blob.file
            }&embedded=true"></iframe>`,
        };
      });

      const options = {
        history: false,
        index,
        addCaptionHTMLFn: (innerItem, captionEl) => {
          const captionElToModify = captionEl;
          if (!innerItem.title) {
            captionElToModify.children[0].innerHTML = '';
            return false;
          }
          captionElToModify.children[0].innerHTML = `<div><h6 class="mb-0">${
            innerItem.title
          }</h6>${
            innerItem.description
              ? `<p>${innerItem.description}</p>`
              : 'Descrizione opzionale del documento...poi vediamo dove si inseriscono :)'
          }</div>`;
          return true;
        },
        getImageURLForShare: () => {
          if (this.gallery && this.gallery.currItem) {
            return this.gallery.currItem.blob.downloadUrl;
          }
          return '';
        },
        shareButtons: [
          // {id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
          // {id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
          // {id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}'},
          {
            id: 'download',
            label: 'Download image',
            url: '{{raw_image_url}}',
            download: true,
          },
        ],
      };

      this.gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI,
        itemsToRender,
        options,
      );
      this.gallery.init();
    }
  };

  render() {
    const { itemsRenderer, items } = this.props;
    // var content = images.map(function(image, index) {
    //   return (
    //     <a onClick={_self.open} className="profile-image" style={{backgroundImage: "url('" + image.file.thumb.url + "')"}} />
    //   )
    // });
    return itemsRenderer(items, this.open);
  }
}
