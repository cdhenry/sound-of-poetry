import React from 'react'

import { IGridListItem, IInputProps, ITableListItem } from './atoms'

export interface IGridList {
    context: string
    items: IGridListItem[]
}

export interface ITableList {
    context: string
    headers: string[]
    items: ITableListItem[]
}

export interface ITextInputProps extends IInputProps {
    label: React.ReactNode
}
