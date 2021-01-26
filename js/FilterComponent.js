Vue.component('filter-component', {
    data () {
        return {userSearchRegex: ''}
    },
    template: 
    `<form action="#" class="search-form" @submit.prevent='$parent.filter(userSearchRegex)'>
         <input type="text" class="search-field" v-model='userSearchRegex' v-on:input='$parent.filter(userSearchRegex)'>
         <button type="submit" class="btn-search">
             <i class="fas fa-search"></i>
         </button>
     </form>`
//   <form action="#" class="search-form" @submit.prevent="filter">
//       <input type="text" class="search-field" v-model="userSearch">
//       <button type="submit" class="btn-search">
//           <i class="fas fa-search"></i>
//       </button>
//   </form>
    
})

