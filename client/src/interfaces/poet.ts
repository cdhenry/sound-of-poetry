export interface IPoet {
    id: number
    name: string
    yob: number
    yod: number
    img_url: string
    bio: string
    url: string
}

export interface IPoetTag {
    id: number
    poem_id: number
    name: string
}

export interface IPoetListItem {
    id: number
    name: string
    yob: number
    yod: number
    region: string
    school: string
}

export interface IGetPoetNames {
    name: string
}

export interface IGetPoetsQuery {
    id?: number
    poets?: number[]
}

export interface IGetNamesParams {
    name: string
}

export interface IPoetTableRowProps {
    item: IPoetListItem
}

export interface IPoetFiltersProps {
    handleFilterChange: (selectedOptions: IGetPoetsQuery) => void
}
