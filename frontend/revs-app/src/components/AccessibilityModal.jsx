import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoogleTranslate from "./GoogleTranslate";

import "bootstrap/dist/css/bootstrap.min.css";
import "../static/css/AccessibilityModal.css";

/**
 * This function will create a modal to house the accesssibility functions such as increase font size and googel translate 
 * @returns returns a modal with accessibility functions 
 */
const AccessibilityModal = () => {
    let currentScreenFocusStatus = localStorage.getItem("screenfocus");
    let initialToggleButtonStyle = "dark";
    let initialToggleButtonText = "Off"
    if (currentScreenFocusStatus === "true") {
        initialToggleButtonStyle = "light";
        initialToggleButtonText = "On";
    }

    const [displayModal, setDisplayModal] = useState(false);
    const [currentFontSize, setCurrentFontSize] = useState(16);
    const [toggleButtonStyle, setToggleButtonStyle] = useState(initialToggleButtonStyle);
    const [toggleButtonText, setToggleButtonText] = useState(initialToggleButtonText);
    const [fontSizeChanged, setFontSizeChanged] = useState("false");

    // localStorage.setItem("fontsize", 16);
    // localStorage.setItem("screenfocus", false);
    /**
     * Function will open the modal
     */
    const openModal = () => {
        setDisplayModal(true);
        if (!localStorage.getItem("fontsize")) {
            console.log("not set")
            localStorage.setItem("fontsize", 16);
        }
        setCurrentFontSize(parseInt(localStorage.getItem("fontsize")));
    }
    /**
     * Function will close the modal
     */
    const closeModal = () => {
        setDisplayModal(false);
        window.location.reload(true);
    }
    const hideModal = () => {
        setDisplayModal(false);
        //window.location.reload(true);
    }
    const saveButtonHandler = () => {
        hideModal();
        if (fontSizeChanged === "true") {
            window.location.reload(true);
        }
    }
    /**
     * Function will increase font size
     */
    const increaseFontSize = () => {
        setCurrentFontSize(currentFontSize + 2);
        localStorage.setItem("fontsize", currentFontSize + 2);
        document.getElementById("num").innerText = currentFontSize;
        setFontSizeChanged("true");
    }
    /**
     * Function will decrease font size
     */
    const decreaseFontSize = () => {
        setCurrentFontSize(currentFontSize - 2);
        localStorage.setItem("fontsize", currentFontSize - 2);
        document.getElementById("num").innerText = currentFontSize;
        setFontSizeChanged("true");
    }
    /**
     * Function will toggle the screen focus
     */
    const handleScreenFocusToggle = () => {
        const prevVal = localStorage.getItem("screenfocus");
        if (prevVal === "true") {
            localStorage.setItem("screenfocus", false);
            setToggleButtonStyle("dark");
            setToggleButtonText("Off");
        } else if (prevVal === "false") {
            localStorage.setItem("screenfocus", true);
            setToggleButtonStyle("light");
            setToggleButtonText("On");
        }
        closeModal();
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
            <Modal show={displayModal} onHide={closeModal} animation={false} size="lg" style={{ fontSize: `${parseInt(localStorage.getItem("fontsize"))}px` }}>
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
                    <div class="mt-3 mb-3">
                        Google Translate
                    </div>
                    <div class="mt-3 mb-3">
                        <center><GoogleTranslate></GoogleTranslate></center>
                    </div>
                    <hr />
                    <div class="mt-3 mb-3">
                        Screen Focus
                    </div>
                    <div class="mt-3 mb-3">
                        <Button variant={toggleButtonStyle} id="screenFocus" onClick={handleScreenFocusToggle}>{toggleButtonText}</Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="save" variant="primary" onClick={saveButtonHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AccessibilityModal;