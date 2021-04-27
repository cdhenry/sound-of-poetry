import React from 'react';

import Icon from '../components/atoms/Icon';
import { IconTypeEnum } from '../enums/iconType';
import { IModalProps } from '../interfaces/templates';

function ModalTemplate(props: IModalProps): JSX.Element {
    return props.isActive ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                    <div className="relative">
                        <div className="absolute top-1 right-4 cursor-pointer" onClick={props.closeModal}>
                            <Icon iconType={IconTypeEnum.Times} />
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    ) : (
        <>{props.children}</>
    )
}

export default ModalTemplate
