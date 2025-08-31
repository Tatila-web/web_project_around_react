import React from "react";
import { useFormValidation } from "@hooks/useFormValidation";

export default function NewCard({ onAddPlace, onClose }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({
      "card-name": "",
      link: "",
    });

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onAddPlace({ name: values["card-name"], link: values.link });
    resetForm();
    if (onClose) onClose();
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          className={`popup__input popup__input-title ${
            errors["card-name"] ? "popup__input_type_error" : ""
          }`}
          type="text"
          name="card-name"
          placeholder="Title"
          value={values["card-name"]}
          onChange={handleChange}
          required
          minLength="2"
        />
        <span
          className={`popup__input-error ${
            errors["card-name"] ? "popup__input-error_active" : ""
          }`}
        >
          {errors["card-name"]}
        </span>
      </label>

      <label>
        <input
          className={`popup__input popup__input-link ${
            errors.link ? "popup__input_type_error" : ""
          }`}
          type="url"
          name="link"
          placeholder="Image link"
          value={values.link}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            errors.link ? "popup__input-error_active" : ""
          }`}
        >
          {errors.link}
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
