import {
  FaSymbol,
  FlipProp,
  IconProp,
  PullProp,
  RotateProp,
  SizeProp,
  Transform
} from '@fortawesome/fontawesome-svg-core';
import React, { CSSProperties } from 'react';

import { HeaderTypeEnum } from '../enums/headerType';
import { IconTypeEnum } from '../enums/iconType';
import { TailwindHeightEnum } from '../enums/tailwind';

export type IInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export interface IToggleInputProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label?: string
    isOnOff?: boolean
    labelLeft?: string
    labelRight?: string
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

export interface IIconProps {
    iconType: IconTypeEnum
    forwardedRef?: ((e: any) => void) | React.MutableRefObject<any> | null
    mask?: IconProp
    className?: string
    color?: string
    spin?: boolean
    pulse?: boolean
    border?: boolean
    fixedWidth?: boolean
    inverse?: boolean
    listItem?: boolean
    flip?: FlipProp
    size?: SizeProp
    pull?: PullProp
    rotation?: RotateProp
    transform?: string | Transform
    symbol?: FaSymbol
    style?: CSSProperties
    tabIndex?: number
    title?: string
    swapOpacity?: boolean
}

export interface ITableListItemProps
    extends React.DetailedHTMLProps<React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement> {
    handwritingEnumKey?: never
}

export interface IPaperProps {
    header?: React.ReactNode
    height?: TailwindHeightEnum
    handwritingEnumKey: never
    children: React.ReactNode
}
