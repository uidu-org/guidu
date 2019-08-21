import * as React from 'react';
import { IconProps } from '../types';

export default function IconCode({ label = '' }: IconProps) {
  return (
    <div
      aria-label={label}
      dangerouslySetInnerHTML={{
        __html: `<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <linearGradient x1="46.0099748%" y1="100%" x2="17.2158859%" y2="0%" id="linearGradient-1">
                <stop stop-color="#C1C7D0" offset="0%"></stop>
                <stop stop-color="#EDEFF2" offset="44.72%"></stop>
                <stop stop-color="#FAFBFC" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Give-feedback" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <rect fill="#FFFFFF" x="0" y="0" width="40" height="40"></rect>
            <ellipse id="feedback-1" fill="#0065FF" fill-rule="nonzero" cx="14.3681185" cy="24.2741641" rx="3.14506667" ry="3.15716308"></ellipse>
            <path d="M14.3679259,13.8656923 L14.3679259,34.9197815 C11.4398238,34.9197815 9.06616826,32.5368276 9.06595556,29.5974636 L9.06595556,29.3366421 C9.06595556,26.8932954 7.91081481,24.6272503 6.0228,23.0852385 C4.85422222,22.1308113 4,20.6863733 4,19.0695713 C4.00016362,16.1956221 6.32098807,13.8656923 9.18392593,13.8656923 L14.3679259,13.8656923 Z" id="feedback-2" fill="#CFD4DB" fill-rule="nonzero"></path>
            <ellipse id="feedback-3" fill="#0065FF" fill-rule="nonzero" cx="32.7436" cy="19.0702405" rx="3.18860741" ry="3.20087128"></ellipse>
            <path d="M32.7436,31.6192246 C32.7436,31.8339921 32.6122497,32.0267252 32.4128065,32.1044486 C32.2133632,32.1821719 31.9868423,32.1289182 31.8425185,31.9703774 C27.3458123,27.0652705 21.0086325,24.2742212 14.3681185,24.2742236 L14.3681185,24.2742236 L14.3681185,13.8663169 L14.3681185,13.8663169 C21.0086415,13.866304 27.3458228,11.0752325 31.8425185,6.17010359 C31.9868423,6.01156278 32.2133632,5.95830914 32.4128065,6.03603247 C32.6122497,6.1137558 32.7436,6.30648889 32.7436,6.52125641 L32.7436,31.6192246 Z" id="feedback-4" fill="url(#linearGradient-1)" fill-rule="nonzero"></path>
            <path d="M27.6472444,28.3495118 C28.1539901,28.6925545 28.6478173,29.0555354 29.1287259,29.4384544 L29.1287259,8.70202667 C28.648242,9.08472752 28.1544148,9.44770838 27.6472444,9.79096923 L27.6472444,28.3495118 Z" id="feedback-5" fill="#FF5230" fill-rule="nonzero"></path>
            <path d="M9.18411852,13.8663169 L14.3681185,13.8663169 L14.3681185,24.2741641 L9.18411852,24.2741641 C6.32108256,24.2741641 4.00013333,21.9442882 4.00013333,19.0702405 L4.00013333,19.0702405 C4.00013333,16.1961929 6.32108256,13.8663169 9.18411852,13.8663169 L9.18411852,13.8663169 Z" id="feedback-6" fill="#0065FF" fill-rule="nonzero"></path>
        </g>
    </svg>`,
      }}
    />
  );
}
