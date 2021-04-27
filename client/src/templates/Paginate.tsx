import React from 'react';
import ReactPaginate from 'react-paginate';

import { IPaginateTemplate } from '../interfaces/templates';

export default function PaginateTemplate(props: IPaginateTemplate): JSX.Element {
    const { total, limit, children } = props

    const onChange = (data: { selected: number }) => {
        props.handlePageChange(data.selected)
    }

    return (
        <section className="flex items-center flex-col p-2 ">
            <div className="flex-none flex justify-between mb-2 w-11/12">
                {total > 0 && <div>Total: {total}</div>}
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(total / limit)}
                    onPageChange={onChange}
                    containerClassName="flex items-center"
                    pageClassName="mx-2 hover:underline"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    disabledClassName={'opacity-50'}
                    activeClassName={'underline'}
                />
            </div>
            <div className="flex-grow w-11/12">{children}</div>
        </section>
    )
}
