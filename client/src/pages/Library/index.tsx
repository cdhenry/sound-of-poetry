import React, { useCallback, useEffect, useState } from 'react';

import { randomInteger } from '../../common/utils/randomInteger';
import Paper from '../../components/atoms/Paper';
import Shelf from '../../components/molecules/Shelf';
import { LibraryHeaderFilterEnum } from '../../enums/filters';
import { HandwritingFontEnum } from '../../enums/fonts';
import { TailwindHeightEnum } from '../../enums/tailwind';
import { IImage } from '../../interfaces/image';
import { IGetPoemsQuery, IPoem } from '../../interfaces/poem';
import { IPoet } from '../../interfaces/poet';
import { ISound } from '../../interfaces/sound';
import { IWord } from '../../interfaces/word';
import { ImageService, imageService } from '../../services/image';
import { PoemService, poemService } from '../../services/poem';
import { PoetService, poetService } from '../../services/poet';
import { SoundService, soundService } from '../../services/sound';
import { WordService, wordService } from '../../services/word';
import LibraryTemplate from '../../templates/Library';
import PaginateTemplate from '../../templates/Paginate';
import Loading from '../Loading';
import LibraryHeaderFilters from './HeaderFilters';
import LibraryPoemFilters from './PoemFilters';
import LibraryPoetFilters from './PoetFilters';
import LibraryWordFilters from './WordFilters';

