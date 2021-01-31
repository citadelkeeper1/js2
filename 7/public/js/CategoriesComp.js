Vue.component('categories', {
    data(){
        return {
            categories: [],
        }
    },
    mounted(){
        this.$parent.getJson(`/api/categories`)
            .then(data => {
                for(let el of data){
                    this.categories.push(el);
                }
            });
    },
    template: `
                <div class="latest-proj-menu">
                    <button class="latest-proj-btn proj-btn-active">All</button>
                    <button class="latest-proj-btn" v-for="cat of categories">{{ cat['name'] }}</button>
                </div>
    `
});


