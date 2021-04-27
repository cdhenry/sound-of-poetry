import React from 'react';

export default function Button(
    props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
): JSX.Element {
    const defaultClassName =
        'font-label flex flex-row items-center p-2 rounded-lg bg-indigo-100 border-2 border-gray-500 hover:bg-blue-500 hover:text-white'

    return (
        <button {...props} className={defaultClassName}>
            {props.children}
        </button>
    )
}
