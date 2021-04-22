import React from 'react';

import { HandwritingFontEnum } from '../../enums/fonts';
import { ITableListItemProps } from '../../interfaces/atoms';

export default function TableListItem(props: ITableListItemProps): JSX.Element {
    const { handwritingEnumKey, ...htmlProps } = props
    const font = handwritingEnumKey
        ? `font-${HandwritingFontEnum[handwritingEnumKey as never]} text-lg text-gray-800`
        : 'text-lg text-gray-800'
    const defaultClassName = `p-2 ${font}`

    return (
        <td {...htmlProps} className={`${htmlProps.className} ${defaultClassName}`}>
            {props.children}
        </td>
    )
}
