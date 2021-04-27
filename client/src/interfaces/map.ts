export interface IMap {
    region: string
    count_poet: number
}

export interface IGetRegionsQuery {
    tags?: any
    words?: any
}

export interface IMapFiltersProps {
    handleFilterChange: (selectedOptions: IGetRegionsQuery) => void
}