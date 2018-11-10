const rafStub = require('raf-stub');
rafStub.replaceRaf([global, typeof window !== 'undefined' ? window : {}]);
