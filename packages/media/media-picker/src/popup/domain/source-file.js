import { isClientBasedAuth } from '@uidu/media-core';
export function mapAuthToSourceFileOwner(auth) {
    if (isClientBasedAuth(auth)) {
        return {
            id: auth.clientId,
            token: auth.token,
            baseUrl: auth.baseUrl,
        };
    }
    else {
        return auth;
    }
}
//# sourceMappingURL=source-file.js.map