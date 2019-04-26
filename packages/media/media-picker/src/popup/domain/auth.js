import { isClientBasedAuth } from '@uidu/media-core';
export function mapAuthToAuthHeaders(auth) {
    if (isClientBasedAuth(auth)) {
        return {
            'X-Client-Id': auth.clientId,
            Authorization: "Bearer " + auth.token,
        };
    }
    else {
        return {
            'X-Issuer': auth.asapIssuer,
            Authorization: "Bearer " + auth.token,
        };
    }
}
export function mapAuthToQueryParameters(auth) {
    if (isClientBasedAuth(auth)) {
        return {
            client: auth.clientId,
            token: auth.token,
        };
    }
    else {
        return {
            issuer: auth.asapIssuer,
            token: auth.token,
        };
    }
}
//# sourceMappingURL=auth.js.map