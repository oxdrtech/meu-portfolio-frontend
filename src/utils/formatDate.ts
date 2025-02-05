export const formatDate = (dateString: string) => {
  if (!dateString) return "Data inválida";
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) return "Data inválida";
  return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(new Date(`${year}/${month}/${day}`));
};
