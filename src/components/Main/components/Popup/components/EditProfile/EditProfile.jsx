import { useEffect, useContext } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import { CurrentUserContext } from "@contexts/CurrentUserContext"; // ✅ corrigido

export default function EditProfile({ onClose }) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({
      name: "",
      about: "",
    });

  useEffect(() => {
    if (currentUser?.name && currentUser?.about) {
      resetForm({ name: currentUser.name, about: currentUser.about }, {}, true);
    }
    // só roda quando o id do user muda (não em todo render)
  }, [currentUser?._id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    handleUpdateUser({ name: values.name, about: values.about });
    if (onClose) onClose();
  }

  return (
    <form
      className="popup__form"
      name="profile-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className={`popup__input popup__input-name ${
            errors.name ? "popup__input_type_error" : ""
          }`}
          type="text"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="40"
        />
        <span
          className={`popup__input-error ${
            errors.name ? "popup__input-error_active" : ""
          }`}
        >
          {errors.name}
        </span>
      </label>

      <label>
        <input
          className={`popup__input popup__input-about ${
            errors.about ? "popup__input_type_error" : ""
          }`}
          type="text"
          name="about"
          placeholder="About"
          value={values.about || ""}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="200"
        />
        <span
          className={`popup__input-error ${
            errors.about ? "popup__input-error_active" : ""
          }`}
        >
          {errors.about}
        </span>
      </label>

      <button
        type="submit"
        className={`popup__submit-form ${
          !isValid ? "popup__submit-form_inactive" : ""
        }`}
        disabled={!isValid}
      >
        Salvar
      </button>
    </form>
  );
}
