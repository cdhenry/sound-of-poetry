import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

library.add(faTimes)

export default function Drawer(): JSX.Element {
    const [isAsideVisible, setIsAsideVisible] = useState(true)
    return (
        <>
            <div className="absolute right-4 top-1">
                <button className="" onClick={() => setIsAsideVisible(!isAsideVisible)}>
                    {isAsideVisible ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faAngleDoubleLeft} />}
                </button>
            </div>
            {isAsideVisible && (
                <aside className="flex-none min-w-xs max-w-xs min-h-full bg-indigo-100">
                    <section className="flex flex-col justify-center items-center">Drawer</section>
                </aside>
            )}
        </>
    )
}
