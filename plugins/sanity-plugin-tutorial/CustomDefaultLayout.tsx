import React from 'react'
import {LayoutProps, useCurrentUser} from 'sanity'
import {GetStartedTutorial} from './GetStartedTutorial'

export function CustomDefaultLayout(props: LayoutProps) {
  const user = useCurrentUser() // to get current user

  const showTutorial = Boolean(user?.roles?.length)

  return (
    <>
      {showTutorial && <GetStartedTutorial />}
      {props.renderDefault(props) /* render the rest studio */}
    </>
  )
}
