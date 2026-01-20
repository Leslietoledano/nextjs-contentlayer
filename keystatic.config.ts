import { config, collection, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        quotes: fields.array(
          fields.object({
            text: fields.markdoc({ // Changed from document to markdoc
            label: 'Quote Text',
            options: {
              bold: true,
              italic: true,
            },
          }),
            page: fields.text({ label: 'Page Number' }),
          }),
          {
            label: 'Book Quotes',
            itemLabel: props => props.fields.page.value || 'New Quote',
          }
        ),
        content: fields.markdoc({ label: 'Content' }),
      },
    }),
  },
});
