const product = {
    props: ['product'],
    template: `
    <div class="product-item">
                <img :src="product.img" width="200" height="150" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `
};

const products = {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
        }
    },
    components: {
        product
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
};

export default products