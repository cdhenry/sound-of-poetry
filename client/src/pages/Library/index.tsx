import React, { useEffect, useState } from 'react';

import Shelf from '../../components/molecules/Shelf';
import { LibraryFilterEnum } from '../../enums/filters';
import { IImage } from '../../interfaces/image';
import { IPoem } from '../../interfaces/poem';
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
import LibraryFilters from './Filters';

export default function Library(): JSX.Element {
    const _poemService: PoemService = poemService
    const _poetService: PoetService = poetService
    const _wordService: WordService = wordService
    const _soundService: SoundService = soundService
    const _imageService: ImageService = imageService
    const [isLoading, setIsLoading] = useState(true)
    const [list, setList] = useState([] as IPoem[] | IPoet[] | IWord[] | ISound[] | IImage[])
    const [filterType, setFilterType] = useState(LibraryFilterEnum.Poems)
    const [total, setTotal] = useState(0)
    const limit = 20

    const getList = async (page: number = 1) => {
        try {
            setIsLoading(true)
            let data
            switch (filterType) {
                case LibraryFilterEnum.Poems:
                    data = await _poemService.getPoems({ limit, page })
                    break
                case LibraryFilterEnum.Poets:
                    data = await _poetService.getPoets({ limit, page })
                    break
                case LibraryFilterEnum.Words:
                    data = await _wordService.getWords({ limit, page })
                    break
                case LibraryFilterEnum.Sounds:
                    data = await _soundService.getSounds({ limit, page })
                    break
                case LibraryFilterEnum.Images:
                    data = await _imageService.getImages({ limit, page })
                    break
            }
            setTotal(data.total)
            setList(data.items)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const handlePageChange = async (pageNumber: number) => {
        getList(pageNumber)
    }

    const handleFilterChange = async (filter: LibraryFilterEnum) => {
        setFilterType(filter)
        switch (filter) {
        }
    }

    useEffect(() => {
        if (!list.length) getList()
    })

    return (
        <LibraryTemplate
            header={<LibraryFilters handleFilterChange={handleFilterChange} />}
            content={
                isLoading ? (
                    <Loading />
                ) : (
                    <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                        <Shelf
                            context="Library"
                            items={list.map((item: IPoem | IPoet | IWord | ISound | IImage) => {
                                switch (filterType) {
                                    case LibraryFilterEnum.Poems:
                                        return { title: (item as IPoem).title }
                                    case LibraryFilterEnum.Poets:
                                        return { title: (item as IPoet).name }
                                    case LibraryFilterEnum.Words:
                                        return { title: (item as IWord).lemma }
                                    case LibraryFilterEnum.Sounds:
                                        return { title: (item as ISound).display_name }
                                    case LibraryFilterEnum.Images:
                                        item = item as IImage
                                        return { title: item.lemma, cover: { src: item.image_url, alt: item.lemma } }
                                    default:
                                        return { title: '' }
                                }
                            })}
                        />
                    </PaginateTemplate>
                )
            }
        />
    )
}
