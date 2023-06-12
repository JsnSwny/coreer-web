import globalStyles from "@/styles/globalStyles.module.scss";
import Modal from "../../Modal/Modal";
import { ChangeEvent, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import LocationSearchInput from "@/components/Forms/Inputs/LocationSearchInput";

interface ModalFormProps {
  closeModal: () => void;
}

const DetailsModalForm = ({ closeModal }: ModalFormProps) => {
  const { user, updateUser } = useAuth();
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [location, setLocation] = useState(user?.location ? user.location : "");
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio ? user.bio : "")

  const onSubmit = () => {
    // onSave(inputValue);
    updateUser({
      location,
      first_name: firstName,
      last_name: lastName,
      username,
      bio
    });
    // setInputValue("");
    closeModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={globalStyles.modalBody}>
        <div className={globalStyles.formTwoColumn}>
          <div className={globalStyles.formGroup}>
            <label className={globalStyles.label}>First Name</label>
            <input
              autoFocus
              className={globalStyles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={globalStyles.formGroup}>
            <label className={globalStyles.label}>Last Name</label>
            <input
              className={globalStyles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Username</label>
          <input
            className={globalStyles.input}
            value={username}
            disabled
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Location</label>
          <LocationSearchInput location={location} setLocation={setLocation} />
        </div>
        <div className={globalStyles.formGroup}>
          <label className={globalStyles.label}>Bio</label>
          <textarea
            className={globalStyles.input}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          ></textarea>
        </div>
      </div>

      
      <div className={globalStyles.modalFooter}>
        <Button text="Save" />
      </div>
    </form>
  );
};

export default DetailsModalForm;
