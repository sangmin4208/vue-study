<template>
  <div class="block" v-if="showBlock" @click="stopTimer">
      click me
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
export default {
    props:['delay'],
    setup(props,context){
        const showBlock = ref(false)
        const timer = ref(null)
        const reactionTime = ref(null)
        onMounted(()=>{
            setTimeout(()=>{
                showBlock.value = true
                startTimer()
            },props.delay)
        })
        function startTimer(){
            timer.value = setInterval(()=>{
                reactionTime.value += 10 
            }, 10)
        }
        function stopTimer(){
            clearInterval(timer.value)
            context.emit('end', reactionTime)
        }
        return {showBlock, timer, reactionTime, startTimer,stopTimer}
    },


}
</script>

<style>
.block  {
    width: 400px;
    border-radius: 20px;
    background: #0faf87;
    color: white;
    text-align: center;
    padding: 90px 0;
    margin: 40px auto;
    font-size: 1.5em;
    font-weight: bold;
}
</style>