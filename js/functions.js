function checkLength(string, count) {
  if (string.length <= count) {
    return true;
  }
  return false;
}

checkLength('проверяемая строка', 20);
checkLength('проверяемая строка', 18);
checkLength('проверяемая строка', 10);

function checkPalindrome(string) {
  let palindromString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    palindromString += string[i];
  }
  if (string.toLowerCase().replaceAll(' ', '') === palindromString.toLowerCase().replaceAll(' ', '')) {
    return true;
  }
  return false;
}

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

function extractNumber(input) {
  const str = input.toString();
  let resultString = '';
  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];
    const parsedChar = parseInt(currentChar, 10);
    if (!Number.isNaN(parsedChar)) {
      resultString += currentChar;
    }
  }
  if (resultString === '') {
    return NaN;
  }
  return parseInt(resultString, 10);
}

extractNumber('2023 год');
extractNumber('ECMAScript 2022');
extractNumber('1 кефир, 0.5 батона');
extractNumber('агент 007');
extractNumber('а я томат');
extractNumber(2023);
extractNumber(-1);
extractNumber(1.5);
