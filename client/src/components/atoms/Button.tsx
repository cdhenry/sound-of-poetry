import React from 'react';

export default function Button(
    props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
): JSX.Element {
    const defaultClassName =
        'font-label flex flex-row items-center py-2.5 px-3.5 rounded-lg bg-white text-blue border-2 border-blue-500 hover:bg-blue-900 hover:text-white active:bg-blue-900 active:text-white'

    return (
        <button {...props} className={defaultClassName}>
            {props.children}
        </button>
    )
}
