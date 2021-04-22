import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBook,
  faFilm,
  faHome,
  faMapMarkerAlt,
  faMicrophone,
  faPen,
  faTimes,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { IconTypeEnum } from '../../enums/iconType';
import { IIconProps } from '../../interfaces/atoms';

library.add(
    faBook,
    faHome,
    faMicrophone,
    faPen,
    faMapMarkerAlt,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faTimes,
    faFilm,
    faVolumeUp
)

function Icon(props: IIconProps): JSX.Element {
    const { iconType, ...faProps } = props

    switch (iconType) {
        case IconTypeEnum.Audio:
            return <FontAwesomeIcon {...faProps} icon={faFilm} />
        case IconTypeEnum.Video:
            return <FontAwesomeIcon {...faProps} icon={faVolumeUp} />
        case IconTypeEnum.Book:
            return <FontAwesomeIcon {...faProps} icon={faBook} />
        case IconTypeEnum.Home:
            return <FontAwesomeIcon {...faProps} icon={faHome} />
        case IconTypeEnum.Microphone:
            return <FontAwesomeIcon {...faProps} icon={faMicrophone} />
        case IconTypeEnum.Pen:
            return <FontAwesomeIcon {...faProps} icon={faPen} />
        case IconTypeEnum.Map:
            return <FontAwesomeIcon {...faProps} icon={faMapMarkerAlt} />
        case IconTypeEnum.AngleDoubleRight:
            return <FontAwesomeIcon {...faProps} icon={faAngleDoubleRight} />
        case IconTypeEnum.AngleDoubleLeft:
            return <FontAwesomeIcon {...faProps} icon={faAngleDoubleLeft} />
        case IconTypeEnum.Times:
            return <FontAwesomeIcon {...faProps} icon={faTimes} />
        default:
            return <></>
    }
}

export default Icon
