import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import "bootstrap/dist/css/bootstrap.min.css";
import "./AccessibilityModal.css";

const AccessibilityModal = () => {
    const [displayModal, setDisplayModal] = useState(false);
    const [currentFontSize, setCurrentFontSize] = useState(16);

    // localStorage.setItem("fontsize", 16);

    const openModal = () => {
        setDisplayModal(true);
        setCurrentFontSize(parseInt(localStorage.getItem("fontsize")));
    }
    const closeModal = () => {
        setDisplayModal(false);
        window.location.reload(true);
    }
    const increaseFontSize = () => {
        // document.getElementById("increaseFontSize").addEventListener('click', () => {
        //     const number = document.getElementById("num");
        //     number.style.fontSize = `${currentFontSize + 2}px`;
        // });
        setCurrentFontSize(currentFontSize + 2);
        localStorage.setItem("fontsize", currentFontSize + 2);
        document.getElementById("num").innerText = currentFontSize;
    }
    const decreaseFontSize = () => {
        // document.getElementById("decreaseFontSize").addEventListener('click', () => {
        //     const number = document.getElementById("num");
        //     number.style.fontSize = `${currentFontSize - 2}px`;
        // });
        setCurrentFontSize(currentFontSize - 2);
        localStorage.setItem("fontsize", currentFontSize - 2);
        document.getElementById("num").innerText = currentFontSize;
    }

    return (
        <div>
            {/* Button to activate accessibility modal */}
            <div class="accessibility-button">
                <Button variant="outline-primary" onClick={openModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-universal-access-circle" viewBox="0 0 16 16">
                        <path d="M8 4.143A1.071 1.071 0 1 0 8 2a1.071 1.071 0 0 0 0 2.143Zm-4.668 1.47 3.24.316v2.5l-.323 4.585A.383.383 0 0 0 7 13.14l.826-4.017c.045-.18.301-.18.346 0L9 13.139a.383.383 0 0 0 .752-.125L9.43 8.43v-2.5l3.239-.316a.38.38 0 0 0-.047-.756H3.379a.38.38 0 0 0-.047.756Z" />
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Z" />
                    </svg>
                </Button>
            </div>
            {/* Pop up modal to adjust accessibility settings */}
            <Modal show={displayModal} onHide={closeModal} backdrop="static" animation={false} size="lg" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
                <Modal.Header closeButton>
                    <Modal.Title id="title" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 12}px` }}>
                        Accessibility Settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="mb-3">
                        Adjust Text Size: <p id="num">{currentFontSize}</p>
                    </div>
                    <div>
                        <div class="mb-3">
                            <Button id="increaseFontSize" variant="secondary" onClick={increaseFontSize}>Increase Font Size</Button>
                        </div>
                        <div class="mb-3">
                            <Button id="decreaseFontSize" variant="secondary" onClick={decreaseFontSize}>Decrease Font Size</Button>
                        </div>
                    </div>
                    <hr />
                </Modal.Body>
                <Modal.Footer>
                    <Button id="save" variant="primary" onClick={closeModal}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AccessibilityModal;