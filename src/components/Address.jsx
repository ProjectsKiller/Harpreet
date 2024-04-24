import { useRef, useEffect, useState } from "react";

const AutoComplete = () => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const [autocompleteError, setAutocompleteError] = useState(null);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=<AIzaSyD9FmgRi8AeQdOwyqV62fnH_1xhO-e1ISU>&libraries=places`;
      script.async = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      try {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(
          inputRef.current,
          { types: ["geocode"] }
        );
      } catch (error) {
        setAutocompleteError(error.message);
      }
    };

    if (!window.google) {
      loadScript();
    } else {
      initializeAutocomplete();
    }
  }, []);

  return (
    <div>
      <label>Enter address:</label>
      <input ref={inputRef} />
      {autocompleteError && <p>Error: {autocompleteError}</p>}
    </div>
  );
};

export default AutoComplete;
