import { LibraryFilterEnum } from '../enums/filters';

export interface ILibraryFilters {
    handleFilterChange: (filterType: LibraryFilterEnum) => void
}
