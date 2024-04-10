export default function validateRegisterForm(form) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-zñÑ]+$/;
  if (!form.name) {
    errors.name = "Debe ingresar un nombre*";
  } else if (form.name.length > 30) {
    errors.name = "El nombre debe tener un máximo de 50 caracteres*";
  } else if (!nameRegex.test(form.name)) {
    errors.name = "El nombre debe contener solo letras*";
  }
  if (!form.lastName) {
    errors.lastName = "Debe ingresar un apellido*";
  } else if (form.lastName.length > 30) {
    errors.lastName = "El apellido debe tener un máximo de 50 caracteres*";
  } else if (!nameRegex.test(form.lastName)) {
    errors.lastName = "El apellido debe contener solo letras*";
  }
  if (!form.mail) {
    errors.mail = "Debe ingresar un email*";
  }
  if (!emailRegex.test(form.mail)) {
    errors.mail = "El formato del email no es válido*";
  }
  if (!form.password) {
    errors.password = "Debe ingresar una contraseña*";
  } else if (form.password.length < 8 || form.password.length > 64) {
    errors.password = "La contraseña debe tener entre 8 y 64 caracteres*";
  }
  return errors;
}
