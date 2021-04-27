import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { randomInteger } from '../../common/utils/randomInteger'
import Card from '../../components/atoms/Card'
import Header from '../../components/atoms/Header'
import { CardTypeEnum } from '../../enums/cardType'
import { HandwritingFontEnum } from '../../enums/fonts'
import { HeaderTypeEnum } from '../../enums/headerType'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { IPoem } from '../../interfaces/poem'
import { IParams } from '../../interfaces/shared'
import { PoemService, poemService } from '../../services/poem'
import { WordService, wordService } from '../../services/word'
import Loading from '../Loading'

export default function Poem(): JSX.Element {
    const _poemService: PoemService = poemService
    const _wordService: WordService = wordService

    const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
    const handwritingEnumKey = useRef(handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never)
    const { id } = useParams<IParams>()

    const [isLoading, setIsLoading] = useState(true)
    const [isWordInfoLoading, setIsWordInfoLoading] = useState(false)
    const [poem, setPoem] = useState({} as IPoem)
    const [wordSounds, setWordSounds] = useState([] as React.ReactNode[])
    const [wordImages, setWordImages] = useState([] as React.ReactNode[])
    const [wordSynonyms, setWordSynonyms] = useState([] as React.ReactNode[])
    const [wordDict, setWordDict] = useState([] as React.ReactNode[])
    const [poemContent, setPoemContent] = useState([] as React.ReactNode[])

    const getPoem = useCallback(async () => {
        try {
            setIsLoading(true)

            const poemData = await _poemService.getPoem(parseInt(id))
            const wordNetData = await _poemService.getPoemWordNet(parseInt(id))
            const poemLines = poemData.poem_string.split(/\n/)
            const content = [] as React.ReactNode[]
            poemLines.forEach((line, i) => {
                const words = line.split(' ')

                words.forEach((word: string, index: number) => {
                    const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g
                    const cleanedWord = word.replace(regex, '').toLowerCase()
                    const wordNetWord = wordNetData.find((item: any) => item.lemma === cleanedWord)

                    const handleWordNet = async () => {
                        const id = wordNetWord?.word_id as number
                        setIsWordInfoLoading(true)
                        const wordSoundList = await _wordService.getWordSounds(id)
                        const wordImageList = await _wordService.getWordImages(id)
                        const wordSynonymList = await _wordService.getWordSynonyms(id)
                        const wordDictList = await _wordService.getWordDict(id)
                        // const wordStats = await _wordService.getWordStats({ id, isWordNet: true })

                        setWordDict([
                            <div className="flex items-center justify-center mb-4">
                                <strong>{wordNetWord?.lemma}</strong>
                            </div>,
                            <ul>
                                {wordDictList.map((item, idx) => (
                                    <li>+ {item.definition}</li>
                                ))}
                            </ul>
                        ])

                        setWordSynonyms(wordSynonymList.map((item, idx) => <span>{item.lemma} | </span>))

                        setWordSounds(
                            wordSoundList.map((wordSound, idx) => (
                                <iframe
                                    key={`PoemWordSound${i}${idx}`}
                                    title={wordSound.ytid}
                                    src={`https://www.youtube.com/embed/${wordSound.ytid}?start=${wordSound.start_seconds}`}
                                ></iframe>
                            ))
                        )

                        setWordImages(
                            wordImageList.map((wordImage, idx) => (
                                <img
                                    key={`PoemWordImage${i}${idx}`}
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

                        // const wordStats = _wordService.getWordStats({
                        //     id,
                        //     isWordNet: true
                        // })
                        setIsWordInfoLoading(false)
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

                content.push(<br />)
            })

            setPoem(poemData)
            setPoemContent(content)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }, [_poemService, id])

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
                {!wordDict.length && (
                    <div className="flex items-center justify-center">
                        Click a word to see information about the word
                    </div>
                )}
                {isWordInfoLoading ? (
                    <div className="flex items-center justify-center">Loading...</div>
                ) : (
                    <div className="grid grid-flow-row auto-rows-min gap-4">
                        {!!wordDict.length && <div>{wordDict}</div>}
                        {!!wordSynonyms.length && (
                            <div>
                                <strong>Word Associations</strong>
                            </div>
                        )}
                        {!!wordSynonyms.length && <div>| {wordSynonyms}</div>}
                        {(!!wordSounds.length || !!wordImages.length) && (
                            <div>
                                <strong>Sensual Associations</strong>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-2">{wordSounds}</div>
                        <div className="grid grid-cols-2 gap-2">{wordImages}</div>
                    </div>
                )}
            </Card>
        </section>
    )
}
