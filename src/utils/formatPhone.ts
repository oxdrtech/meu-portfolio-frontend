export function formatPhone(value: string) {
  // Remove tudo que não for número
  const cleaned = value.replace(/\D/g, '');

  if (cleaned.length <= 8) {
    // Formato: 9999-9999
    return cleaned.replace(/^(\d{4})(\d{4})$/, '$1-$2');
  } else if (cleaned.length === 9) {
    // Formato: 99999-9999
    return cleaned.replace(/^(\d{5})(\d{4})$/, '$1-$2');
  } else if (cleaned.length === 10) {
    // Formato: (99) 9999-9999
    return cleaned.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  } else if (cleaned.length === 11) {
    // Formato: (99) 99999-9999
    return cleaned.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  }

  // Retorna o número original se não atender aos formatos acima
  return value;
}
