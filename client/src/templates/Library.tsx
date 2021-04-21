import React from 'react'

import { ILibraryTemplate } from '../interfaces/templates'

export default function LibraryTemplate(props: ILibraryTemplate): JSX.Element {
    return (
        <section className="flex flex-col justify-center items-center">
            <header className="w-3/4 mb-2 sticky top-2 z-10">{props.header}</header>
            <section className="w-3/4 flex flex-col justify-center mt-3 ">{props.content}</section>
        </section>
    )
}
