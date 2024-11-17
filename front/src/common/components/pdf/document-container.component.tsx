import React from 'react'
import {
	container,
} from './document-container.styles'

type Properties = {
  children: React.JSX.Element
}

export const DocumentContainer: React.FC<Properties> = ({
	children,
},) => {
	return (
		<div css={container}>
			{children}
		</div>
	)
}