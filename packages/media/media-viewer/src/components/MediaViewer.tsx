import { ShellMain } from '@uidu/shell';
import React, { useState } from 'react';
import Carousel from 'react-images';
import { MediaViewerProps } from '../types';

export default function MediaViewer({
  currentIndex = 0,
  files,
  onClose,
}: MediaViewerProps) {
  const [currentView, setCurrentView] = useState(files[currentIndex]);
  const onViewChange = (index: number) => setCurrentView(files[index]);

  return (
    <ShellMain>
      {/* <Header currentView={currentView} onClose={onClose} /> */}
      <Carousel
        trackProps={{
          onViewChange,
        }}
        currentIndex={currentIndex}
        components={{
          Footer: null,
          // NavigationPrev,
          // NavigationNext,
          // View,
        }}
        // frameProps={{ autoSize: 'height' }}
        views={files.map(({ url }) => ({
          source: url,
        }))}
        styles={
          {
            // container: (base: any) => ({
            //   ...base,
            //   height: '100%',
            //   flex: 1,
            // }),
            // view: (base: any) => ({
            //   ...base,
            //   backgroundColor: 'black',
            //   alignItems: 'center',
            //   display: 'flex',
            //   height: '100vh',
            //   justifyContent: 'center',
            //   '& > img': {
            //     maxHeight: '100%',
            //   },
            // }),
          }
        }
      />
    </ShellMain>
  );
}
