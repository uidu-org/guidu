import Button, { ButtonGroup } from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import React, { PureComponent } from 'react';
import { Download, ExternalLink, Play, Trash } from 'react-feather';
import StyledMediaCardViewer, { Overlay, OverlayFilename } from './styled';

export default class MediaCardViewer extends PureComponent<any> {
  render() {
    const { children, onRemove, onOpen, file, ...otherProps } = this.props;

    const { downloadUrl, kind, filename, extension } = file;

    return (
      <StyledMediaCardViewer className="card">
        {children}
        <Overlay kind={kind}>
          <OverlayFilename>
            <Icon
              {...getFileTypeIconProps({ extension, size: 16 })}
              style={{
                display: 'flex',
                marginRight: '.5rem',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <p className="text-truncate mb-0">{filename}</p>
              <p className="text-truncate text-muted mb-0">
                323kb - .{extension}
              </p>
            </div>
          </OverlayFilename>
          <ButtonGroup>
            <Tooltip content="Scarica">
              <Button iconBefore={<Download size={16} />} href={downloadUrl} />
            </Tooltip>
            {kind === 'video' ? (
              <Tooltip content="Guarda">
                <Button iconBefore={<Play size={16} />} onClick={onOpen} />
              </Tooltip>
            ) : (
              <Tooltip content="Apri">
                <Button
                  iconBefore={<ExternalLink size={16} />}
                  onClick={onOpen}
                />
              </Tooltip>
            )}
            {onRemove && (
              <Tooltip content="Modifica">
                <Button iconBefore={<Trash size={16} />} onClick={onRemove} />
              </Tooltip>
            )}
          </ButtonGroup>
        </Overlay>
      </StyledMediaCardViewer>
    );
  }
}
