import Link from 'next/link';
import { reader } from './reader';
import AnimatedContent from './components/AnimatedContent';
import './styles.css';

export default async function Homepage() {
  const posts = await reader.collections.posts.all();

  return (
    <AnimatedContent>
      <h1 className="fade-in">Books quotes</h1>
      <p className='fade-in'>This is the homepage for the Books quotes site.</p>
      <p className='fade-in'>
        I created this site to share my favorite quotes from various books I've read.
        Feel free to browse through the posts and discover some inspiring quotes!
      </p>
      <br></br>
      <h2 className='fade-in'>Latest Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>{post.entry.title}</Link>
          </li>
        ))}
      </ul>
    </AnimatedContent>
  );
}
