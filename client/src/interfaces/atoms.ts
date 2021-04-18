import React from 'react';

import { HeaderTypeEnum } from '../enums/headerType';
import { TailwindHeightEnum } from '../enums/tailwind';

export type IInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ILabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export interface IHeaderProps
    extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    headerType: HeaderTypeEnum
}

export interface IShelfItem {
    id: any
    title: string
    handwritingEnumKey: never
    handleListItem: (id: any, handwriting: never) => void
    cover?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}

export interface IPaper {
    header?: React.ReactNode
    height?: TailwindHeightEnum
    handwritingEnumKey: never
    children: React.ReactNode
}
