import '../styles.css';
import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { reader } from '../reader';
import { markdocConfig } from '../../keystatic.config';
import QuoteCard from '../components/QuoteCard';

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;

  const post = await reader.collections.posts.read(slug);

  if (!post) return <div>Post not found!</div>;

  const { node: mainNode } = await post.content();
  const mainRenderable = Markdoc.transform(mainNode, markdocConfig);
  

  // 2. Resolve and Transform Quotes
const resolvedQuotes = post.quotes 
  ? await Promise.all(
      post.quotes.map(async (quote) => {
        // Fix: Call quote.text() directly
        const { node: quoteNode } = await quote.text(); 
        
        // Fix: Rename this to 'quoteRenderable' to avoid the "redeclare" error
        const quoteRenderable = Markdoc.transform(quoteNode, markdocConfig);
        
        // Clean the object for Next.js serialization
        const plainQuoteRenderable = JSON.parse(JSON.stringify(quoteRenderable));

        return {
          renderable: plainQuoteRenderable,
          page: quote.page || ""
        };
      })
    )
  : [];

  const errors = Markdoc.validate(mainNode, markdocConfig);
  if (errors.length) {
    console.error(errors);
    throw new Error('Invalid content');
  }

  const finalMainRenderable = JSON.parse(JSON.stringify(mainRenderable));

  return (
    <div>
      <h1>{post.title}</h1>
      {Markdoc.renderers.react(finalMainRenderable, React)}
      {/* Render the list of quotes */}
      <div className="quotes-container">
        {resolvedQuotes?.map((quote, index) => (
          <QuoteCard 
            key={index} 
            renderable={quote.renderable}
            page={quote.page} 
          />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();

  return slugs.map(slug => ({
    slug,
  }));
}
