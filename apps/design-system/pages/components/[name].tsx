import { useRouter } from 'next/router';
import React from 'react';

export default function Package() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
