import React, { useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Card from '../../components/atoms/Card'
import TableListItem from '../../components/atoms/TableListItem'
import TableListRow from '../../components/molecules/TableListRow'
import { CardTypeEnum } from '../../enums/cardType'
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
