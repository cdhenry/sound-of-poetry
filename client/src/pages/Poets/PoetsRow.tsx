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
import { IPoetTableRowProps } from '../../interfaces/poet'
import ModalTemplate from '../../templates/Modal'

export default function PoetsRow(props: IPoetTableRowProps): JSX.Element {
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
                        <Link to={{ pathname: `${url}/${item.id}`, state: { poetName: item.name } }}>
                            {item.name}
                        </Link>
                    </TableListItem>
                    <TableListItem>{item.yob}</TableListItem>
                    <TableListItem>{item.yod}</TableListItem>
                </TableListRow>
            )}
        </ModalTemplate>
    )
}


{/* <TableListItem className="cursor-pointer">
                        <Link to={{ pathname: `${url}/${item.id}`, state: { poemName: item.poet_name } }}>
                            {item.title}
                        </Link>
                    </TableListItem> */}

                    // <TableListItem>{item.tags?.join(', ')}</TableListItem>
                    // <TableListItem>
                    //     <div className="flex space-x-2">
                    //         {item.audio_url && (
                    //             <Button onClick={handleAudio}>
                    //                 <Icon iconType={IconTypeEnum.Audio} />
                    //             </Button>
                    //         )}
                    //         {item.video_url && (
                    //             <Button onClick={handleVideo}>
                    //                 <Icon iconType={IconTypeEnum.Video} />
                    //             </Button>
                    //         )}
                    //     </div>
                    // </TableListItem>