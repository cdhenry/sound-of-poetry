export interface IPoem {
    audio_url: string
    id: number
    poem_string: string
    poet_url: string
    title: string
    url: string
    video_url: string
}

export interface IPoemWord {
    poem_id: number
    word_id: number
    lemma: string
    use_count: number
}

export interface IGetPoemsQuery {
    titles?: number[]
    poets?: number[]
    tags?: number[]
    words?: number[]
}

export interface IGetTitlesParams {
    title: string
}
