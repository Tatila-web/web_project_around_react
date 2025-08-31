import { useEffect, useContext } from "react";
import { useFormValidation } from "@hooks/useFormValidation";
import { CurrentUserContext } from "@contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);

  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({
      avatar: "",
    });

  // Corrigido: só resetar se o avatar mudar
  useEffect(() => {
    if (currentUser?.avatar && values.avatar !== currentUser.avatar) {
      resetForm({ avatar: currentUser.avatar }, {}, true);
    }
  }, [currentUser?.avatar]); // ✅ depende só do avatar

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    handleUpdateAvatar({ avatar: values.avatar });
    if (onClose) onClose();
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label>
        <input
          type="url"
          name="avatar"
          placeholder="Avatar link"
          className={`popup__input popup__input-link ${
            errors.avatar ? "popup__input_type_error" : ""
          }`}
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        <span
          className={`popup__input-error ${
            errors.avatar ? "popup__input-error_active" : ""
          }`}
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
