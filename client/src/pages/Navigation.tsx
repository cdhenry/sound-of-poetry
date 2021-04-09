import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleDown,
  faBook,
  faHome,
  faMapMarkerAlt,
  faMicrophone,
  faPen,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { RoutesEnum } from '../enums/routes';

library.add(faBook, faHome, faMicrophone, faPen, faMapMarkerAlt, faTimes)

export default function Navigation(): JSX.Element {
    const defaultClassName =
        'relative flex justify-around items-center p-5 min-w-1/2 border border-2 border-gray-500 rounded bg-indigo-100 shadow-lg'
    const linkClassName =
        'hover:transform hover:scale-150 transition delay-100 duration-200 ease-in ease-out active:text-gray-500'
    const [isNavVisible, setIsNavVisible] = useState(true)
    const handleNavToggle = () => setIsNavVisible(!isNavVisible)

    return (
        <>
            <div className="left-4 top-1">
                <button className="" onClick={handleNavToggle}>
                    {!isNavVisible && <FontAwesomeIcon icon={faAngleDoubleDown} />}
                </button>
            </div>
            {isNavVisible && (
                <nav className="flex justify-center">
                    <section className={defaultClassName}>
                        <Link to={RoutesEnum.Home} className={linkClassName}>
                            <FontAwesomeIcon icon={faHome} size="lg" />
                        </Link>
                        <Link to={RoutesEnum.Library} className={linkClassName}>
                            <FontAwesomeIcon icon={faBook} size="lg" />
                        </Link>
                        <Link to={RoutesEnum.Theater} className={linkClassName}>
                            <FontAwesomeIcon icon={faMicrophone} size="lg" />
                        </Link>
                        <Link to={RoutesEnum.Studio} className={linkClassName}>
                            <FontAwesomeIcon icon={faPen} size="lg" />
                        </Link>
                        <Link to={RoutesEnum.Map} className={linkClassName}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                        </Link>
                        <button className="absolute right-2.5 top-0" onClick={handleNavToggle}>
                            <FontAwesomeIcon icon={faTimes} size="xs" />
                        </button>
                    </section>
                </nav>
            )}
        </>
    )
}
