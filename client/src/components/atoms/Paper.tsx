import React from 'react';

import { HandwritingFontEnum } from '../../enums/fonts';
import { IPaper } from '../../interfaces/atoms';

export default function Paper(props: IPaper): JSX.Element {
    const font = `font-${HandwritingFontEnum[props.handwritingEnumKey as never]} text-2xl text-gray-800`
    const defaultClassName = `${props.height} overflow-y-auto m-2 p-7 shadow-lg bg-yellow-50 whitespace-pre ${font}`

    return (
        <section className={defaultClassName}>
            <div>{props.children}</div>
        </section>
    )
}
