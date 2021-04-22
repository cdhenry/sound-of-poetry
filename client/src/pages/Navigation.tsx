import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../components/atoms/Icon';
import { IconTypeEnum } from '../enums/iconType';
import { RoutesEnum } from '../enums/routes';

export default function Navigation(): JSX.Element {
    const defaultClassName =
        'flex flex-col justify-around items-center px-5 min-h-1/2-screen border border-2 border-gray-500 rounded bg-indigo-100 shadow-lg'
    const linkClassName =
        'hover:transform hover:scale-150 transition delay-50 duration-100 ease-in ease-out active:text-gray-500'
    const [isNavVisible, setIsNavVisible] = useState(true)
    const handleNavToggle = () => setIsNavVisible(!isNavVisible)

    return isNavVisible ? (
        <section className={defaultClassName}>
            <Link to={RoutesEnum.Home} className={linkClassName}>
                <Icon iconType={IconTypeEnum.Home} size="lg" />
            </Link>
            <Link to={RoutesEnum.Library} className={linkClassName}>
                <Icon iconType={IconTypeEnum.Book} size="lg" />
            </Link>
            <Link to={RoutesEnum.Theater} className={linkClassName}>
                <Icon iconType={IconTypeEnum.Microphone} size="lg" />
            </Link>
            <Link to={RoutesEnum.Studio} className={linkClassName}>
                <Icon iconType={IconTypeEnum.Pen} size="lg" />
            </Link>
            <Link to={RoutesEnum.Map} className={linkClassName}>
                <Icon iconType={IconTypeEnum.Map} size="lg" />
            </Link>
            <button className="absolute right-2.5 top-0" onClick={handleNavToggle}>
                <Icon iconType={IconTypeEnum.Times} size="xs" />
            </button>
        </section>
    ) : (
        <button onClick={handleNavToggle}>
            <Icon iconType={IconTypeEnum.AngleDoubleRight} />
        </button>
    )
}
