import React from 'react'

const { useRef, useEffect } = React;
window.onerror = console.log;

function handleEnter({ isFocusPresent, activeElement }) {
  if (!isFocusPresent) return;

  if (
    activeElement.nodeName === "INPUT" &&
    ["radio", "checkbox", "button"].includes(activeElement.type)
  ) {
    activeElement.click();
  }
}

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


function useArrowKeyNavigation({selectors}){
  const parentNode = useRef();

  useEffect(() => {
    const eventHandler = (e) => handleEvents({ e, parentNode: parentNode.current, selectors });
    document.addEventListener("keydown", eventHandler);
    return () => document.addEventListener("keydown", eventHandler);
  }, []);
  
  return parentNode;
}

function ArrowKeyNav({ selectors = "a,button,input", children }) {
  const parentNode = useArrowKeyNavigation({selectors})

  return (
    <div ref={parentNode}>
      {children}
    </div>
  );
}

export default ArrowKeyNav;
