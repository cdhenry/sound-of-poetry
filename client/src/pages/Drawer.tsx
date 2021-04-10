import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

library.add(faTimes)

export default function Drawer(): JSX.Element {
    const [isAsideVisible, setIsAsideVisible] = useState(false)
    const defaultClassName =
        'flex flex-col justify-around items-center w-64 min-h-3/4-screen border border-2 border-gray-500 rounded bg-indigo-100 shadow-lg'
    const handleAsideToggle = () => setIsAsideVisible(!isAsideVisible)

    return isAsideVisible ? (
        <section className={defaultClassName}>
            <button className="absolute right-2.5 top-0" onClick={handleAsideToggle}>
                <FontAwesomeIcon icon={faTimes} size="xs" />
            </button>
            <section className="flex flex-col justify-center items-center">Drawer</section>
        </section>
    ) : (
        <button onClick={handleAsideToggle}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </button>
    )
}
