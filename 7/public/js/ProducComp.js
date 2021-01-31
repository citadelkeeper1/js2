Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            categories: [],
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson(`/api/categories`)
            .then(data => {
                for(let el of data){
                    this.categories.push(el);
                }
            });
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products latest-proj-flex-container">
            <product v-for="item of filtered" :key="item.id_product" :img="item.product_img" :product="item" :cat="item.category_id"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img', 'cat'],
    data(){
        return {
            category: "",
        }
    },
    mounted(){
        for (i=0; i<this.$parent.categories.length; i++){
            if (this.$parent.categories[i].id == this.cat){
                this.category = this.$parent.categories[i].name;
            }
        }
    },
    template: `
    <div class="product-item latest-proj-article-preview">
                <img :src="img" alt="Some img" class="latest-proj-article-preview-photo" style="width: 370px; height: 237px;">
                <div class="desc latest-proj-article-preview_wrapper-title">
                    <h3  class="latest-proj-article-preview-title">{{product.product_name}}</h3>
					<span class="latest-proj-article-preview-txt">{{ this.category }}</span>
                    <p>{{product.price}} $</p>
                    <button class="buy-btn slider-link-btn" @click="$root.$refs.cart.addProduct(product)"><span class="slider-link-btn-txt">Купить</span></button>
                </div>
            </div>
    `
})