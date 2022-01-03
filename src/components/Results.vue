<template>
  <p>Reaction time: {{score}} ms</p>
  <p class="rank"> {{rank}}</p>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { ref } from "vue"
export default {
    props:['score'],
    setup({score}){
        const rank = ref(null)
        onMounted(()=>{
            if (score < 250){
                rank.value = 'Ninja Fingers'
            } else if (score < 400) {
                rank.value = "Rapid Reflexes"
            }else {
                rank.value ='Snail pace...'
            }
        })
        return {rank}
    }
}
</script>

<style scoped>
    .rank {
        font-size: 1.4em;
        color: #0faf87;
        font-weight: bold;
    }
</style>