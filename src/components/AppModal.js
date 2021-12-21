import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const AppModal = ({ title, children, onDismiss, ...props }) => {
    return (
        <CModal {...props}>
            <CModalHeader closeButton>
                <CModalTitle>
                    {title}
                </CModalTitle>
            </CModalHeader>
            <CModalBody>
                {children}
            </CModalBody>
        </CModal>
    )
}

export default AppModal
