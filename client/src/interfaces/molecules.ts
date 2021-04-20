import React from 'react'

import { IInputProps } from './atoms'

export type ITableListRowProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>

export type IGridListRowProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface ITextInputProps extends IInputProps {
    label: React.ReactNode
}
