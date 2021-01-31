Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
            amount: 0,
            countGoods: 0
        }
    },
    methods: {
        addProduct(product) {

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            this.countGoods += 1;
                            this.amount += find.price;
                        }
                    });
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            let newCartItem = {
                                "id_product": prod.id_product,
                                "product_name": prod.product_name,
                                "product_img": prod.product_img,
                                "price": prod.price,
                                "quantity": 1
                            }
                            this.cartItems.push(newCartItem);
                            this.countGoods += 1;
                            this.amount += prod.price;
                        }
                    })
            }
        },
        remove(product) {
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].id_product === +product.id_product) {

                    this.$parent.deleteJson(`/api/cart/${this.cartItems[i].id_product}`, this.cartItems[i])
                        .then(data => {
                            if (data.result === 1) {
                                this.cartItems[i].quantity -= 1;
                                this.countGoods -= 1;
                                this.amount -= product.price;
                                if (this.cartItems[i].quantity === 0) {
                                    this.cartItems.splice(i, 1)
                                }

                            }
                        })
                }
            }
        }


    },
    mounted() {
        // this.$on('remove', this.remove);
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                    this.amount += el.price * el.quantity;
                    this.countGoods += el.quantity;
                }
            });
    }
    ,
    template: `
<div>
            <button class="btn-cart basket-btn" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <div class="cart-empty" v-if="!cartItems.length">
                    Корзина пуста.
                </div>
                <div v-if="cartItems.length">

                    <div class="cart-totals">Всего товаров в корзине: {{ countGoods }}<br>Общая стоимость: {{ amount }} $<hr></div>

                    <cart-item class="cart-item" 
                    v-for="item of cartItems" 
                    :key="item.id_product"
                    :cart-item="item" 
                    :img="item.product_img"
                    @remove="remove">
                    </cart-item>

                </div>

            </div>
</div>`
});



Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image" style="width: 100px;">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                            <p class="product-single-price">$ {{cartItem.price}} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>

`
});

/*

*/



