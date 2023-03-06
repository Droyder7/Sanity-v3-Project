import {defineType, defineField} from 'sanity'

export const book = defineType({
  name: 'book',
  type: 'document',
  title: 'Book',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Book title',
    }),
    defineField({
      name: 'firstPublished',
      type: 'datetime',
      title: 'First published',
    }),
  ],
})
