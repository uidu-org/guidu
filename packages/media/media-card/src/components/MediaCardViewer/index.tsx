import { Icon } from '@fluentui/react/lib/Icon';
import Button, { ButtonGroup } from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import React from 'react';
import { Download, ExternalLink, Play, Trash } from 'react-feather';
import { Overlay, OverlayFilename, Wrapper } from './styled';

const defaultDimensions = { width: 250, height: 200 };

export default function MediaCardViewer({
  component: Component,
  file,
  onRemove = () => {},
  onOpen = () => {},
  onClick = () => {},
  disableOverlay = true,
  cardDimensions: dimensions = defaultDimensions,
}) {
  const { downloadUrl, kind, filename, extension, metatada } = file;

  return (
    <Wrapper tw="border rounded" dimensions={dimensions} onClick={onClick}>
      <div className="wrapper">
        <div className="img-wrapper">
          <Component dimensions={dimensions} file={file} />
        </div>
        {!disableOverlay && (
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
                <p className="mb-0 text-truncate">{filename}</p>
                <p className="mb-0 text-truncate text-muted">
                  323kb - .{extension}
                </p>
              </div>
            </OverlayFilename>
            <ButtonGroup>
              <Tooltip content="Scarica">
                <Button
                  iconBefore={<Download size={16} />}
                  href={downloadUrl}
                />
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
                <Tooltip content="Elimina">
                  <Button iconBefore={<Trash size={16} />} onClick={onRemove} />
                </Tooltip>
              )}
            </ButtonGroup>
          </Overlay>
        )}
      </div>
    </Wrapper>
  );
}
