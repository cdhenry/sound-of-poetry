import React, { useCallback, useEffect, useState } from 'react';

import Button from '../../components/atoms/Button';
import { LibraryHeaderFilterEnum } from '../../enums/filters';
import { IGetPoemsQuery } from '../../interfaces/poem';
import { ILibraryListItemType } from '../../interfaces/shared';
import LibraryTemplate from '../../templates/Library';
import PaginateTemplate from '../../templates/Paginate';
import Loading from '../Loading';
import ClassFilterSwitch from './ClassFilterSwitch';
import GridListSwitch from './GridListSwitch';
import LibraryHeaderFilters from './HeaderFilters';
import ListItemSwitch from './ListItemSwitch';
import TableListSwitch from './TableListSwitch';
import { getListData } from './utils/getListData';
import { getListItemData } from './utils/getListItemData';

export default function Library(): JSX.Element {
    const [isLoading, setIsLoading] = useState(true)
    const [isDisplayListItem, setIsDisplayListItem] = useState(false)
    const [isDisplayAsGrid, setIsDisplayAsGrid] = useState(false)
    const [list, setList] = useState([] as ILibraryListItemType[])
    const [listItem, setListItem] = useState({} as any)
    const [listItemHandwriting, setListItemHandwriting] = useState('' as never)
    const [headerFilterType, setHeaderFilterType] = useState(LibraryHeaderFilterEnum.Poems)
    const [total, setTotal] = useState(0)
    const [getPoemQuery, setGetPoemQuery] = useState({} as IGetPoemsQuery)
    const limit = 20

    const handlePageChange = async (pageNumber: number) => {
        await getList(pageNumber, headerFilterType)
    }

    const handleHeaderFilterChange = async (headerFilter: LibraryHeaderFilterEnum, isChecked?: boolean) => {
        if (headerFilter === LibraryHeaderFilterEnum.View) {
            setIsDisplayAsGrid(isChecked || false)
        } else {
            setHeaderFilterType(headerFilter)
            await getList(0, headerFilter)
        }
    }

    const handleClassFilterChange = async (selectedOptions: IGetPoemsQuery) => {
        setGetPoemQuery({ ...getPoemQuery, ...selectedOptions })
        await getList(0, headerFilterType, { ...getPoemQuery, ...selectedOptions })
    }

    const handleBack = async () => {
        await handleHeaderFilterChange(headerFilterType)
    }

    const getList = useCallback(
        async (
            pageNumber: number = 0,
            headerFilter: LibraryHeaderFilterEnum = headerFilterType,
            selectedOptions?: IGetPoemsQuery
        ) => {
            try {
                setIsLoading(true)
                const data: any = await getListData(limit, pageNumber, headerFilter, selectedOptions)
                setTotal(data.total)
                setList(data.items)
                setIsDisplayListItem(false)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        },
        [headerFilterType]
    )

    const getListItem = useCallback(
        async (item: ILibraryListItemType, handwriting: never, filter: LibraryHeaderFilterEnum = headerFilterType) => {
            try {
                setIsLoading(true)
                const data = await getListItemData(item, filter)
                setListItemHandwriting(handwriting)
                setListItem(data)
                setIsDisplayListItem(true)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)
            }
        },
        [headerFilterType]
    )

    useEffect(() => {
        getList()
    }, [getList])

    return (
        <LibraryTemplate
            header={
                !isDisplayListItem ? (
                    <LibraryHeaderFilters handleFilterChange={handleHeaderFilterChange} />
                ) : (
                    <div className="flex justify-center">
                        <Button onClick={handleBack}>Back</Button>
                    </div>
                )
            }
            content={
                <>
                    {!isDisplayListItem && (
                        <ClassFilterSwitch
                            headerFilterType={headerFilterType}
                            handleClassFilterChange={handleClassFilterChange}
                        />
                    )}
                    {isDisplayListItem ? (
                        <ListItemSwitch
                            headerFilterType={headerFilterType}
                            listItemHandwriting={listItemHandwriting}
                            listItem={listItem}
                        />
                    ) : (
                        <PaginateTemplate total={total} limit={limit} handlePageChange={handlePageChange}>
                            {isLoading ? (
                                <Loading />
                            ) : isDisplayAsGrid ? (
                                <GridListSwitch
                                    list={list}
                                    headerFilterType={headerFilterType}
                                    getListItem={getListItem}
                                />
                            ) : (
                                <TableListSwitch
                                    list={list}
                                    headerFilterType={headerFilterType}
                                    getListItem={getListItem}
                                />
                            )}
                        </PaginateTemplate>
                    )}
                </>
            }
        />
    )
}
