const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {  // глобальные свойства
        catalogUrl: '/catalogData.json',  // путь к каталогу товаров
        cartUrl: '/getBasket.json',  // путь к каталогу товаров
        products: [],  // список товаров
        imgCatalog: 'https://placehold.it/200x150',  // картинка
        
        userSearch: '',  // свойство для работы с фильтром
        isVisibleCart: false,
        cartItems: [],  // продукты в корзине
        amount: 0,
        countGoods: 0,
    },
    methods: {
        getJson(url){  // получаем каталог товаров
            return fetch(url)  // получаем файл
                .then(result => result.json())  // парсим json
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){  // добавление продукта в корзину
            for (item of this.cartItems) {  // ищем нужный элемент
                if (product.id_product == item.id_product) {
                    item.quantity += 1;  // если товар уже в корзине, увеличиваем количество на 1
                    this.countGoods += 1;
                    this.amount += product.price;
                    return;  // завершаем работу метода
                }
            }
            let newCartItem = {
                "id_product": product.id_product,
                "product_name": product.product_name,
                "price": product.price,
                "quantity": 1
            }
            this.cartItems.push(newCartItem);  // и добавляем товар в корзину
            this.countGoods += 1;
            this.amount += product.price;
            console.log(this.cartItems);
        },
        delProduct(product){  // удаление позиции из корзины
            for (item of this.cartItems) {  // ищем нужный элемент
                if (product.id_product == item.id_product) {
                    this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    this.countGoods -= product.quantity;
                    this.amount -= product.price * product.quantity;
                }
            }
        },
        delOneProduct(product){  // удаление одного продукта из корзины
            for (item of this.cartItems) {  // ищем нужный элемент
                if (product.id_product == item.id_product) {
                    if (item.quantity == 1) {
                        this.delProduct(product)
                    } else {
                        item.quantity -= 1;
                        this.countGoods -= 1;
                        this.amount -= product.price;
                    }
                }
            }
        },
        searchFilter(){  // фильтруем список товаров
            return this.products.filter(searchWhat => {  
                // проверяем вхождение строки поиска в имя товара
                return searchWhat.product_name.toLowerCase().includes(this.userSearch.toLowerCase())
            })
        }
    },
    mounted(){  // = onLoad
        // keyboard, gamepad
        this.getJson(`${API + this.catalogUrl}`)  // составляем url и вызываем метод получения json
            .then(data => {
                for(let el of data){  // добавляем товары из json в список products
                   this.products.push(el);
                }
            })  //.then(
        // ноутбук, мышка
        this.getJson(`getProducts.json`)  // получаем второй json-файл
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })  //.then(
        this.getJson(`${API + this.cartUrl}`)  // получаем json корзины
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
                this.amount = data.amount;
                this.countGoods = data.countGoods;
            })  //.then(

        // товар-заглушка
//        data => {
//            if (!this.products.length) {  // если не удалось загрузить список товаров
//                console.log('empty');
//                this.products.push({
//                    "id_product": 0,
//                    "product_name": "Нет данных",
//                    "price": "Нет данных"
//                })
//            }
//        })));

    }
})

