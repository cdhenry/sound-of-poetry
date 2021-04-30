import React from 'react';

import { ILabelProps } from '../../interfaces/atoms';

function Label(props: ILabelProps): JSX.Element {
    let defaultClassName = ''

    return (
        <label {...props} className={`${props.className ? props.className : ''} ${defaultClassName}`}>
            {props.children}
        </label>
    )
}

export default Label
