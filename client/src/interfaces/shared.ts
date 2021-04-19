import { IImage } from './image'
import { IPoem } from './poem'
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

export type ILibraryListItemType = IPoem | IPoet | IWord | ISound | IImage
