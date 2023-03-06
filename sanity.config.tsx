import {ConfigContext, defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool, StructureBuilder} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import {RocketIcon} from '@sanity/icons'
import {Card} from '@sanity/ui'
import {Logo} from './plugins/studio-logo/Logo'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig([
  {
    projectId: '0mnkhl6t',
    dataset: 'develop',
    name: 'develop-workspace',
    basePath: '/develop',
    title: 'Develop',
    plugins: [
      deskTool({
        structure: (S: StructureBuilder, context: ConfigContext) => {
          console.log(context)

          // const {projectId, dataset, schema, currentUser, getClient} = context

          // const client = getClient({ apiVersion: '2021-10-21' });

          // Because `currentUser` can be null, typescript won't allow
          // destructuring I.e. ⬇ This won't fly!
          // const {id, name, email, profileImage, provider, roles} = currentUser
          // ...but ⬇ this will
          // currentUser?.id, currentUser?.name, currentUser?.email, etc...

          // const currentProfileImage = currentUser?.profileImage ?? 'https://picsum.photos/200/300';

          // change default structure of the deskTool
          return S.defaults()
        },
      }),
      visionTool(),
      ...(isDev ? devOnlyPlugins : []),
    ],
    schema: {
      types: (prev, context) => {
        // console.log(context) // logs { projectId, dataset }
        return [...schemaTypes, ...prev]
      },
      templates: (prev) => [
        // {
        //   id: 'article-with-author',
        //   title: 'Article: Author',
        //   schemaType: 'article',
        //   parameters: [{name: `authorId`, title: `Author ID`, type: `string`}],
        //   value: ({authorId}) => ({
        //     author: authorId,
        //   }),
        // },
        ...prev,
      ],
    },
    studio: {
      components: {
        logo: Logo,
      },
    },
    tools: (prev, context) => {
      // console.log(prev) // logs previous tools / plugins : [ desk, vision ]

      // console.log(context) // logs { getClient, currentUser, schema, projectId, dataset}
      return [
        ...prev, // remember to include previous values
        {
          name: 'my-tool',
          title: 'My tool',
          icon: RocketIcon,
          component: (props) => {
            console.log(props)

            return <Card>I am a tool, albeit not a useful one</Card>
          },
        },
      ]
    },
    document: {
      newDocumentOptions: (prev, {creationContext}) => {
        // if (creationContext.type === 'global') {
        //   return prev.filter((templateItem) => templateItem.templateId != 'settings')
        // }
        return prev
      },
      actions: (prev, {schemaType}) => {
        if (schemaType === 'settings') {
          return prev.filter(
            ({action}) => action && !['unpublish', 'delete', 'duplicate'].includes(action)
          )
        }
        return prev
      },
      productionUrl: async (prev, context) => {
        // preview content in production environment
        // context includes the client an other details
        const {getClient, dataset, document} = context

        // if (document._type === 'post') {
        //   // you can now use async/await 🎉
        //   const slug = await client.fetch(
        //     `*[_type == 'routeInfo' && post._ref == $postId][0].slug.current`,
        //     {postId: document._id}
        //   )

        const params = new URLSearchParams()
        params.set('preview', 'true')
        params.set('dataset', dataset)

        console.log(params.toString())

        return `https://my-site.com/posts?${params}`
        // }

        // return prev
      },
    },
  },
  {
    projectId: '0mnkhl6t',
    dataset: 'production',
    name: 'production-workspace', // workspace name
    basePath: '/production',
    title: 'Production', // workspace title
    plugins: [deskTool()],
    schema: {
      types: schemaTypes,
    },
  },
])
