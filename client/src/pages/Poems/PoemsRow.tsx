import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../components/atoms/Button';
import Icon from '../../components/atoms/Icon';
import TableListItem from '../../components/atoms/TableListItem';
import TableListRow from '../../components/molecules/TableListRow';
import { IconTypeEnum } from '../../enums/iconType';
import { IPoemTableRowProps } from '../../interfaces/poem';

export default function PoemsRow(props: IPoemTableRowProps): JSX.Element {
    const { item, handleAudio } = props
    const { url } = useRouteMatch()
    const history = useHistory()

    const handleAudioClick = async () => {
        handleAudio(item.audio_url)
    }

    function handleRowClick() {
        history.push(`${url}/${item.id}`)
    }

    return (
        <TableListRow className="cursor-pointer">
            <TableListItem onClick={handleRowClick} className="cursor-pointer w-1/4">
                {item.title}
            </TableListItem>
            <TableListItem onClick={handleRowClick} className="w-1/6">
                {item.poet_name}
            </TableListItem>
            <TableListItem onClick={handleRowClick} className="w-1/2">
                {item.tags?.join(', ')}
            </TableListItem>
            <TableListItem className="w-1/12">
                <div className="flex space-x-2">
                    {item.audio_url && (
                        <Button onClick={handleAudioClick}>
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
