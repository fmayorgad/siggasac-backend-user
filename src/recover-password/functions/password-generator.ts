/**
 * Generador de contraseñas
 *
 * @param passwordLength Cantidad de caracteres que contendrá el password a generar : Default (7)
 */

export const passwordGenerator = (passwordLength: number = 7) => {
    let password = '';
    let count = 0;
    const letters = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
    ];

    const symbols = ['@', '!', '#', '$', '&', '-', '_', '?', '+'];

    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let index = 0; index <= passwordLength; index++) {
        if (index % 2 === 0 && index !== 0) {
            count = Math.floor(Math.random() * letters.length);
            password += letters[count];
        }

        if (index === 0 || index === 5) {
            count = Math.floor(Math.random() * symbols.length);
            password += symbols[count];
        }

        if (index % 2 !== 0 && index !== 5) {
            count = Math.floor(Math.random() * numbers.length);
            password += numbers[count];
        }
    }

    return password;
};
