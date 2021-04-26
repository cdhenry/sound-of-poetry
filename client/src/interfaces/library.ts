import { LibraryHeaderFilterEnum } from '../enums/filters'
import { IGetPoemsQuery, IPoemListItem, IPoemWord } from './poem'
import { ILibraryListItemType } from './shared'

export interface ILibraryListSwitch {
    list: any
    headerFilterType: LibraryHeaderFilterEnum
    getListItem: (item: ILibraryListItemType, handwriting: never, filter?: LibraryHeaderFilterEnum) => Promise<void>
}

export interface ILibraryListItemSwitch {
    headerFilterType: LibraryHeaderFilterEnum
    listItemHandwriting: never
    listItem: any
}

export interface ILibraryClassFilterSwitch {
    headerFilterType: LibraryHeaderFilterEnum
    handleClassFilterChange: (selectedOptions: IGetPoemsQuery) => Promise<void>
}

export interface ILibraryWordProps {
    word: IPoemWord | string
    isWordnet: boolean
}

export interface ILibraryPoemProps {
    url: string
    id: number
    handwritingEnumKey: never
}

export interface ILibraryPoemTableRowProps {
    handwritingEnumKey: never
    item: IPoemListItem
    context: string
}
