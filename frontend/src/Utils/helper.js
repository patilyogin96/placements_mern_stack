export function convertDate(_date) {
  const d = new Date(_date);
  console.log(d.getMonth());

  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}
