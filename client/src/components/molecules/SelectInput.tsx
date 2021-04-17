import React from 'react';
import Select from 'react-select';

import { ISelectProps } from '../../interfaces/molecules';

export default function SelectInput(props: ISelectProps): JSX.Element {
    const defaultClassName = ''

    return <Select isSearchable={true} {...props} />
}
