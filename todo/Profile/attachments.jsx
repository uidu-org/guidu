import React, { Component } from 'react';
import {
  Panel,
  PanelHeader,
  PanelIcon,
  PanelTitle,
  PanelLink,
} from 'components/Panel';
import PhotoBox from 'components/PhotoBox';

export default class ProfileGallery extends Component {
  add = image => {
    this.props.onAdd('attachments', image);
  };

  itemsRenderer = (items, onOpen) => {
    const content = (items || []).map((item, index) => (
      <a
        tabIndex={0}
        role="button"
        onClick={() => onOpen(index)}
        className="profile-image"
        style={{
          backgroundImage: `url('${item.file.thumb.url}')`,
        }}
      >
        <img className="hidden" alt={item.name} src={item.file.thumb.url} />
      </a>
    ));
    return <div className="">{content}</div>;
  };

  render() {
    const { images, editMode, attachable } = this.props;

    return (
      <Panel>
        <PanelHeader className="panel-heading-icon">
          <PanelIcon icon="/images/icons/gallery.png" />
          <PanelTitle>Galleria</PanelTitle>
        </PanelHeader>
        <div className="profile-images">
          <PhotoBox items={images} itemsRenderer={this.itemsRenderer} />
        </div>
      </Panel>
    );
  }
}

ProfileGallery.defaultProps = {
  onAdd: () => {},
};
