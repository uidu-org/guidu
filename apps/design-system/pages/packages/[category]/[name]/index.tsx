import { useRouter } from 'next/router';
import React from 'react';

export default function index() {
  const router = useRouter();
  const { category, name } = router.query;
  console.log(router);
  return <div>Test</div>;
}
