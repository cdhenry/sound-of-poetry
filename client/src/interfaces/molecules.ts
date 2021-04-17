import React from 'react';
import { Props as ReactSelectProps } from 'react-select';

import { IInputProps, IShelfItem } from './atoms';

export interface IShelf {
    context: string
    items: IShelfItem[]
}

export interface ITextInputProps extends IInputProps {
    label: React.ReactNode
}

export interface ISelectProps extends ReactSelectProps {}

export interface IAsyncSelectProps extends ReactSelectProps {}
