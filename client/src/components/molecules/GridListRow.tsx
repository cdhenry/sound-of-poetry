import React from 'react'

import { IGridListRowProps } from '../../interfaces/molecules'

export default function GridListRow(props: IGridListRowProps): JSX.Element {
    return <div {...props}>{props.children}</div>
}
