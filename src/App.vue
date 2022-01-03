<template>
  <h1>Reaction Timer</h1>
  <button @click="start" :disabled="isPlaying">play</button>
  <Block v-if=isPlaying :delay="delay" @end="endGame"/>
  <Results v-if="showResults" :score="score"/>
</template>

<script>
import Block from "./components/Block.vue"
import Results from "./components/Results.vue"
import {reactive, toRefs} from "vue"
export default {
  setup(){
    const game = reactive({
      isPlaying: false,
      delay: null,
      score: null,
      showResults: false
    })
 
    function start(){
      game.delay = 500 + Math.random() * 5000
      game.isPlaying = true
      game.showResults = false
    }
    function endGame(reactionTime){
      game.score = reactionTime
      game.isPlaying = false
      game.showResults = true
    }
    return {...toRefs(game),start,endGame}
  },
  name: 'App',
  components: {
    Block, Results
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #444;
  margin-top: 60px;
}
button {
  background: #0faf87;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
  margin: 10px;
}
button[disabled]{
  opacity: 0.2;
  cursor: not-allowed;
}
</style>
