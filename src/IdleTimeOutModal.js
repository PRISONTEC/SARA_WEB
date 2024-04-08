import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';

export const IdleTimeOutModal = ({showModal, handleContinue, handleLogout, remainingTime}) => {
    console.log(handleLogout)
    return (
        <>

        <Dialog open={showModal}>
            <DialogTitle>Tu sesión de ingreso ha expirado, incia sesión nuevamente...</DialogTitle>
            <DialogContent>
                <Button onClick={handleLogout} variant="contained">Login</Button>
            </DialogContent>
        </Dialog>

        {/*<Modal show={showModal} onHide={handleContinue}>
            <Modal.Header closeButton>
            <Modal.Title>You Have Been Idle!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your session is Timed Out. You want to stay?</Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleLogout}>
                Logout
            </Button>
            <Button variant="primary" onClick={handleContinue}>
                Continue Session
            </Button>
            </Modal.Footer>
        </Modal>*/}
        </>
    )
}