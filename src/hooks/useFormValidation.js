import { useState } from "react";

export function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );
  const [isValid, setIsValid] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    let errorMessage = "";

    if (!value.trim()) {
      errorMessage = "Preencha este campo";
    } else {
      if (["card-name", "name", "about"].includes(name)) {
        if (value.trim().length < 2) {
          const length = value.trim().length;
          errorMessage = `Aumente este texto para 2 ou mais caracteres (atualmente, está usando ${length}).`;
        }
      }
      if (["link", "avatar"].includes(name)) {
        const urlPattern = /^(https?:\/\/[^\s]+)$/i;
        if (!urlPattern.test(value.trim())) {
          errorMessage = "Por favor, insira uma URL válida";
        }
      }
    }

    // Usa prev para evitar estado "stale"
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };

      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));

      const allFieldsFilled = Object.values(newValues).every(
        (val) => val.trim() !== ""
      );
      const noErrors = Object.values({
        ...errors,
        [name]: errorMessage,
      }).every((err) => err === "");

      setIsValid(allFieldsFilled && noErrors);

      return newValues;
    });
  }

  function resetForm(
    newValues = initialValues,
    newErrors = {},
    newIsValid = false
  ) {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }

  return { values, errors, isValid, handleChange, resetForm };
}
