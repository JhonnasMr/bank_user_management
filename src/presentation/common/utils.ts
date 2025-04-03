export const utils = {
    generateAccountNumber: () => {
        const timeStamp = Date.now().toString().slice(-8); //obtenemos los ultimos 8 digitos del time stamp
        const randomDdigits = Math.floor(100000 + Math.random() * 900000).toString(); //6 digitos
        return Number(timeStamp + randomDdigits); // nummemro de 14 digitos.
    }
}