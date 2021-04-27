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

export default function PoemsRow(props: IPoemTableRowProps): JSX.Element {
    const { item, handleAudio } = props
    const { url } = useRouteMatch()

    const onClick = async () => {
        handleAudio(item.audio_url)
    }

    return (
        <TableListRow>
            <TableListItem className="cursor-pointer">
                <Link to={{ pathname: `${url}/${item.id}`, state: { poemName: item.poet_name } }}>{item.title}</Link>
            </TableListItem>
            <TableListItem>{item.poet_name}</TableListItem>
            <TableListItem>{item.tags?.join(', ')}</TableListItem>
            <TableListItem>
                <div className="flex space-x-2">
                    {item.audio_url && (
                        <Button onClick={onClick}>
                            <Icon iconType={IconTypeEnum.Audio} />
                        </Button>
                    )}
                    {item.video_url && (
                        <Button>
                            <a href={item.video_url} target="_blank" rel="noreferrer">
                                <Icon iconType={IconTypeEnum.Video} />
                            </a>
                        </Button>
                    )}
                </div>
            </TableListItem>
        </TableListRow>
    )
}
