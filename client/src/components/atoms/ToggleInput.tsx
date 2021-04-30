import React from 'react';

import { IToggleInputProps } from '../../interfaces/atoms';

export default function ToggleInput(props: IToggleInputProps): JSX.Element {
    const toggleRightColor = props.isOnOff ? 'toggle-input-green' : 'toggle-input-blue'
    const toggleLeftColor = props.isOnOff ? 'bg-gray-400' : 'bg-blue-500'
    const inputClassName = `${toggleRightColor} toggle-input appearance-none transition-colors cursor-pointer w-16 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 ${toggleLeftColor}`

    return (
        <label className="flex items-center relative w-max cursor-pointer select-none">
            {props.label && <span className="mr-3">{props.label}</span>}
            <input type="checkbox" className={inputClassName} value={props.value} onClick={props.onClick} />
            <span className="absolute font-medium text-xs uppercase right-1 text-white"> {props.labelRight} </span>
            <span className="absolute font-medium text-xs uppercase right-8 text-white"> {props.labelLeft} </span>
            <span className="w-8 h-8 right-8 absolute rounded-full transform transition-transform bg-gray-600" />
        </label>
    )
}
