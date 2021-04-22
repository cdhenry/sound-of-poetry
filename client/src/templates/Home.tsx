import React from 'react';

import { IHomeTemplate } from '../interfaces/templates';

export default function HomeTemplate(props: IHomeTemplate): JSX.Element {
    return (
        <section className="flex flex-col justify-center items-center">
            {props.header && <header className="w-3/4 mb-2 sticky top-2 z-10">{props.header}</header>}
            <section className="w-3/4 flex flex-col justify-center mt-3 ">{props.content}</section>
        </section>
    )
}
