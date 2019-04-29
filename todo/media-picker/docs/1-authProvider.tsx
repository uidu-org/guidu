import { md, code } from '@uidu/docs';

export default md`
  # Auth Provider

  **AuthProvider** type can be described as:

  ${code`
  function(context?: AuthContext): Promise<Auth>`}

  Media Picker requires a signed JWT for uploading files into the Media API. The token is usually created on the backend by your service with a function similar to this:

  ${code`
  function createFileStoreToken() {
    const tolerance = 60 * 1; // 1 minute
    const now = Math.floor(Date.now() / 1000) - tolerance;
    return jwt.sign(
      {
        access: {
          'urn:filestore:collection': ['create'],
          'urn:filestore:collection:test-collection': ['read', 'insert'],
          'urn:filestore:chunk:*': ['create', 'read'],
          'urn:filestore:upload': ['create'],
          'urn:filestore:upload:*': ['read', 'update'],
        },
        nbf: now,
        exp: now + 60 * 60, // 60 minutes
      },
      YOUR_SECRET,
      { issuer: YOUR_CLIENT_ID },
    );
  }
 `}

  Please note, that you need access to the upload API filestore:upload to perform requests.

  MediaPicker requests access to the signed JWT via the authProvider callback function passed to it as part of ModuleConfig. Auth provider is a function which takes an authContext, and returns a promise of an Auth.

  Note: ASAP based authentication is currently not implemented yet. To track the progress, see: https://product-fabric.atlassian.net/browse/MSW-195

  ${code`
  export interface ClientBasedAuth {
    readonly clientId: string;
    readonly token: string;
  }

  export interface AsapBasedAuth {
    readonly asapIssuer: string;
    readonly token: string;
  }

  export type Auth = ClientBasedAuth | AsapBasedAuth;

  export interface AuthContext {
    readonly collectionName?: string;
  }

  export type AuthProvider = (context?: AuthContext) => Promise<Auth>;
 `}

  The function takes 1 argument:

  1.  _context_ - object with additional information for auth generation.
      Context is optional:
      It can contain the following members (all are optional): - **collectionName** - name of the collection where Media Picker will upload to.

  The code might look like this:

  ${code`
  function authProvider(context) {
    return fetch(https://get-auth?collection=context.collectionName);
  }
 `}
 `;
