import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Button from '../../components/atoms/Button'
import Card from '../../components/atoms/Card'
import Icon from '../../components/atoms/Icon'
import TableListItem from '../../components/atoms/TableListItem'
import TableListRow from '../../components/molecules/TableListRow'
import { CardTypeEnum } from '../../enums/cardType'
import { IconTypeEnum } from '../../enums/iconType'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { IPoemTableRowProps } from '../../interfaces/poem'
import ModalTemplate from '../../templates/Modal'
import { IWordTableRowProps, IWord } from '../../interfaces/word'


export default function WordsRow(props: IWordTableRowProps): JSX.Element {
    const { item } = props
    const { url } = useRouteMatch()
    const [isModalActive, setIsModalActive] = useState(false)
    const [modal, setModal] = useState(<></>)

    const toggleIsModalActive = () => {
        setIsModalActive(!isModalActive)
    }

    // const handleAudio = async () => {
    //     setModal(<embed src={item.audio_url}></embed>)
    //     toggleIsModalActive()
    // }

    // const handleVideo = () => {
    //     setModal(<embed src={item.video_url}></embed>)
    //     toggleIsModalActive()
    // }

    return (
        <ModalTemplate isActive={isModalActive} closeModal={toggleIsModalActive}>
            {isModalActive ? (
                <Card cardType={CardTypeEnum.Modal} height={TailwindHeightEnum.Auto} width={TailwindWidthEnum.Auto}>
                    {modal}
                </Card>
            ) : (
                <TableListRow>
                    <TableListItem className="cursor-pointer">
                        <Link to={{ pathname: `${url}/${item.id}`, state: { wordName: item.definition } }}>    
                            {item.lemma}
                        </Link>
                    </TableListItem>
                    {/* <TableListItem>{item.poet_name}</TableListItem>
                    <TableListItem>{item.tags?.join(', ')}</TableListItem> */}
                    <TableListItem>{item.definition}</TableListItem>
                    <TableListItem>{item.occurrence}</TableListItem>
                    <TableListItem>{item.num_poems}</TableListItem>
                    {/* <TableListItem>
                        <div className="flex space-x-2">
                            {item.audio_url && (
                                <Button onClick={handleAudio}>
                                    <Icon iconType={IconTypeEnum.Audio} />
                                </Button>
                            )}
                            {item.video_url && (
                                <Button onClick={handleVideo}>
                                    <Icon iconType={IconTypeEnum.Video} />
                                </Button>
                            )}
                        </div>
                    </TableListItem> */}
                </TableListRow>
            )}
        </ModalTemplate>
    )
}
