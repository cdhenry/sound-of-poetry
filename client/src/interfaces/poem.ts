export interface IPoem {
    id: number
    poet_name: string
    poem_string: string
    title: string
    audio_url: string
    video_url: string
}

export interface IPoemListItem {
    id: number
    poet_name: string
    title: string
    tags?: string[]
    audio_url: string
    video_url: string
}

export interface IPoemTag {
    id: number
    poem_id: number
    name: string
}

export interface IPoemWord {
    poem_id: number
    word_id: number
    lemma: string
    use_count: number
}

export interface IGetPoemsQuery {
    poemId?: number
    poets?: number[]
    tags?: number[]
    words?: number[]
}

export interface IGetTitlesParams {
    title: string
}

export interface IGetTagsParams {
    poemIds: number[]
}
