import {ConfigContext} from 'sanity'
import {StructureBuilder} from 'sanity/desk'

export default (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.editor().id('settings').schemaType('settings').documentId('settings')),
      //   ...S.documentTypeListItems().filter((listItem) => !['settings'].includes(listItem.getId())),
    ])
