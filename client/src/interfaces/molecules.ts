import React from 'react';

import { IInputProps, IShelfItem } from './atoms';

export interface IShelf {
    context: string
    items: IShelfItem[]
}

export interface ITextInputProps extends IInputProps {
    label: React.ReactNode
}
