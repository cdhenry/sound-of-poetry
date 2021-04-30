import React from 'react';

import { ITextInputProps } from '../../interfaces/molecules';
import Input from '../atoms/Input';
import Label from '../atoms/Label';

export default function TextInput(props: ITextInputProps): JSX.Element {
    const defaultClassName = 'flex flex-col'

    return (
        <div className={`${props.className ? props.className : ''} ${defaultClassName}`}>
            <Label id={props.id}>{props.label}</Label>
            <Input {...props} />
        </div>
    )
}
