export default function formatDate(value) {
  let originalDate = value;
  let dateParts = originalDate.split("-");
  let transformedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];

  return transformedDate;
}
