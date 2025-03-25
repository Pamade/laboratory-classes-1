// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.

// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.

// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.


const STATUS_CODE = require("../constants/statusCode");
const productRouting = require("./product");
const homeRouting = require("./home")
const logoutRouting = require("./logout")


const requestRouting = (request, response) => {
    const logMessage = (type, message) => {
        console.log(`[${type}] ${new Date().toISOString()} - ${message}`);
    };

    logMessage("INFO", `Metoda: ${request.method}, URL: ${request.url}`);

    if (request.url === "/") {
        return homeRouting(request, response);
    } else if (request.url.startsWith("/product")) {
        return productRouting(request, response);
    } else if (request.url === "/logout") {
        return logoutRouting(request, response);
    } else if (request.url === "/kill") {
        logMessage("PROCESS", "Wylogowanie wywołane, aplikacja zamknie się.");
        process.exit();
    } else {
        response.statusCode = STATUS_CODE.NOT_FOUND;
        response.setHeader("Content-Type", "text/plain");
        response.write("404 Not Found");
        logMessage("ERROR", `Żądany URL ${request.url} nie istnieje.`);
        return response.end();
    }
};

module.exports = requestRouting;
