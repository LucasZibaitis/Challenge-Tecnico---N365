export default function validateForm(payment) {
  const errors = {};
  if (!payment.amount) {
    errors.amount = "Debe ingresar un monto*";
  }
  if (!payment.type) {
    errors.type = "Debe seleccionar un tipo de pago";
  }
  if (!payment.recipient) {
    errors.recipient = "Debe ingresar un destinatario";
  }
  if (!payment.date) {
    errors.date = "Debe seleccionar una fecha";
  }
  return errors;
}
