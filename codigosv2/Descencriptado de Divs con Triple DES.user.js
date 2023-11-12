/// ==UserScript==
// @name         Descencriptado de Divs con Triple DES
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Detecta mayúsculas, IDs de divs y prueba el método de desencriptación Triple DES con CryptoJS.
// @author       You
// @match        https://cripto.tiiny.site
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js#sha512-a+SUDuwNzXDvz4XrIcXHuCf089/iJAoN4lmrXJg18XnduKK6YlDHNRalv4yd1N40OKI80tFidF+rqTFKGPoWFQ==
// ==/UserScript==

(function() {
    'use strict';

    var clave = ''; // Variable para almacenar la clave obtenida

    // Define la función detectar
    function detectar() {
        // Obtén el cuerpo de la página
        var body = document.body;

        // Encuentra todas las letras mayúsculas en el cuerpo
        var letrasMayusculas = body.innerText.match(/[A-Z]/g);

        // Convierte el array de letras en una cadena
        var resultado = letrasMayusculas ? letrasMayusculas.join('') : 'No se encontraron letras mayúsculas';

        // Almacena el resultado como la clave
        clave = resultado;

        // Imprime el resultado en la consola
        console.log('Tu llave es: ' + resultado);
    }

    // Define la función desencriptar
    function desencriptar(clave) {
        const elementsWithClassM = document.querySelectorAll('[class*="M"]');
        const numberOfElements = elementsWithClassM.length;

        console.log(`Los mensajes cifrados son: ${numberOfElements}`);

        const configure = {
              mode: CryptoJS.mode.ECB
         };

        elementsWithClassM.forEach(element => {
            const idCiphertext = element.id;
            const encryptionKey = CryptoJS.enc.Utf8.parse(clave);

            // Aqui desencripta el id
            const idDecrypted = CryptoJS.TripleDES.decrypt(idCiphertext, encryptionKey, configure);

            console.log(`${element.id} ${idDecrypted.toString(CryptoJS.enc.Utf8)}`);
            const decryptedText = idDecrypted.toString(CryptoJS.enc.Utf8);
            const h2Element = document.createElement('h2');
            h2Element.textContent = decryptedText;
            document.body.appendChild(h2Element);
        });
    }

    // Llama a la función detectar cuando el contenido de la página está cargado
    document.addEventListener('DOMContentLoaded', detectar);

    // Llama a la función desencriptar cuando el contenido de la página está cargado
    document.addEventListener('DOMContentLoaded', function() {
        desencriptar(clave);
    });
})();
