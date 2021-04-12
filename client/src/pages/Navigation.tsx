import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleRight,
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

library.add(faBook, faHome, faMicrophone, faPen, faMapMarkerAlt, faAngleDoubleRight, faTimes)

export default function Navigation(): JSX.Element {
    const defaultClassName =
        'flex flex-col justify-around items-center px-5 min-h-1/2-screen border border-2 border-gray-500 rounded bg-indigo-100 shadow-lg'
    const linkClassName =
        'hover:transform hover:scale-150 transition delay-50 duration-100 ease-in ease-out active:text-gray-500'
    const [isNavVisible, setIsNavVisible] = useState(true)
    const handleNavToggle = () => setIsNavVisible(!isNavVisible)

    return isNavVisible ? (
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
    ) : (
        <button onClick={handleNavToggle}>
            <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
    )
}
