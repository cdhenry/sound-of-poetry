export interface IPaginateTemplate {
    total: number
    limit: number
    handlePageChange: (pageNumber: number) => void
    children: React.ReactNode
}

export interface ILibraryTemplate {
    header?: React.ReactNode
    content: React.ReactNode
}

export interface IHomeTemplate {
    header?: React.ReactNode
    content: React.ReactNode
}

export interface IMapTemplate {
    header?: React.ReactNode
    content: React.ReactNode
}

export interface IModalProps {
    isActive: boolean
    closeModal: () => void
    children: React.ReactNode
}
