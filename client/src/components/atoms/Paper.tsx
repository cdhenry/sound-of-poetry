import React from 'react';

import { HandwritingFontEnum } from '../../enums/fonts';

export default function Paper(props: { handwritingEnumKey: never; children: React.ReactNode }): JSX.Element {
    const font = ` font-${HandwritingFontEnum[props.handwritingEnumKey as never]} text-2xl text-gray-800`
    const defaultClassName = 'p-7 overflow-y-auto shadow-lg bg-yellow-50 whitespace-pre' + font
    return (
        <section className={defaultClassName}>
            <div>{props.children}</div>
        </section>
    )
}
