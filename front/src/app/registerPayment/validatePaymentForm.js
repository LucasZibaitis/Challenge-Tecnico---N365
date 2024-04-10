export default function validatePaymentForm(payment) {
  const errors = {};
  const recipientRegex = /^[a-zA-ZñÑ\s]{1,50}$/;
  if (!payment.amount) {
    errors.amount = "Ingrese un monto*";
  } else if (payment.amount.length > 8) {
    errors.amount = "El monto debe tener un máximo de 8 cifras*";
  }
  if (!payment.type) {
    errors.type = "Seleccione un tipo de pago*";
  } else if (payment.type === "initial") {
    errors.type = "Seleccione un tipo de pago*";
  } else if (payment.type === "otro" && !payment.otherType) {
    errors.type = "Ingrese un tipo de pago*";
  }
  if (!payment.recipient) {
    errors.recipient = "Ingrese un destinatario*";
  } else if (!recipientRegex.test(payment.recipient)) {
    errors.recipient = "El destinatario debe contener solo letras*";
  } else if (payment.recipient.length > 30) {
    errors.recipient = "El destinatario debe tener un máximo de 30 caracteres*";
  }
  if (!payment.date) {
    errors.date = "Seleccione una fecha*";
  }
  return errors;
}
