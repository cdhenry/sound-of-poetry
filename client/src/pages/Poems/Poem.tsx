import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { randomInteger } from '../../common/utils/randomInteger';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Header from '../../components/atoms/Header';
import { CardTypeEnum } from '../../enums/cardType';
import { HandwritingFontEnum } from '../../enums/fonts';
import { HeaderTypeEnum } from '../../enums/headerType';
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind';
import { IPoem, IPoemStat } from '../../interfaces/poem';
import { IParams } from '../../interfaces/shared';
import { PoemService, poemService } from '../../services/poem';
import { WordService, wordService } from '../../services/word';
import Loading from '../Loading';

export default function Poem(): JSX.Element {
    const _poemService: PoemService = poemService
    const _wordService: WordService = wordService

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = useRef(handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never)
    const { id } = useParams<IParams>()

    const [isLoading, setIsLoading] = useState(true)
    const [isWordInfoLoading, setIsWordInfoLoading] = useState(false)
    const [isSoundMediaLoading, setIsSoundMediaLoading] = useState(false)
    const [isImageMediaLoading, setIsImageMediaLoading] = useState(false)
    const [poem, setPoem] = useState({} as IPoem)
    const [wordCount, setWordCount] = useState(0)
    const [poemStats, setPoemStats] = useState([] as IPoemStat[])
    const [wordSounds, setWordSounds] = useState([] as React.ReactNode[])
    const [wordImages, setWordImages] = useState([] as React.ReactNode[])
    const [wordSoundPage, setWordSoundPage] = useState(0)
    const [wordImagePage, setWordImagePage] = useState(0)
    const [wordSynonyms, setWordSynonyms] = useState([] as React.ReactNode[])
    const [wordDict, setWordDict] = useState([] as React.ReactNode[])
    const [activeWordId, setActiveWordId] = useState(0)
    const [poemContent, setPoemContent] = useState([] as React.ReactNode[])
    let limit = 5

    const getWordSounds = useCallback(
        async (id: number, pageNumber: number = 0) => {
            try {
                setIsSoundMediaLoading(true)
                const wordSoundList = await _wordService.getWordSounds({ limit, pageNumber: pageNumber }, id)

                setWordSounds(
                    wordSoundList.map((wordSound, idx) => (
                        <iframe
                            key={`PoemWordSound${id}${idx}`}
                            title={wordSound.ytid}
                            src={`https://www.youtube.com/embed/${wordSound.ytid}?start=${wordSound.start_seconds}`}
                        ></iframe>
                    ))
                )
            } catch (e) {
            } finally {
                setIsSoundMediaLoading(false)
            }
        },
        [_wordService, limit]
    )

    const getWordImages = useCallback(
        async (id: number, pageNumber: number = 0) => {
            try {
                setIsImageMediaLoading(true)
                const wordImageList = await _wordService.getWordImages({ limit, pageNumber: pageNumber }, id)
                setWordImages(
                    wordImageList.map((wordImage, idx) => (
                        <img
                            key={`PoemWordImage${id}${idx}`}
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
            } finally {
                setIsImageMediaLoading(false)
            }
        },
        [_wordService, limit]
    )

    const getWordInfo = useCallback(
        async (id: number, lemma: string) => {
            try {
                setIsWordInfoLoading(true)

                const wordSynonymList = await _wordService.getWordSynonyms(id)
                const wordDictList = await _wordService.getWordDict(id)

                setWordSoundPage(0)
                setWordImagePage(0)
                getWordSounds(id)
                getWordImages(id)

                setWordDict([
                    <div key={`PoemWordTitle${id}`} className="flex items-center justify-center mb-4">
                        <strong>{lemma}</strong>
                    </div>,
                    <ul>
                        {wordDictList.map((item, idx) => (
                            <li key={`PoemWordDefinition${id}${idx}`}>+ {item.definition}</li>
                        ))}
                    </ul>
                ])

                setWordSynonyms(wordSynonymList.map((item, idx) => <span>{item.lemma} | </span>))
            } catch (e) {
            } finally {
                setIsWordInfoLoading(false)
            }
        },
        [_wordService, getWordImages, getWordSounds]
    )

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)

            const poemData = await _poemService.getPoem(parseInt(id))
            const poemStatsData = await _poemService.getPoemStats(parseInt(id))
            const wordNetData = await _poemService.getPoemWordNet(parseInt(id))
            const poemLines = poemData.poem_string.split(/\n/)
            const content = [] as React.ReactNode[]
            let wordsCounter = 0

            setPoemStats(poemStatsData)

            poemLines.forEach((line, i) => {
                const words = line.split(' ')
                wordsCounter += words.length

                words.forEach((word: string, index: number) => {
                    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                    const cleanedWord = word.replace(regex, '').toLowerCase()
                    const wordNetWord = wordNetData.find((item: any) => item.lemma === cleanedWord)

                    const handleWordNet = async () => {
                        setActiveWordId(wordNetWord ? wordNetWord.word_id : 0)
                        await getWordInfo(wordNetWord?.word_id as number, wordNetWord?.lemma as string)
                    }

                    content.push(
                        wordNetWord?.word_id ? (
                            <button
                                key={`PoemWord${i}${index}`}
                                className={'whitespace-pre hover:text-shadow-lg hover:text-cyan-500'}
                                onClick={handleWordNet}
                            >
                                {word}{' '}
                            </button>
                        ) : (
                            <span
                                key={`PoemWord${i}${index}`}
                                className={'whitespace-pre hover:text-shadow-lg hover:text-rose-500'}
                            >
                                {word}{' '}
                            </span>
                        )
                    )
                })

                content.push(<br key={`PoemLineBreak${i}`} />)
            })

            setWordCount(wordsCounter)
            setPoem(poemData)
            setPoemContent(content)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poemService, getWordInfo, id])

    const handleBackSound = () => {
        getWordSounds(activeWordId, wordSoundPage - 1)
        setWordSoundPage(wordSoundPage - 1)
    }

    const handleMoreSound = () => {
        getWordSounds(activeWordId, wordSoundPage + 1)
        setWordSoundPage(wordSoundPage + 1)
    }

    const handleBackImage = () => {
        getWordImages(activeWordId, wordImagePage - 1)
        setWordImagePage(wordImagePage - 1)
    }

    const handleMoreImage = () => {
        getWordImages(activeWordId, wordImagePage + 1)
        setWordImagePage(wordImagePage + 1)
    }

    useEffect(() => {
        getPoem()
    }, [])

    return isLoading ? (
        <Loading />
    ) : (
        <section className="grid grid-cols-2 w-11/12">
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.Paper}
                handwritingEnumKey={handwritingEnumKey.current}
                header={
                    <div>
                        <Header headerType={HeaderTypeEnum.HeaderWeb}>
                            {poem.title} by {poem.poet_name}
                        </Header>
                    </div>
                }
            >
                <>{poemContent}</>
            </Card>
            <Card
                height={TailwindHeightEnum.Screen90}
                width={TailwindWidthEnum.Auto}
                cardType={CardTypeEnum.SeeThrough}
            >
                {isWordInfoLoading ? (
                    <Loading />
                ) : !wordDict.length ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div>(Click a word to see information about the word)</div>
                        <div>
                            Overall Sentiment:
                            <span className="ml-3">
                                {!!poemStats.length &&
                                    Number(
                                        poemStats
                                            .map((stat) => stat.sentiment * stat.use_count)
                                            .reduce((previous, current) => previous + current) / wordCount
                                    ).toFixed(2)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="place-self-start">Word</div>
                            <div className="place-self-end">Use Count</div>
                            {poemStats.map((stat, index) => (
                                <>
                                    <div className="place-self-start">
                                        <button
                                            className={'whitespace-pre hover:text-shadow-lg hover:text-amber-700'}
                                            onClick={() => getWordInfo(stat.wordid, stat.lemma)}
                                        >
                                            {stat.lemma}
                                        </button>
                                    </div>
                                    <div className="place-self-end">{stat.use_count}</div>
                                </>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-flow-row auto-rows-min gap-4 pb-7">
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
                                        {wordImages.length === limit && (
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
                                        {wordSounds.length === limit && (
                                            <Button key="SoundForward" onClick={handleMoreSound}>
                                                {'>'}
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <Button onClick={() => setWordDict([])}>Back</Button>
                        </div>
                    </div>
                )}
            </Card>
        </section>
    )
}
