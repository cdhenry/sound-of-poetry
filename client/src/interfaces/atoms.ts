export interface IShelfItem {
    id: any
    title: string
    handwritingEnumKey: never
    handleListItem: (id: any, handwriting: never) => void
    cover?: React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}
