import React from 'react'

import { HeaderTypeEnum } from '../enums/headerType'
import { TailwindHeightEnum } from '../enums/tailwind'

export type IInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface IToggleInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    labelLeft: string
    labelRight: string
}

export type ILabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export interface IHeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    headerType: HeaderTypeEnum
}

export interface IGridListItemProps {
    id: any
    title: string
    handwritingEnumKey: never
    handleGridItem: (id: any, handwriting: never) => void
    cover?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}

export type ITableListItemProps = React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
>

export interface IPaperProps {
    header?: React.ReactNode
    height?: TailwindHeightEnum
    handwritingEnumKey: never
    children: React.ReactNode
}
