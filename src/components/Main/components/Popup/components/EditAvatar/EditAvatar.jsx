import React from "react";
import { useFormValidation } from "@hooks/useFormValidation";

export default function EditAvatar() {
  const { values, errors, isValid, handleChange } = useFormValidation({
    avatar: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    console.log("Enviar avatar:", values);
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <label>
        <input
          type="url"
          name="avatar"
          placeholder="Avatar link"
          value={values.avatar}
          onChange={handleChange}
          required
          aria-describedby="avatar-link-error"
          className={`popup__input popup__input-link ${
            errors.avatar ? "popup__input_type_error" : ""
          }`}
        />
        <span
          className={`popup__input-error ${
            errors.avatar ? "popup__input-error_active" : ""
          }`}
          id="avatar-link-error"
        >
          {errors.avatar}
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
