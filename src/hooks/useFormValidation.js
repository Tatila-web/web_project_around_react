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
      if (name === "card-name" || name === "name" || name === "about") {
        if (value.trim().length < 2) {
          const length = value.trim().length;
          errorMessage = `Aumente este texto para 2 ou mais caracteres (atualmente, está a utilizar ${length} caráter${
            length === 1 ? "" : "es"
          }).`;
        }
      }
      if (name === "link" || name === "avatar") {
        const urlPattern = /^(https?:\/\/[^\s]+)$/i;
        if (!urlPattern.test(value.trim())) {
          errorMessage = "Por favor, insira uma URL válida";
        }
      }
    }

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));

    const newValues = { ...values, [name]: value };
    const newErrors = { ...errors, [name]: errorMessage };

    const allFieldsFilled = Object.values(newValues).every(
      (val) => val.trim() !== ""
    );
    const noErrors = Object.values(newErrors).every((err) => err === "");

    setIsValid(allFieldsFilled && noErrors);
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
