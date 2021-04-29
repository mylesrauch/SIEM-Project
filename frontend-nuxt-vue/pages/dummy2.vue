<template>
  <div class="container mx-auto mt-4 p-4">{{ logs }} </div>
</template>

<script>
console.log(123)


export default {
  
// Olde Axios Function doesn't work here anymore ;(
//   async asyncData() {
    
//     const api = 'http://localhost:3000/all-logs'
//     // const logs = await fetch(api).then((response) => {
//     //   return response.json()
//     // }) 
//     const logs = await axios.get(api).then((response)  => {
//       return response.data
//     })
//     return { logs }
//   },
  async created() {
    this.pollData();
  },

  name: "Home",

  data() {
    return {
      logs: [],
    };
  },
  async fetch() {
    this.logs = await this.$axios.$get("/api/all-logs");

  },
  methods: {
    async pollData() {
      this.polling = setInterval(async () => {
        this.$fetch();
      }, 30000);
    },
  },
    beforeUnmount() {
      clearInterval(this.polling);
    },
};

</script>
