<template>
  <header>
    <h1>Monster Slayer</h1>
  </header>
  <section id="monster" class="container">
    <h2>Monster Health</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="monsterBarStyles"></div>
    </div>
  </section>
  <section id="player" class="container">
    <h2>Your Health</h2>
    <div class="healthbar">
      <div class="healthbar__value" :style="playerBarStyles"></div>
    </div>
  </section>
  <div class="container" v-if="winner">
    <h2>Game Over!</h2>
    <h3 v-if="winner === 'monster'">You lost!</h3>
    <h3 v-else-if="winner === 'player'">You won!</h3>
    <h3 v-else>It's a draw!</h3>
    <button @click="startNewGame">Start New Game</button>
  </div>
  <section id="controls" v-else>
    <button @click="attackMonster">ATTACK</button>
    <button :disabled="mayUseSpecialAttack" @click="specialAttackMonster">
      SPECIAL ATTACK
    </button>
    <button @click="healPlayer">HEAL</button>
    <button @click="surrender">SURRENDER</button>
  </section>
  <section id="log" class="container">
    <h2>Battle Log</h2>
    <ul>
      <li v-for="(logMessage, index) in logMessages" :key="index">
        <span
          :class="{
            'log--player': logMessage.actionBy === 'player',
            'log--monster': logMessage.actionBy === 'monster',
          }"
        >
          {{ logMessage.actionBy === 'player' ? 'Player' : 'Monster' }}</span
        >
        <span v-if="logMessage.actionType === 'heal'">
          heals himself for
          <span class="log--heal"> {{ logMessage.actionValue }}</span>
        </span>
        <span v-else>
          attacks and deals
          <span class="log--damage">
            {{ logMessage.actionValue }}
          </span>
        </span>
      </li>
    </ul>
  </section>
</template>

<script>
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

import { computed, reactive, toRefs } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
export default {
  name: 'App',
  setup() {
    const data = reactive({
      playerHealth: 100,
      mosterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    })
    const attackMonster = () => {
      data.currentRound++
      const attackValue = getRandomValue(5, 12)
      data.mosterHealth -= attackValue
      addLogMessage('player', 'attack', attackValue)
      attackPlayer()
    }
    const attackPlayer = () => {
      const attackValue = getRandomValue(8, 15)
      data.playerHealth -= attackValue
      addLogMessage('monster', 'attack', attackValue)
    }
    const specialAttackMonster = () => {
      data.currentRound++
      const attackValue = getRandomValue(10, 25)
      data.mosterHealth -= attackValue
      addLogMessage('player', 'attack', attackValue)
      attackPlayer()
    }
    const healPlayer = () => {
      const healValue = getRandomValue(8, 20)
      addLogMessage('player', 'heal', healValue)
      if (data.playerHealth + healValue > 100) {
        data.playerHealth = 100
      } else {
        data.playerHealth += healValue
      }
      setTimeout(() => {
        attackPlayer()
      }, 500)
    }

    const monsterBarStyles = computed(() => {
      return { width: data.mosterHealth + '%' }
    })
    const playerBarStyles = computed(() => {
      return { width: data.playerHealth + '%' }
    })

    const mayUseSpecialAttack = computed(() => {
      return data.currentRound % 3 !== 0
    })
    watchEffect(() => {
      if (data.playerHealth < 0) {
        data.playerHealth = 0
      }
      if (data.mosterHealth < 0) {
        data.mosterHealth = 0
      }
    })
    watchEffect(() => {
      if (data.playerHealth >= 0 && data.mosterHealth <= 0) {
        // A draw
        data.winner = 'draw'
      }
      if (data.mosterHealth > 0 && data.playerHealth <= 0) {
        // Player Lost
        data.winner = 'monster'
      }
      if (data.mosterHealth <= 0 && data.playerHealth > 0) {
        // Moster Lost
        data.winner = 'player'
      }
    })
    const addLogMessage = (who, what, value) => {
      data.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      })
    }

    const startNewGame = () => {
      data.playerHealth = 100
      data.mosterHealth = 100
      data.currentRound = 0
      data.winner = null
      data.logMessages = []
    }

    const surrender = () => {
      data.winner = 'monster'
    }
    return {
      ...toRefs(data),
      attackMonster,
      playerBarStyles,
      monsterBarStyles,
      specialAttackMonster,
      mayUseSpecialAttack,
      healPlayer,
      startNewGame,
      surrender,
    }
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>
