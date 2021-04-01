<template>
  <div class="container mx-auto mt-4 p-4">{{ logs }} </div>
</template>

<script>
console.log(123)
import axios from 'axios'

export default {
    
  async asyncData() {
    
    const api = 'http://localhost:3000/all-logs'
    // const logs = await fetch(api).then((response) => {
    //   return response.json()
    // }) 
    const logs = await axios.get(api).then((response)  => {
      return response.data
    })
    return { logs }
  },
}
</script>
