import React, { useState } from 'react';

import { randomInteger } from '../../common/utils/randomInteger';
import Button from '../../components/atoms/Button';
import Card from '../../components/atoms/Card';
import Icon from '../../components/atoms/Icon';
import TableListItem from '../../components/atoms/TableListItem';
import TableListRow from '../../components/molecules/TableListRow';
import TableList from '../../components/organisms/TableList';
import { CardTypeEnum } from '../../enums/cardType';
import { LibraryHeaderFilterEnum } from '../../enums/filters';
import { HandwritingFontEnum } from '../../enums/fonts';
import { IconTypeEnum } from '../../enums/iconType';
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind';
import { IImage } from '../../interfaces/image';
import { ILibraryListSwitch } from '../../interfaces/pages';
import { IPoemListItem } from '../../interfaces/poem';
import { IPoet } from '../../interfaces/poet';
import { ILibraryListItemType } from '../../interfaces/shared';
import { ISound } from '../../interfaces/sound';
import { IWord } from '../../interfaces/word';
import ModalTemplate from '../../templates/Modal';

export default function TableListSwitch(props: ILibraryListSwitch): JSX.Element {
    const { list, headerFilterType, getListItem } = props
    const context = 'TableListSwitch'
    const [isModalActive, setIsModalActive] = useState(false)
    const [modal, setModal] = useState(<></>)
    const handleListItem = async (item: ILibraryListItemType, handwriting: never) => {
        await getListItem(item, handwriting)
    }
    const toggleIsModalActive = () => {
        setIsModalActive(!isModalActive)
    }
    const headers = () => {
        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                return ['Name', 'Lifespan', 'Actions']
            case LibraryHeaderFilterEnum.Words:
                return ['Word', 'Part of Speech', 'Definition', 'Sample Use', 'Actions']
            case LibraryHeaderFilterEnum.Sounds:
                return ['TYID', 'Start Seconds', 'End Seconds', 'Display Name', 'Actions']
            case LibraryHeaderFilterEnum.Images:
                return ['Word', 'Part of Speech', 'Definition', 'Actions']
            case LibraryHeaderFilterEnum.Poems:
                return ['Title', 'Author', 'Topics', 'Related Media']
            default:
                return []
        }
    }

    const rows = list?.map((item: ILibraryListItemType, index: number) => {
        const handwritingEnumKeys = Object.keys(HandwritingFontEnum)
        const handwritingEnumKey = handwritingEnumKeys[randomInteger(0, handwritingEnumKeys.length - 1)] as never

        switch (headerFilterType) {
            case LibraryHeaderFilterEnum.Poets:
                item = item as IPoet
                return (
                    <TableListRow key={`Poets${context}Row${index}`}>
                        <TableListItem>{item.name}</TableListItem>
                        <TableListItem>
                            {item.yob} - {item.yod}
                        </TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Words:
                item = item as IWord
                return (
                    <TableListRow key={`Words${context}Row${index}`}>
                        <TableListItem>{item.lemma}</TableListItem>
                        <TableListItem>{item.pos}</TableListItem>
                        <TableListItem>{item.definition}</TableListItem>
                        <TableListItem>{item.sampleset}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Sounds:
                item = item as ISound
                return (
                    <TableListRow key={`Sounds${context}Row${index}`}>
                        <TableListItem>{item.ytid}</TableListItem>
                        <TableListItem>{item.start_seconds}</TableListItem>
                        <TableListItem>{item.end_seconds}</TableListItem>
                        <TableListItem>{item.display_name}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Images:
                item = item as IImage
                return (
                    <TableListRow key={`Images${context}Row${index}`}>
                        <TableListItem>{item.lemma}</TableListItem>
                        <TableListItem>{item.pos}</TableListItem>
                        <TableListItem>{item.definition}</TableListItem>
                        <TableListItem>Actions</TableListItem>
                    </TableListRow>
                )
            case LibraryHeaderFilterEnum.Poems:
                const { title, poet_name, tags, audio_url, video_url } = item as IPoemListItem
                const handleTitle = () => {
                    handleListItem(item, handwritingEnumKey)
                }
                const handleAudio = async () => {
                    console.log(audio_url)
                    setModal(<embed src={audio_url}></embed>)
                    toggleIsModalActive()
                }
                const handleVideo = () => {
                    console.log(video_url)
                    setModal(<embed src={video_url}></embed>)
                    toggleIsModalActive()
                }
                return (
                    <TableListRow key={`Poems${context}Row${index}`}>
                        <TableListItem
                            handwritingEnumKey={handwritingEnumKey}
                            className="cursor-pointer"
                            onClick={handleTitle}
                        >
                            {title}
                        </TableListItem>
                        <TableListItem>{poet_name}</TableListItem>
                        <TableListItem>{tags?.join(', ')}</TableListItem>
                        <TableListItem>
                            <div className="flex space-x-2">
                                {audio_url && (
                                    <Button onClick={handleAudio}>
                                        <Icon iconType={IconTypeEnum.Audio} />
                                    </Button>
                                )}
                                {video_url && (
                                    <Button onClick={handleVideo}>
                                        <Icon iconType={IconTypeEnum.Video} />
                                    </Button>
                                )}
                            </div>
                        </TableListItem>
                    </TableListRow>
                )
            default:
                return <></>
        }
    })

    return (
        <ModalTemplate isActive={isModalActive} closeModal={toggleIsModalActive}>
            {isModalActive ? (
                <Card cardType={CardTypeEnum.Modal} height={TailwindHeightEnum.Auto} width={TailwindWidthEnum.Auto}>
                    {modal}
                </Card>
            ) : (
                <TableList context={context} headers={headers()}>
                    {rows}
                </TableList>
            )}
        </ModalTemplate>
    )
}
