export const calculateAge = (birthDate: string | string[]): number => {
  const birthDateString = Array.isArray(birthDate) ? birthDate[0] : birthDate;

  const birthDateObj = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  const dayDifference = today.getDate() - birthDateObj.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};
