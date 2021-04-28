import React, { useState } from 'react'
import Card from '../../components/atoms/Card'

import TableList from '../../components/organisms/TableList'
import { CardTypeEnum } from '../../enums/cardType'
import { TailwindHeightEnum, TailwindWidthEnum } from '../../enums/tailwind'
import { IPoemListItem } from '../../interfaces/poem'
import ModalTemplate from '../../templates/Modal'
import PoemsRow from './PoemsRow'

export default function PoemsList(props: { list: IPoemListItem[] }): JSX.Element {
    const tableHeaders = ['Title', 'Author', 'Topics', 'Related Media']
    const [isModalActive, setIsModalActive] = useState(false)
    const [modal, setModal] = useState(<></>)

    const toggleIsModalActive = () => {
        setIsModalActive(!isModalActive)
    }

    const handleAudio = (audio_url: string) => {
        setModal(<embed src={audio_url}></embed>)
        toggleIsModalActive()
    }

    return (
        <ModalTemplate isActive={isModalActive} closeModal={toggleIsModalActive}>
            {isModalActive ? (
                <Card cardType={CardTypeEnum.Modal} height={TailwindHeightEnum.Auto} width={TailwindWidthEnum.Auto}>
                    {modal}
                </Card>
            ) : (
                <TableList context="PoemsTableList" headers={tableHeaders}>
                    {props.list?.map((item, index) => {
                        return <PoemsRow key={`PoemsTableListRow${index}`} item={item} handleAudio={handleAudio} />
                    })}
                </TableList>
            )}
        </ModalTemplate>
    )
}
