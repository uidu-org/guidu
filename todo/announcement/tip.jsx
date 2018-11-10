import React from 'react';

export default function Tip({ tip }) {
  return (
    <a href={tip.path} className="swiper-slide text-center">
      {tip.image && (
        <img
          alt={tip.description}
          src={tip.image}
          className="img-fluid"
          width={64}
          style={{
            display: 'inline-block',
            marginBottom: 16,
          }}
        />
      )}
      <p className="text-muted">{tip.description}</p>
    </a>
  );
}
