export interface IPaginateTemplate {
    total: number
    limit: number
    handlePageChange: (pageNumber: number) => void
    children: React.ReactNode
}

export interface ILibraryTemplate {
    header: React.ReactNode
    content: React.ReactNode
}
