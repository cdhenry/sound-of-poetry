import React from 'react';

import { ILibraryTemplate } from '../interfaces/templates';

export default function LibraryTemplate(props: ILibraryTemplate): JSX.Element {
    return (
        <section className="flex flex-col justify-center items-center">
            <header className="min-w-3/4">{props.header}</header>
            <section className="mx-5 mb-5">{props.content}</section>
        </section>
    )
}
