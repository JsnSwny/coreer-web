import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import globalStyles from "@/styles/globalStyles.module.scss";
import styles from "./LocationSearchInput.module.scss";

interface LocationSearchInputProps {
  location: string;
  setLocation: (location: string) => void;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  location,
  setLocation,
}) => {
  const handleChange = (address: string) => {
    setLocation(address);
  };

  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
      setLocation(address);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //   const searchOptions = {
  //     types: ["(cities)"],
  //   };

  return (
    <PlacesAutocomplete
      value={location}
      onSelect={handleSelect}
      onChange={handleChange}
      searchOptions={{ types: ["locality", "country"] }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({ placeholder: "Enter location.." })}
            className={`${globalStyles.input} ${styles.input}`}
          />
          <div className={styles.suggestions}>
            {loading ? <div>Loading...</div> : null}
            {suggestions.map((suggestion, index) => {
              const { description } = suggestion;
              const style = {
                backgroundColor: suggestion.active ? "#e8e8e8" : "#ffffff",
              };
              return (
                <div
                  {...getSuggestionItemProps(suggestion)}
                  className={styles.suggestion}
                >
                  {description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
