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
