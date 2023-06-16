import globalStyles from "@/styles/globalStyles.module.scss";
import { Controller } from "react-hook-form";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import styles from "./LocationSearchInput.module.scss";

interface LocationSearchInputProps {
  control: any;
  errors: any;
}

const LocationSearchInput = ({ control, errors }: LocationSearchInputProps) => {
  const handleChange = (address: string) => {
    console.log(address);
  };

  const handleSelect = async (address: string) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <Controller
      control={control}
      name="location"
      render={({ field }) => (
        <PlacesAutocomplete
          value={field.value}
          onSelect={field.onChange}
          onChange={field.onChange}
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
                      key={suggestion.id}
                    >
                      {description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      )}
    />
  );
};

export default LocationSearchInput;
