import {PoemOrderByEnum} from "../enums/orderBy";

export interface IMap {
    region: string
    count_poet: number
}

export interface IGetRegionsQuery {
    poemId?: number
    poets?: number[]
    tags?: number[]
    words?: number[]
    hasAudio?: boolean
    hasVideo?: boolean
    orderBy?: PoemOrderByEnum
}

export interface IMapFiltersProps {
    handleFilterChange: (selectedOptions: IGetRegionsQuery) => void
}