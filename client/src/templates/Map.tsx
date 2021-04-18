import React from 'react';

import { IMapTemplate } from '../interfaces/templates';

export default function MapTemplate(props: IMapTemplate): JSX.Element {
    return (
        <section className="flex flex-col justify-center items-center">
            <header className="min-w-3/4 mb-2 sticky top-2">{props.header}</header>
            <section className="min-w-1/2">{props.content}</section>
        </section>
    )
}
