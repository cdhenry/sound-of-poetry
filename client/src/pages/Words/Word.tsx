import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { randomInteger } from '../../common/utils/randomInteger';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Header from '../../components/atoms/Header';
import { CardTypeEnum } from '../../enums/cardType';
import { HandwritingFontEnum } from '../../enums/fonts';
import { HeaderTypeEnum } from '../../enums/headerType';
import { RoutesEnum } from '../../enums/routes';
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind';
import { IParams } from '../../interfaces/shared';
import { PoemService, poemService } from '../../services/poem';
import { WordService, wordService } from '../../services/word';
import PaginateTemplate from '../../templates/Paginate';
import Loading from '../Loading';

export default function Word(): JSX.Element {
    const _poemService: PoemService = poemService
    const _wordService: WordService = wordService

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = useRef(handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never)
    const { id } = useParams<IParams>()

    const [isPoemLoading, setIsPoemLoading] = useState(true)
    const [isWordInfoLoading, setIsWordInfoLoading] = useState(false)
    const [isSoundMediaLoading, setIsSoundMediaLoading] = useState(false)
    const [isImageMediaLoading, setIsImageMediaLoading] = useState(false)
    const [wordSounds, setWordSounds] = useState([] as React.ReactNode[])
    const [wordImages, setWordImages] = useState([] as React.ReactNode[])
    const [wordSoundPage, setWordSoundPage] = useState(0)
    const [wordImagePage, setWordImagePage] = useState(0)
    const [wordSynonyms, setWordSynonyms] = useState([] as React.ReactNode[])
    const [wordDict, setWordDict] = useState([] as React.ReactNode[])
    const [poemListContent, setPoemListContent] = useState([] as React.ReactNode[])
    const [totalPoems, setTotalPoems] = useState(0)
    let poemsLimit = 20
    let wordMediaLimit = 5

    const handlePoemListPageChange = async (pageNumber: number) => {
        await getPoemList(pageNumber)
    }

    const getWordSounds = useCallback(
        async (id: number, pageNumber: number = 0) => {
            try {
                setIsSoundMediaLoading(true)
                const wordSoundList = await _wordService.getWordSounds(
                    { limit: wordMediaLimit, pageNumber: pageNumber },
                    id
                )

                setWordSounds(
                    wordSoundList.map((wordSound, idx) => (
                        <iframe
                            key={`WordSound${id}${idx}`}
                            title={wordSound.ytid}
                            src={`https://www.youtube.com/embed/${wordSound.ytid}?start=${wordSound.start_seconds}`}
                        ></iframe>
                    ))
                )
            } catch (e) {
                console.log(e)
            } finally {
                setIsSoundMediaLoading(false)
            }
        },
        [_wordService, wordMediaLimit]
    )

    const getWordImages = useCallback(
        async (id: number, pageNumber: number = 0) => {
            try {
                setIsImageMediaLoading(true)
                const wordImageList = await _wordService.getWordImages(
                    { limit: wordMediaLimit, pageNumber: pageNumber },
                    id
                )
                setWordImages(
                    wordImageList.map((wordImage, idx) => (
                        <img
                            key={`WordImage${id}${idx}`}
                            alt={`${wordImage.title} by ${wordImage.author}`}
                            onError={(e) => {
                                var target = e.target as HTMLImageElement
                                target.onerror = null
                                target.style.display = 'none'
                            }}
                            src={wordImage.original_url}
                        ></img>
                    ))
                )
            } catch (e) {
                console.log(e)
            } finally {
                setIsImageMediaLoading(false)
            }
        },
        [_wordService, wordMediaLimit]
    )

    const getPoemList = useCallback(
        async (pageNumber: number = 0) => {
            try {
                setIsPoemLoading(true)

                const poemData = await _poemService.getPoems(
                    { limit: poemsLimit, pageNumber: pageNumber },
                    { words: [parseInt(id)] }
                )

                const poemList = poemData.items.map((poem) => (
                    <div className="hover:text-shadow-lg hover:text-cyan-500">
                        <Link to={`${RoutesEnum.Poems}/${poem.id}`}>{poem.title}</Link>
                    </div>
                ))

                setTotalPoems(poemData.total)
                setPoemListContent(poemList)
            } catch (e) {
                console.log(e)
            } finally {
                setIsPoemLoading(false)
            }
        },
        [_poemService, id, poemsLimit]
    )

    const getWordInfo = useCallback(
        async (id: number) => {
            try {
                setIsWordInfoLoading(true)

                const wordDictList = await _wordService.getWord(id)
                const wordSynonymList = await _wordService.getWordSynonyms(id)

                setWordSoundPage(0)
                setWordImagePage(0)
                getWordSounds(id)
                getWordImages(id)
                getPoemList()

                setWordDict([
                    <div key={`WordLemma${id}`} className="flex items-center justify-center mb-4">
                        <strong>{wordDictList[0].lemma}</strong>
                    </div>,
                    <ul>
                        {wordDictList.map((item, idx) => (
                            <li key={`WordDefinition${id}${idx}`}>+ {item.definition}</li>
                        ))}
                    </ul>
                ])

                setWordSynonyms(wordSynonymList.map((item, idx) => <span>{item.lemma} | </span>))
            } catch (e) {
                console.log(e)
            } finally {
                setIsWordInfoLoading(false)
            }
        },
        [_wordService, getPoemList, getWordImages, getWordSounds]
    )

    const handleBackSound = () => {
        getWordSounds(parseInt(id), wordSoundPage - 1)
        setWordSoundPage(wordSoundPage - 1)
    }

    const handleMoreSound = () => {
        getWordSounds(parseInt(id), wordSoundPage + 1)
        setWordSoundPage(wordSoundPage + 1)
    }

    const handleBackImage = () => {
        getWordImages(parseInt(id), wordImagePage - 1)
        setWordImagePage(wordImagePage - 1)
    }

    const handleMoreImage = () => {
        getWordImages(parseInt(id), wordImagePage + 1)
        setWordImagePage(wordImagePage + 1)
    }

    useEffect(() => {
        getWordInfo(parseInt(id))
    }, [])

    return isWordInfoLoading ? (
        <Loading />
    ) : (
        <section className="grid grid-cols-2 w-11/12">
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.SeeThrough}
            >
                {isWordInfoLoading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-flow-row auto-rows-min gap-4">
                        <div>{wordDict}</div>
                        {!!wordSynonyms.length && (
                            <div>
                                <strong>Word Associations</strong>
                            </div>
                        )}
                        {!!wordSynonyms.length && <div>| {wordSynonyms}</div>}
                        {(!!wordSounds.length || !!wordImages.length) && (
                            <div>
                                <strong>Media</strong>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                            {isImageMediaLoading && wordImagePage > 0 ? (
                                <div className="col-span-full">
                                    <Loading />
                                </div>
                            ) : (
                                <>
                                    {wordImages}
                                    <div className="flex justify-around items-center">
                                        {wordImagePage > 0 && (
                                            <Button key="ImageBack" onClick={handleBackImage}>
                                                {'<'}
                                            </Button>
                                        )}
                                        {wordImages.length === wordMediaLimit && (
                                            <Button key="ImageForward" onClick={handleMoreImage}>
                                                {'>'}
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            {isSoundMediaLoading && wordSoundPage > 0 ? (
                                <div className="col-span-full">
                                    <Loading />
                                </div>
                            ) : (
                                <>
                                    {wordSounds}
                                    <div className="flex justify-around items-center">
                                        {wordSoundPage > 0 && (
                                            <Button key="SoundBack" onClick={handleBackSound}>
                                                {'<'}
                                            </Button>
                                        )}
                                        {wordSounds.length === wordMediaLimit && (
                                            <Button key="SoundForward" onClick={handleMoreSound}>
                                                {'>'}
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </Card>
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.Paper}
                handwritingEnumKey={handwritingEnumKey.current}
                header={<Header headerType={HeaderTypeEnum.HeaderWeb}>Poems</Header>}
            >
                <PaginateTemplate total={totalPoems} limit={poemsLimit} handlePageChange={handlePoemListPageChange}>
                    {isPoemLoading ? (
                        <Loading />
                    ) : !poemListContent.length ? (
                        <div className="flex justify-center">No poems in our database use this word</div>
                    ) : (
                        <div className="flex flex-col self-start mt-6">{poemListContent}</div>
                    )}
                </PaginateTemplate>
            </Card>
        </section>
    )
}
