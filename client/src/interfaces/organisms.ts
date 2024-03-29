import { IGridListItemProps } from './atoms'

export interface ICart {
    context: string
}

export interface IGridListProps {
    context: string
    items: IGridListItemProps[]
}

export interface ITableListProps
    extends React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement> {
    context: string
    headers: string[]
    children: React.ReactNode
}
