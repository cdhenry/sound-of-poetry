import { library } from '@fortawesome/fontawesome-svg-core';
import { faBook, faHome, faMapMarkerAlt, faMicrophone, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(faBook, faHome, faMicrophone, faPen, faMapMarkerAlt, faTimes)

export default function Navigation(props: { handleCloseNav: () => void }): JSX.Element {
    const defaultClassName =
        'relative my-2.5 flex justify-around items-center p-5 min-w-1/2 border border-2 border-black rounded bg-gray-50 shadow-lg'
    const buttonClassName =
        'hover:transform hover:scale-150 transition delay-100 duration-200 ease-in ease-out active:text-gray-500'

    return (
        <section className={defaultClassName}>
            <button className={buttonClassName}>
                <FontAwesomeIcon icon={faHome} size="lg" />
            </button>
            <button className={buttonClassName}>
                <FontAwesomeIcon icon={faBook} size="lg" />
            </button>
            <button className={buttonClassName}>
                <FontAwesomeIcon icon={faMicrophone} size="lg" />
            </button>
            <button className={buttonClassName}>
                <FontAwesomeIcon icon={faPen} size="lg" />
            </button>
            <button className={buttonClassName}>
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
            </button>
            <button className="absolute right-3 top-0.5" onClick={props.handleCloseNav}>
                <FontAwesomeIcon icon={faTimes} size="xs" />
            </button>
        </section>
    )
}
