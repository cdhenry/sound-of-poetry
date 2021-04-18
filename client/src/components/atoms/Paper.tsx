import React from 'react';

import { HandwritingFontEnum } from '../../enums/fonts';
import { IPaper } from '../../interfaces/atoms';

export default function Paper(props: IPaper): JSX.Element {
    const font = `font-${HandwritingFontEnum[props.handwritingEnumKey as never]} text-2xl text-gray-800`
    const defaultClassName = `${props.height} w-1/2 overflow-y-auto m-2 p-7 shadow-lg bg-yellow-50 ${font}`

    return (
        <section className={defaultClassName}>
            <div>{props.header}</div>
            <div>{props.children}</div>
        </section>
    )
}
