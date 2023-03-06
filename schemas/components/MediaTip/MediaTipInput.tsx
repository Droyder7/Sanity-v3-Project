// MediaTipInput.tsx
import {Card, Flex, Grid, Text} from '@sanity/ui'
import {FieldMember, MemberField, ObjectInputProps} from 'sanity'

export interface MediaTip {
  mediaType: string
  mediaTitle: string
}

// Extend the `ObjectInputProps` type
export type MediaTipInputProps = ObjectInputProps<MediaTip>

export function MediaTipInput(props: MediaTipInputProps) {
  const {value, members, renderField, renderInput, renderItem, renderPreview} = props

  // find "mediaTitle" member
  const mediaTitleMember = members.find(
    (member): member is FieldMember => member.kind === 'field' && member.name === 'mediaTitle'
  )
  // find "mediaType" member
  const mediaTypeMember = members.find(
    (member): member is FieldMember => member.kind === 'field' && member.name === 'mediaType'
  )

  return (
    <>
      <Grid columns={2} gap={3}>
        {mediaTypeMember && (
          <MemberField
            member={mediaTypeMember}
            renderPreview={renderPreview}
            renderInput={renderInput}
            renderField={renderField}
            renderItem={renderItem}
          />
        )}
        {/* Only show the title input if media type is set */}
        {value?.mediaType ? (
          mediaTitleMember && (
            <MemberField
              renderPreview={renderPreview}
              member={mediaTitleMember}
              renderInput={renderInput}
              renderField={renderField}
              renderItem={renderItem}
            />
          )
        ) : (
          <Card tone="caution" radius={4}>
            <Flex height="fill" direction="column" justify="center" align="center">
              <Text>Select media type first</Text>
            </Flex>
          </Card>
        )}
      </Grid>
    </>
  )
}
