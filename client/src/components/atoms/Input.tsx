import React from 'react';

import { IInputProps } from '../../interfaces/atoms';

export default function Input(props: IInputProps): JSX.Element {
    const defaultClassName = ''

    return <input {...props} type="text" className={`${props.className ? props.className : ''} ${defaultClassName}`} />
}
