export default function validateLoginForm(form) {
  const errors = {};
  if (!form.mail) {
    errors.mail = "Debe ingresar un email*";
  }
  if (!form.password) {
    errors.password = "Debe ingresar una contraseña*";
  }
  return errors;
}
