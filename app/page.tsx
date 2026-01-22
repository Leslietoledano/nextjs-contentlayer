import Link from 'next/link';
import { reader } from './reader';
import AnimatedContent from './components/AnimatedContent';
import './styles.css';

export default async function Homepage() {
  const posts = await reader.collections.posts.all();

  return (
    <AnimatedContent>
      <h1 className="fade-in">Books quotes</h1>
      <p className='fade-in'>Hey there, welcome!👋</p>
      <p className='fade-in'>
        I started this site as a way to share my favorite book quotes and, more importantly, to help me actually finish the books I start! 
        I will say it’s my personal accountability project.
      </p>
      <p className='fade-in'> 
        Beyond the books, I’m also using this space to track my progress as I sharpen my skills in Next.js and TypeScript. 
      </p>
      <p className='fade-in'>
        Take a look around—I hope you find some inspiration in these pages!
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
