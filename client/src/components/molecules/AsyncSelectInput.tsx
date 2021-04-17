import React from 'react';
import AsyncSelect from 'react-select/async';

import { IAsyncSelectProps } from '../../interfaces/molecules';

export default function SelectInput(props: IAsyncSelectProps): JSX.Element {
    const defaultClassName = ''

    return <AsyncSelect {...props} />
}
