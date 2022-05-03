const months = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const datePipe = {
  getDateName: (stringDate) => {
    const date = new Date(stringDate);
    return `${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()}`;
  },
};

export default datePipe;
