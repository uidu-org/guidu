import { getPackages } from '@manypkg/get-packages';
import Link from 'next/link';
import React from 'react';

function Components({ posts }) {
  console.log(posts);
  return (
    <div>
      <h1>All the components</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.dir}>
            <Link
              href="/components/[name]"
              as={`/components/${post.packageJson.name.replace('@uidu/', '')}`}
            >
              <a>{post.packageJson.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  const { tool, root, packages } = await getPackages(process.cwd());
  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: packages,
    },
  };
}

export default Components;
