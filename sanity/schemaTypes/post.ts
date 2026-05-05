export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'excerpt',
      title: 'Short Description',
      description: 'Shown on the blog listing page (max 200 characters)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.max(200)
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Social Media', value: 'Social Media' },
          { title: 'SEO', value: 'SEO' },
          { title: 'Paid Ads', value: 'Paid Ads' },
          { title: 'Reels', value: 'Reels' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Growth Tips', value: 'Growth Tips' },
          { title: 'Case Study', value: 'Case Study' },
          { title: 'Google Ads', value: 'Google Ads' },
        ]
      }
    },
    {
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'featured',
      title: 'Featured Post?',
      description: 'Show this post at the top of the blog',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'publishedAt'
    }
  },
  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
}
