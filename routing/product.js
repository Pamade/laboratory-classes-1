// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.

const fs = require("fs")
const STATUS_CODE = require("../constants/statusCode")
// console.log(STATUS_CODE.FOUND)

const productRouting = () => {
    if (request.url === "/product/add" && request.method === "GET") {
        return renderAddProductPage(response);
    } else if (request.url === "/product/new" && request.method === "GET") {
        return renderNewProductPage(response);
    } else if (request.url === "/product/add" && request.method === "POST") {
        return addNewProduct(request, response);
    } else {
        response.statusCode = STATUS_CODE.NOT_FOUND;
        response.setHeader("Content-Type", "text/plain");
        return response.end("Not Found");
    }
}

const renderAddProductPage = (response) => {
    response.setHeader("Content-Type", "text/html");
    response.write("<html><head><title>Dodaj produkt</title></head><body>Some page xd</body></html>");
    return response.end();
};

const renderNewProductPage = (response) => {
    fs.readFile("product.txt", "utf8", (err, data) => {
        response.setHeader("Content-Type", "text/html");
        if (err) {
            throw new Error("Error ocurred")
        }
        console.log(data)
        return response.end();
    });
}

const addNewProduct = (request, response) => {
    let body = "";
    request.on("data", chunk => {
        body += chunk.toString();
    });
    request.on("end", () => {
        fs.writeFile("product.txt", product, err => {
            response.statusCode = STATUS_CODE.FOUND;
            response.setHeader("Location", "/product/new");
            return response.end();
        });
    });
};

module.export = productRouting