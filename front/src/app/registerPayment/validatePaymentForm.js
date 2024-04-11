export default function validatePaymentForm(payment) {
  const errors = {};
  const onlyLettersRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,50}$/;
  const onlyNumbersRegex = /^-?\d+(\.\d+)?$/;

  console.log(payment.amount);

  if (!payment.amount) {
    errors.amount = "Ingrese un monto*";
  } else if (!onlyNumbersRegex.test(payment.amount)) {
    errors.amount = "El monto debe contener solo números*";
  } else if (parseFloat(payment.amount) <= 0) {
    errors.amount = "El monto debe ser mayor que cero*";
  } else if (parseFloat(payment.amount) > 99999999.99) {
    errors.amount = "El monto debe tener un máximo de 8 cifras*";
  }
  if (!payment.type) {
    errors.type = "Seleccione un tipo de pago*";
  } else if (payment.type === "initial") {
    errors.type = "Seleccione un tipo de pago*";
  } else if (payment.type === "Otro") {
    errors.type = "Ingrese un tipo de pago*";
  } else if (!onlyLettersRegex.test(payment.type)) {
    errors.type = "El tipo de pago debe contener solo letras*";
  }
  if (!payment.recipient) {
    errors.recipient = "Ingrese un destinatario*";
  } else if (!onlyLettersRegex.test(payment.recipient)) {
    errors.recipient = "El destinatario debe contener solo letras*";
  } else if (payment.recipient.length > 30) {
    errors.recipient = "El destinatario debe tener un máximo de 30 caracteres*";
  }
  if (!payment.date) {
    errors.date = "Seleccione una fecha*";
  }
  return errors;
}
