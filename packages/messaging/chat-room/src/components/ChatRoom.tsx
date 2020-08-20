import { ShellBody, ShellMain, ShellSidebar } from '@uidu/shell';
import React, { Component } from 'react';

export default class ChatRoom extends Component<any> {
  private localVideo: React.RefObject<HTMLVideoElement> = React.createRef();
  private localStream: MediaStream;

  componentDidMount() {}

  startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        this.localStream = stream;
        this.localVideo.current.srcObject = stream;
        this.localVideo.current.muted = true;
        this.localVideo.current.onloadedmetadata = (e) => {
          this.localVideo.current.play();
        };
      })
      .catch((error) => console.warn('Whoops! Error:', error));
  };

  stopVideo = () => {
    this.localStream.getTracks().forEach((track) => track.stop());
  };

  render() {
    return (
      <>
        <ShellMain style={{ flex: '1 0 70%' }}>
          <ShellBody>
            <video ref={this.localVideo} />
          </ShellBody>
          <button onClick={this.startVideo}>Start</button>
          <button onClick={this.stopVideo}>Stop</button>
        </ShellMain>
        <ShellSidebar
          className="border-left"
          style={{
            flex: '1 0 30%',
            maxWidth: '30%',
            minWidth: 'fit-content',
          }}
        />
      </>
    );
  }
}
