export interface IPaginatedParams {
    limit: number
    page: number
}

export interface IPaginatedList<T> {
    total: number
    items: T[]
}
