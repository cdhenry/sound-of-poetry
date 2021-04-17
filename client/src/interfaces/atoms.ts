import { TailwindHeightEnum } from '../enums/tailwind';

export type IInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type ILabelProps = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>

export interface IShelfItem {
    id: any
    title: string
    handwritingEnumKey: never
    handleListItem: (id: any, handwriting: never) => void
    cover?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}

export interface IPaper {
    height?: TailwindHeightEnum
    handwritingEnumKey: never
    children: React.ReactNode
}
