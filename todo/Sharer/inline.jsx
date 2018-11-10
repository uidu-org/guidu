import React from 'react';
import SharerButton from './button';

export default function SharerInline({
  message,
  facebook,
  url,
  name,
  className,
}) {
  return (
    <div className={className}>
      <SharerButton
        provider="facebook"
        message={message}
        className="btn btn-fill mr-4 mb-2 p-3 btn-facebook"
        appId={facebook.appId}
        url={url}
      >
        <i className="icon-social-facebook" />
      </SharerButton>
      <SharerButton
        provider="twitter"
        message={message}
        className="btn btn-fill mr-4 mb-2 p-3 btn-twitter"
        url={url}
      >
        <i className="icon-social-twitter" />
      </SharerButton>
      <SharerButton
        provider="linkedin"
        message={message}
        className="btn btn-fill mr-4 mb-2 p-3 btn-linkedin"
        url={url}
      >
        <i className="icon-social-linkedin" />
      </SharerButton>
      <SharerButton
        provider="google"
        message={message}
        className="btn btn-fill mr-4 mb-2 p-3 btn-google"
        url={url}
      >
        <i className="icon-social-google" />
      </SharerButton>
      <a
        href={`mailto:?subject=${name}=&body=${message}`}
        className="btn btn-fill mr-4 mb-2 p-3"
      >
        <i className="icon-envelope-letter" />
      </a>
    </div>
  );
}

SharerInline.defaultProps = {
  className: undefined,
  facebook: {
    appId: 341013092580493,
  },
};