export default function Library(): JSX.Element {
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const _soundService: SoundService = soundService
    const _imageService: ImageService = imageService
    const [isLoading, setIsLoading] = useState(true)
    const [isList, setIsList] = useState(true)
    const [list, setList] = useState([] as IPoem[] | IPoet[] | IWord[] | ISound[] | IImage[])
    const [listItem, setListItem] = useState({} as any)
    const [listItemHandwriting, setListItemHandwriting] = useState('' as never)
    const [headerFilterType, setHeaderFilterType] = useState(LibraryHeaderFilterEnum.Poems)
    const [total, setTotal] = useState(0)
    const limit = 20

    const handlePageChange = async (pageNumber: number) => {
        await getList(pageNumber, headerFilterType)
    }

    const handleHeaderFilterChange = async (headerFilter: LibraryHeaderFilterEnum) => {
        setHeaderFilterType(headerFilter)
        await getList(1, headerFilter)
    }

    const handleClassFilterChange = async (selectedOptions: IGetPoemsQuery) => {
        await getList(1, headerFilterType, selectedOptions)
    }

    const handleListItem = async (id: any, handwriting: never) => {
        await getListItem(id, handwriting)
    }

    const handleBack = async () => {
        await handleHeaderFilterChange(headerFilterType)
    }

    const getList = useCallback(
        async (
            pageNumber: number = 1,
            headerFilter: LibraryHeaderFilterEnum = headerFilterType,
            selectedOptions?: IGetPoemsQuery
        ) => {
            try {
                setIsLoading(true)
                let data = { total: 0, items: [] as IPoem[] | IPoet[] | IWord[] | ISound[] | IImage[] }

                if (headerFilter === LibraryHeaderFilterEnum.Poems) {
                    data = await _poemService.getPoems({ limit, pageNumber }, selectedOptions)
                } else if (headerFilter === LibraryHeaderFilterEnum.Poets) {
                    data = await _poetService.getPoets({ limit, pageNumber })
                } else if (headerFilter === LibraryHeaderFilterEnum.Words) {
                    data = await _wordService.getWords({ limit, pageNumber })
                } else if (headerFilter === LibraryHeaderFilterEnum.Sounds) {
                    data = await _soundService.getSounds({ limit, pageNumber })
                } else if (headerFilter === LibraryHeaderFilterEnum.Images) {
                    data = await _imageService.getImages({ limit, pageNumber })
                }

                setTotal(data.total)
                setList(data.items)
                setIsList(true)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        },
        [_poemService, _poetService, _soundService, _wordService, _imageService, headerFilterType]
    )

    const getListItem = useCallback(
        async (id: any, handwriting: never, filter: LibraryHeaderFilterEnum = headerFilterType) => {
            try {
                setIsLoading(true)
                let data = {} as any
                if (filter === LibraryHeaderFilterEnum.Poems) {
                    const poem = await _poemService.getPoem(id)
                    const wordList = await _poemService.getPoemWords(id)
                    data = { wordList, poem }
                } else if (filter === LibraryHeaderFilterEnum.Poets) data = await _poetService.getPoet(id)
                else if (filter === LibraryHeaderFilterEnum.Words) data = await _wordService.getWord(id)
                else if (filter === LibraryHeaderFilterEnum.Sounds) data = await _soundService.getSound(id)
                else if (filter === LibraryHeaderFilterEnum.Images) data = await _imageService.getImage(id)

                setListItemHandwriting(handwriting)
                setListItem(data)
                setIsList(false)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        },
        [_poemService, _poetService, _soundService, _wordService, _imageService, headerFilterType]
    )

    const displayListItem = () => {
        let content
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poems:
                const poemLines = listItem.poem.poem_string.split(/\n/)
                const lemmas = listItem.wordList.map((word: any) => word.lemma)
                let linkedArr: React.ReactNode[] = []
                poemLines.forEach((line: any) => {
                    const words = line.split(' ')
                    words.forEach((word: string) => {
                        const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                        const cleanedWord = word.replace(regex, '').toLowerCase()
                        linkedArr.push(
                            lemmas.includes(cleanedWord) ? (
                                <>
                                    <a className="cursor-pointer whitespace-pre underline hover:text-rose-500 hover:text-shadow-lg">
                                        {word}
                                    </a>{' '}
                                </>
                            ) : (
                                <span className="whitespace-pre">{word} </span>
                            )
                        )
                    })
                    linkedArr.push(<br />)
                })
                content = linkedArr
                break
            case LibraryHeaderFilterEnum.Poets:
                content = (listItem as IPoet).bio
                break
            case LibraryHeaderFilterEnum.Words:
                content = (listItem as IWord).definition
                break
            case LibraryHeaderFilterEnum.Sounds:
                content = (listItem as ISound).ytid
                break
            case LibraryHeaderFilterEnum.Images:
                content = (listItem as IImage).image_url
                break
        }

        return (
            <Paper height={TailwindHeightEnum.Screen90} handwritingEnumKey={listItemHandwriting}>
                <>{content}</>
            </Paper>
        )
    }

    const displayClassFilters = () => {
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poems:
                return <LibraryPoemFilters handleFilterChange={handleClassFilterChange} />
            case LibraryHeaderFilterEnum.Poets:
                return <LibraryPoetFilters handleFilterChange={handleClassFilterChange} />
            case LibraryHeaderFilterEnum.Words:
                return <LibraryWordFilters handleFilterChange={handleClassFilterChange} />
        }
    }

    useEffect(() => {
        if (!list.length) getList()
    }, [list, getList])

    return (
        <LibraryTemplate
            header={
                isList ? (
                    <LibraryHeaderFilters handleFilterChange={handleHeaderFilterChange} />
                ) : (
                    <div className="flex justify-center">
                        <button className="p-2 border-gray-500 border-2 rounded bg-indigo-100" onClick={handleBack}>
                            Back
                        </button>
                    </div>
                )
            }
            content={
                isLoading ? (
                    <Loading />
                ) : isList ? (
                    <div className="flex flex-col mt-3">
                        {displayClassFilters()}
                        <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                            <Shelf
                                context="Library"
                                items={list?.map((item: IPoem | IPoet | IWord | ISound | IImage) => {
                                    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
                                    const handwritingEnumKey = handwritingEnumKeys[
                                        randomInteger(0, handwritingEnumKeys.length - 1)
                                    ] as never
                                    switch (headerFilterType) {
                                        case LibraryHeaderFilterEnum.Poets:
                                            item = item as IPoet
                                            return { id: item.id, title: item.name, handleListItem, handwritingEnumKey }
                                        case LibraryHeaderFilterEnum.Words:
                                            item = item as IWord
                                            return {
                                                id: item.wordid,
                                                title: item.lemma,
                                                handleListItem,
                                                handwritingEnumKey
                                            }
                                        case LibraryHeaderFilterEnum.Sounds:
                                            item = item as ISound
                                            return {
                                                id: item.ytid,
                                                title: item.display_name,
                                                handleListItem,
                                                handwritingEnumKey
                                            }
                                        case LibraryHeaderFilterEnum.Images:
                                            item = item as IImage
                                            return {
                                                id: item.image_url,
                                                title: item.lemma,
                                                cover: { src: item.image_url, alt: item.lemma },
                                                handleListItem,
                                                handwritingEnumKey
                                            }
                                        default:
                                            item = item as IPoem
                                            return {
                                                id: item.id,
                                                title: item.title,
                                                handleListItem,
                                                handwritingEnumKey
                                            }
                                    }
                                })}
                            />
                        </PaginateTemplate>
                    </div>
                ) : (
                    displayListItem()
                )
            }
        />
    )
}
