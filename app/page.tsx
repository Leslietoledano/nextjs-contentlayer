import Link from 'next/link';
import { reader } from './reader';
import './styles.css';

export default async function Homepage() {
  const posts = await reader.collections.posts.all();

  return (
    <div>
      <h1>Books quotes</h1>
      <p>This is the homepage for the Books quotes site.</p>
      <p>
        I created this site to share my favorite quotes from various books I've read.
        Feel free to browse through the posts and discover some inspiring quotes!
      </p>
      <br></br>
      <h2>Latest Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
