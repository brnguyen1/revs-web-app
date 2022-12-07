import React from 'react'

const { useRef, useEffect } = React;
window.onerror = console.log;

/**
 * this function will press enter on an element if it is on one.
 * @param isFocusPresent if the webpage is already focused on an item
 * @param activeElement the element that is currently being focused on 
 * @returns presses enter on the active element
 */
function handleEnter({ isFocusPresent, activeElement }) {
  if (!isFocusPresent) return;

  if (
    activeElement.nodeName === "INPUT" &&
    [ "button"].includes(activeElement.type)
  ) {
    activeElement.click();
  }
}
/**
 * 
 * @param key the button that is currently being pressed 
 * @param isFocusPresent if the webpage is already focused on an item
 * @param activeElement the element that is currently being focused on 
 * @param availableElement the key that is being pressed
 * @param availableElements the keys that can be pressed with an associated function
 */
function handleArrowKey({
  key,
  isFocusPresent,
  availableElement,
  activeElement,
  availableElements
}) {
  console.log({ isFocusPresent, activeElement, availableElement });
  // If the focus isn't in the container, focus on the first thing
  if (!isFocusPresent) availableElements[0].focus();

  // Which index are we currently selected
  const currentIndex = Array.from(availableElements).findIndex(
    (availableElement) => availableElement === activeElement
  );

  // Move the focus up or down
  if (key === "ArrowRight") {
    availableElements[currentIndex + 1]?.focus();
  }

  if (key === "ArrowLeft") {
    availableElements[currentIndex - 1]?.focus();
  }
}
/**
 * if desired key isnt selected put a message to the console
 * @param e action listener variable
 * @param parentNode reference to current place on the screen
 * @param selectors buttons to choose from
 *  
 */
function handleEvents({ e, parentNode, selectors }) {
  const key = e.key;
  if (!["ArrowLeft", "ArrowRight", "Enter"].includes(key)) {
    console.log("invalid key", key);
    return;
  }

  const activeElement = document.activeElement;
  const availableElements = parentNode.querySelectorAll(selectors);

  // No elements are available to loop through.
  if (!availableElements.length) return;
  const isFocusPresent = parentNode.contains(activeElement);

  if (key === "Enter") {
    handleEnter({ isFocusPresent, activeElement });
  }
  handleArrowKey({ key, isFocusPresent, activeElement, availableElements });
}

/**
 * uses event listener to wait for the desired buttons to be pressed
 * @param selectors buttons to choose from
 * @returns returns the parent node
 */
function useArrowKeyNavigation({selectors}){
  const parentNode = useRef();

  useEffect(() => {
    const eventHandler = (e) => handleEvents({ e, parentNode: parentNode.current, selectors });
    document.addEventListener("keydown", eventHandler);
    return () => document.addEventListener("keydown", eventHandler);
  }, []);
  
  return parentNode;
}
/**
 * 
 * @param selectors what types of buttons to choose from
 * @param children child node
 * @returns 
 */
function ArrowKeyNav({ selectors = "a,button,input", children }) {
  const parentNode = useArrowKeyNavigation({selectors})

  return (
    <div ref={parentNode}>
      {children}
    </div>
  );
}

export default ArrowKeyNav;
