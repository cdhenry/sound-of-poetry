export interface IMap {
    region: string
    result: number
}

export interface IGetRegionsQuery {
    tags?: any
    words?: any
}

export interface IMapFiltersProps {
    handleFilterChange: (selectedOptions: IGetRegionsQuery) => void
}