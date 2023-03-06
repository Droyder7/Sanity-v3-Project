// schemas/pet.js
export default {
  name: 'pet',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  title: 'Pet',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
  ],
}
