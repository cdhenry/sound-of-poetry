import React from 'react';

import { ILibraryTemplate } from '../interfaces/templates';

export default function LibraryTemplate(props: ILibraryTemplate): JSX.Element {
    return (
        <section className="flex flex-col justify-center items-center">
            <header className="min-w-3/4 mb-2 sticky top-2">{props.header}</header>
            <section className="min-w-3/4 flex justify-center">{props.content}</section>
        </section>
    )
}
