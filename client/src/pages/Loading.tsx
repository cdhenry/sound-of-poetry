import React from 'react';

import Icon from '../components/atoms/Icon';
import { IconTypeEnum } from '../enums/iconType';

export default function Loading(): JSX.Element {
    return (
        <section className="flex flex-col flex-grow justify-center items-center h-full">
            <Icon iconType={IconTypeEnum.Spinner} size="2x" spin />
        </section>
    )
}
