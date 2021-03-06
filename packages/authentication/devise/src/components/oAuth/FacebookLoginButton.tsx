import Spinner from '@uidu/spinner';
import React from 'react';
import { Login as FacebookLogin } from 'react-facebook';

const FacebookLoginButton = ({ label, onCompleted, onError }) => (
  <FacebookLogin
    scope="email,user_birthday,user_hometown,user_location"
    onCompleted={onCompleted}
    onError={onError}
  >
    {({ loading, handleClick }) => (
      <a
        tabIndex={-1}
        role="button"
        className="card card-body p-3 mb-2"
        href="#"
        onClick={handleClick}
      >
        {loading ? (
          <div className="d-flex w-100 justify-content-center align-items-center">
            <div className="d-flex" style={{ width: 18, height: 18 }}>
              <Spinner size="small" />
            </div>
          </div>
        ) : (
          <div className="d-flex w-100 justify-content-center align-items-center">
            <svg
              aria-labelledby="simpleicons-facebook-icon"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="text-social-facebook mr-2"
              width={18}
              height={18}
            >
              <title id="simpleicons-facebook-icon">Facebook</title>
              <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
            </svg>
            <h6 className="mb-0">{label}</h6>
          </div>
        )}
      </a>
    )}
  </FacebookLogin>
);

export default FacebookLoginButton;
