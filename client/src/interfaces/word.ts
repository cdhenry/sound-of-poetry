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

export interface IGetWordStats {
    id: number
    isWordnet: boolean
}

export interface IWordStats {
    synonyms: {
        lemma: string
        wordid: number
    }[]
    senses: {
        lemma: string
        definition: string
    }[]
    totalUseCount: number
    mostSinglePoemUses: {
        poemId: number
        poemTitle: string
        useCount: number
    }
    mostUsesByAuthor: {
        poetId: number
        poetName: string
        useCount: number
    }
    sounds: any
    images: any
}
