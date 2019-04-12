import { isClientBasedAuth } from './auth';
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
//# sourceMappingURL=auth-headers.js.map