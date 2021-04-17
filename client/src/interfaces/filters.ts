import { LibraryHeaderFilterEnum } from '../enums/filters';
import { IGetPoemsQuery } from './poem';

export interface ISelectOption {
    value: any
    label: string
}

export interface ILibraryHeaderFilters {
    handleFilterChange: (filterType: LibraryHeaderFilterEnum) => void
}

export interface ILibraryClassFilters {
    handleFilterChange: (selectedOptions: IGetPoemsQuery) => void
}
