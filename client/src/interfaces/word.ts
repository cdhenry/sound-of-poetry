import { WordOrderByEnum } from '../enums/orderBy';

export interface IWord {
    id: number
    lemma: string
    occurrence: number
    num_poems: number
    sound_count: number
    image_count: number
}

export interface IGetLemmas {
    lemma: string
}

export interface IGetWordStats {
    id: number
    isWordNet: boolean
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
}

export interface IWordSound {
    ytid: string
    start_seconds: number
    display_name: string
}

export interface IWordImage {
    lemma: string
    original_url: string
    title: string
    author: string
}

export interface IWordSynonym {
    wordid: number
    lemma: string
    definition: string
}

export interface IWordDict {
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

export interface IGetWordsQuery {
    poemIds?: number[]
    poets?: number[]
    tags?: number[]
    words?: number[]
    regions?: number[]
    schools?: number[]
    orderBy?: WordOrderByEnum
}

export interface IWordTableRowProps {
    item: IWord
}

export interface IWordTableListProps {
    list: IWord[]
}

export interface IWordFiltersProps {
    handleFilterChange: (selectedOptions: IGetWordsQuery) => void
}
