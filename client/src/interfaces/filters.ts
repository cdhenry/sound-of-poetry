import { LibraryHeaderFilterEnum } from '../enums/filters'
import { IGetPoemsQuery } from './poem'

export interface ILibraryHeaderFilters {
    handleFilterChange: (filterType: LibraryHeaderFilterEnum, isChecked?: boolean) => void
}

export interface ILibraryClassFilters {
    handleFilterChange: (selectedOptions: IGetPoemsQuery) => void
}
