import * as exenv from 'exenv';
export default {
    version: exenv.canUseDOM && window.VERSION,
    html: {
        redirectUrl: 'https://api.media.atlassian.com/picker/static/link-account-handler.html',
    },
};
//# sourceMappingURL=config.js.map