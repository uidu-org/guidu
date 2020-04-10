import { Icon } from '@fluentui/react/lib/Icon';
import Button, { ButtonGroup } from '@uidu/button';
import Tooltip from '@uidu/tooltip';
import { getFileTypeIconProps } from '@uifabric/file-type-icons';
import React from 'react';
import { Download, ExternalLink, Play, Trash } from 'react-feather';
import StyledMediaCardViewer, { Overlay, OverlayFilename } from './styled';

export default function MediaCardViewer({
  children,
  file,
  onRemove = () => {},
  onOpen = () => {},
  onClick = () => {},
  disableOverlay = true,
}) {
  const { downloadUrl, kind, filename, extension } = file;

  return (
    <StyledMediaCardViewer className="card" onClick={onClick}>
      {children}
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
              <Tooltip content="Elimina">
                <Button iconBefore={<Trash size={16} />} onClick={onRemove} />
              </Tooltip>
            )}
          </ButtonGroup>
        </Overlay>
      )}
    </StyledMediaCardViewer>
  );
}
