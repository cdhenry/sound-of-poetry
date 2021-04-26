import { IImage } from './image'
import { IPoemListItem } from './poem'
import { IPoet } from './poet'
import { ISound } from './sound'
import { IWord } from './word'

export interface IPaginatedParams {
    limit: number
    pageNumber: number
}

export interface IPaginatedList<T> {
    total: number
    items: T[]
}

export interface ISelectOption {
    value: any
    label: string
}

export type ILibraryListItemType = IPoemListItem | IPoet | IWord | ISound | IImage
