import React from 'react';
import { Link } from 'react-router-dom';

import { RoutesEnum } from '../enums/routes';

export default function Navigation(): JSX.Element {
    const defaultClassName = 'flex justify-around p-2 border-gray-500 border-2 rounded bg-indigo-100 w-106'
    const linkClassName = 'hover:text-shadow-lg hover:text-amber-700'

    return (
        <section className={defaultClassName}>
            <Link to={RoutesEnum.Poems} className={linkClassName}>
                Poems
            </Link>
            <Link to={RoutesEnum.Poets} className={linkClassName}>
                Poets
            </Link>
            <Link to={RoutesEnum.Words} className={linkClassName}>
                Words
            </Link>
        </section>
    )
}
