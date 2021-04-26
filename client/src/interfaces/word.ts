export interface IWord {
    synsetid: number
    wordid: number
    casedwordid: number
    lemma: string
    senseid: number
    sensenum: number
    lexid: number
    tagcount: number
    sensekey: string
    cased: string
    pos: string
    lexdomainid: number
    definition: string
    sampleset: string
}

export interface IGetLemmas {
    lemma: string
}

export interface IFreqWord {
    lemma: string
    use_count: number
}

export interface IVideoWord {
    lemma: string
    ytid: string
    start_seconds: number
}

export interface IImageWord {
    lemma: string
    ytimage_urlid: string
}