import React, { useEffect } from "react";
import { useFormValidation } from "@hooks/useFormValidation";

export default function EditProfile() {
  // Passa os valores iniciais para o hook
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({
      name: "Jacques Cousteau",
      about: "Explorador",
    });

  // Se quiser que ao abrir o popup o formulário "resete" para esses valores (útil se reabrir)
  useEffect(() => {
    resetForm(
      {
        name: "Jacques Cousteau",
        about: "Explorador",
      },
      {},
      true
    ); // true para setar isValid = true, se quiser
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;

    console.log("Enviar perfil:", values);
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
          value={values.name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="40"
          aria-describedby="profile-name-error"
        />
        <span
          className={`popup__input-error ${
            errors.name ? "popup__input-error_active" : ""
          }`}
          id="profile-name-error"
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
          value={values.about}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="200"
          aria-describedby="profile-about-error"
        />
        <span
          className={`popup__input-error ${
            errors.about ? "popup__input-error_active" : ""
          }`}
          id="profile-about-error"
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
