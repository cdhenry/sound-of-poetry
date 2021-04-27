export interface IMap {
    region: string
    result: number
}

export interface IGetRegionsQuery {
    tags?: number[]
    words?: number[]
}

export interface IMapFiltersProps {
    handleFilterChange: (selectedOptions: IGetRegionsQuery) => void
}