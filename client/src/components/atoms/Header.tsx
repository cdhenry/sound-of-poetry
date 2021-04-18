import React from 'react';

import { HeaderTypeEnum } from '../../enums/headerType';
import { IHeaderProps } from '../../interfaces/atoms';

function Header(props: IHeaderProps): JSX.Element {
    const { headerType, ...HTMLProps } = props
    const defaultClassName = 'font-header font-bold mb-10'

    switch (headerType) {
        case HeaderTypeEnum.HeroJumbo:
            return (
                <h1 {...HTMLProps} className={defaultClassName + ' text-6xl'}>
                    {props.children}
                </h1>
            )
        case HeaderTypeEnum.HeroWeb:
            return (
                <h2 {...HTMLProps} className={defaultClassName + ' text-5xl'}>
                    {props.children}
                </h2>
            )
        case HeaderTypeEnum.HeaderWeb:
            return (
                <h3 {...HTMLProps} className={defaultClassName + ' text-4xl'}>
                    {props.children}
                </h3>
            )
        case HeaderTypeEnum.HeaderMobile:
            return (
                <h4 {...HTMLProps} className={defaultClassName + ' text-3xl'}>
                    {props.children}
                </h4>
            )
        case HeaderTypeEnum.CardHeadlineWeb:
            return (
                <h5 {...HTMLProps} className={defaultClassName + ' text-2xl'}>
                    {props.children}
                </h5>
            )
        case HeaderTypeEnum.CardHeadlineMobile:
            return (
                <h6 {...HTMLProps} className={defaultClassName + ' text-xl'}>
                    {props.children}
                </h6>
            )
        default:
            return (
                <h6 {...HTMLProps} className={defaultClassName + ' text-xl'}>
                    {props.children}
                </h6>
            )
    }
}

export default Header
