export default function generateCardNumber(str) {
  const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const numbersArray = Array.from({ length: 16 }, (_, i) => (i + hash) % 10);
  const cardNumber = numbersArray
    .join('')
    .replace(/(.{4})/g, '$1 ')
    .trim();

  return cardNumber;
}
