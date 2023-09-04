<template>
  <div class="home">
    <transition name="slide-fade" mode="out-in">
      <div class="starting" v-if="contadorComenzar > 0" key="a">
        <h1>
          Comenzamos <br />
          en
        </h1>
        <p>{{ contadorComenzar }}</p>
      </div>

      <div class="container" v-else key="b">
        <div class="container__header">
          <div class="back-btn">
            <img src="@/assets/logo.png" alt="" />
          </div>
          <div class="container__header--title">
            <h2>Interval Flow</h2>
          </div>
          <div
            class="container__header--config"
            @click="isConfigActive = !isConfigActive"
            :style="
              this.estaDescansando || this.estaTrabajando
                ? 'pointer-events: none'
                : ''
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g transform="rotate(180 12 12)">
                <path
                  fill="#c8d4e8"
                  d="m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Zm0-2q-.625 0-1.063-.438T10.55 12q0-.625.438-1.063t1.062-.437q.625 0 1.063.438T13.55 12q0 .625-.438 1.063t-1.062.437ZM12 12Zm-1 8h1.975l.35-2.65q.775-.2 1.438-.588t1.212-.937l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12q0-.4-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587L11 20Z"
                />
              </g>
            </svg>
          </div>
        </div>
        <div class="container__clock">
          <div class="clock__details">
            <div class="clock__details--state">
              <p>{{ estadoActual }}</p>
            </div>
            <div class="clock__details--time">
              <p>{{ formatTime(tiempoRestante) }}</p>
            </div>
            <div class="clock__details--series">
              <p>{{ seriesTrabajadas }}/{{ seriesTotales }}</p>
            </div>
          </div>
          <div class="progress__bar">
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              style="transform: rotate(-90deg)"
            >
              <defs>
                <linearGradient
                  id="miGradiente"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style="stop-color: rgb(255, 0, 0); stop-opacity: 1"
                  />
                  <stop
                    offset="100%"
                    style="stop-color: rgb(255, 255, 0); stop-opacity: 1"
                  />
                </linearGradient>
              </defs>
              <circle
                r="70"
                cx="80"
                cy="80"
                fill="transparent"
                stroke="#e0e0e0"
                stroke-width="7px"
              ></circle>
              <circle
                v-if="temporizadorActivo"
                r="70"
                cx="80"
                cy="80"
                fill="transparent"
                stroke="url(#miGradiente)"
                stroke-linecap="round"
                stroke-width="8px"
                :style="{
                  'stroke-dasharray': '439.6px',
                  'stroke-dashoffset': strokeDashOffset + 'px',
                }"
                :class="{ 'barra-progreso': tiempoRestante < tiempoTrabajo }"
                :animate="{
                  animation: 'fillProgress',
                  duration: tiempoTrabajo + 's',
                  fillMode: 'forwards',
                }"
              ></circle>
            </svg>
          </div>
        </div>
        <div
          class="row"
          v-if="
            this.tiempoRestante > 0 ||
            this.estaDescansando ||
            this.estaTrabajando
          "
        >
          <label
            @click="iniciarTemporizador"
            v-if="temporizadorActivo == false"
          >
            <!-- Para poner play -->
            <input type="checkbox" class="input" />
            <div class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="white"
                  d="M240 128a15.74 15.74 0 0 1-7.6 13.51L88.32 229.65a16 16 0 0 1-16.2.3A15.86 15.86 0 0 1 64 216.13V39.87a15.86 15.86 0 0 1 8.12-13.82a16 16 0 0 1 16.2.3l144.08 88.14A15.74 15.74 0 0 1 240 128Z"
                />
              </svg>
            </div>
          </label>
          <label @click="pausarTemporizador" v-else>
            <!-- Para poner pausa -->
            <input type="checkbox" class="input" />
            <div class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="white" d="M14 19V5h4v14h-4Zm-8 0V5h4v14H6Z" />
              </svg>
            </div>
          </label>
          <label @click="reiniciarTemporizador">
            <!-- Para reiniciar -->
            <input type="checkbox" class="input" />
            <div class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 256 256"
              >
                <path
                  fill="white"
                  d="M216 55.27v145.46A15.29 15.29 0 0 1 200.73 216H55.27A15.29 15.29 0 0 1 40 200.73V55.27A15.29 15.29 0 0 1 55.27 40h145.46A15.29 15.29 0 0 1 216 55.27Z"
                />
              </svg>
            </div>
          </label>
        </div>
        <div class="config" :class="{ 'config-active': isConfigActive }">
          <div class="close-btn" @click="isConfigActive = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g transform="rotate(-90 12 12)">
                <path
                  fill="white"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
                />
              </g>
            </svg>
          </div>
          <div class="config__header">
            <h3>Configuración</h3>
            <p>
              Tiempo total: <span>{{ formatTime(calculateTotalTime()) }}</span>
            </p>
          </div>
          <div class="config__options">
            <div class="config__options--item">
              <span>trabajo</span>
              <div
                class="item__btn"
                @click="changeTime('decrease', 'work')"
                :class="{ 'btn-disabled': tiempoTrabajo == 5 }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <g transform="rotate(180 10 10)">
                    <path
                      fill="white"
                      fill-rule="evenodd"
                      d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
              </div>
              <div class="item__time">
                <p>{{ formatTime(tiempoTrabajo) }}</p>
              </div>
              <div class="item__btn" @click="changeTime('increase', 'work')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g transform="rotate(-90 12 12)">
                    <path
                      fill="white"
                      d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div class="config__options--item">
              <span>descanso</span>
              <div
                class="item__btn"
                @click="changeTime('decrease', 'rest')"
                :class="{ 'btn-disabled': tiempoDescanso == 5 }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <g transform="rotate(180 10 10)">
                    <path
                      fill="white"
                      fill-rule="evenodd"
                      d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
              </div>
              <div class="item__time">
                <p>{{ formatTime(tiempoDescanso) }}</p>
              </div>
              <div class="item__btn" @click="changeTime('increase', 'rest')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g transform="rotate(-90 12 12)">
                    <path
                      fill="white"
                      d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div class="config__options--item">
              <span>series</span>
              <div
                @click="changeTime('decrease', 'series')"
                class="item__btn"
                :class="{ 'btn-disabled': seriesTotales == 1 }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                >
                  <g transform="rotate(180 10 10)">
                    <path
                      fill="white"
                      fill-rule="evenodd"
                      d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z"
                      clip-rule="evenodd"
                    />
                  </g>
                </svg>
              </div>
              <div class="item__time">
                <p>{{ seriesTotales }}</p>
              </div>
              <div @click="changeTime('increase', 'series')" class="item__btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g transform="rotate(-90 12 12)">
                    <path
                      fill="white"
                      d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="config__footer">
            <button @click="startTabata"><span>comenzar</span></button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      strokeDashOffset: 439.6,
      contadorComenzar: 0,
      isConfigActive: false,
      tiempoTrabajo: 5, // Duración inicial del trabajo en segundos
      tiempoDescanso: 5, // Duración inicial del descanso en segundos
      seriesTotales: 4, // Número de series
      estaTrabajando: false, // Bandera para controlar si está en tiempo de trabajo
      seriesTrabajadas: 0,
      tiempoRestante: 0,
      temporizadorActivo: false,
      estaDescansando: false,
      readySound: new Audio(require("@/assets/sounds/ready.mp3")),
      bongSound: new Audio(require("@/assets/sounds/start.mp3")),
      winnerSound: new Audio(require("@/assets/sounds/winner.mp3")),
      workSound: new Audio(require("@/assets/sounds/work.mp3")),
      restSound: new Audio(require("@/assets/sounds/rest.mp3")),
    };
  },
  methods: {
    startTabata() {
      this.isConfigActive = false;
      this.estaTrabajando = true;
      this.tiempoRestante = this.tiempoTrabajo; // Configura el primer intervalo de trabajo
      this.contadorComenzar = 5; // Inicializa el contador en;

      this.temporizadorActivo = true; // Iniciar el temporizador

      const contadorInterval = setInterval(() => {
        if (this.contadorComenzar === 0) {
          this.bongSound.play();
          clearInterval(contadorInterval); // Detiene el contador cuando llega a 0
          const timerInterval = setInterval(() => {
            if (this.temporizadorActivo) {
              if (this.tiempoRestante === 0) {
                if (this.seriesTrabajadas == this.seriesTotales) {
                  clearInterval(timerInterval);
                  this.winnerSound.play();
                  this.reiniciarTemporizador();
                } else {
                  if (this.estaDescansando) {
                    this.tiempoRestante = this.tiempoTrabajo;
                    this.estaDescansando = false;
                    this.estaTrabajando = true;
                    this.workSound.play();
                  } else {
                    this.tiempoRestante = this.tiempoDescanso;
                    this.estaDescansando = true;
                    this.seriesTrabajadas++;
                    this.estaTrabajando = false;
                    this.restSound.play();
                  }
                }
              } else {
                this.tiempoRestante--;
              }
            }
          }, 1000);
        } else {
          this.contadorComenzar--;
          this.readySound.play();
        }
      }, 1000);
    },

    changeTime(action, section) {
      if (section == "work") {
        if (action == "increase") {
          this.tiempoTrabajo += 5;
        } else {
          this.tiempoTrabajo -= 5;
        }
      }
      if (section == "rest") {
        if (action == "increase") {
          this.tiempoDescanso += 5;
        } else {
          this.tiempoDescanso -= 5;
        }
      }
      if (section == "series") {
        if (action == "increase") {
          this.seriesTotales += 1;
        } else {
          this.seriesTotales -= 1;
        }
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    },
    calculateTotalTime() {
      const totalTime =
        (this.tiempoTrabajo + this.tiempoDescanso) * this.seriesTotales;
      return totalTime;
    },
    iniciarTemporizador() {
      this.temporizadorActivo = true;
      // Lógica para iniciar el temporizador aquí
    },
    pausarTemporizador() {
      this.temporizadorActivo = false;
      // Lógica para pausar el temporizador aquí
    },
    reiniciarTemporizador() {
      this.strokeDashOffset = 439.6;
      this.contadorComenzar = 0;
      this.isConfigActive = false;
      this.tiempoTrabajo = 5;
      this.tiempoDescanso = 5;
      this.seriesTotales = 4;
      this.estaTrabajando = false;
      this.seriesTrabajadas = 0;
      this.tiempoRestante = 0;
      this.temporizadorActivo = false;
      this.estaDescansando = false;
    },
  },
  computed: {
    estadoActual() {
      if (this.estaTrabajando) {
        return "trabajo";
      } else if (this.estaDescansando) {
        return "descanso";
      } else {
        return "iniciar";
      }
    },
  },
  watch: {
    tiempoRestante(newValue) {
      // Calcula el nuevo valor de strokeDashOffset en función del tiempo restante
      this.strokeDashOffset = (newValue / this.tiempoTrabajo) * 439.6; // Ajusta según tus necesidades
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.container {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  width: 100%;
  margin-bottom: 3rem;

  svg {
    width: 30px;
    height: 30px;
  }

  .back-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 35px;
      height: 35px;
    }
  }

  &--title {
    h2 {
      color: #fff;
      font-weight: 600;
      font-family: "Berkshire Swash", cursive;
      letter-spacing: 2px;
    }
  }

  &--config {
    cursor: pointer;
  }
}

.container__clock {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
    inset 0 -15px 15px rgba(255, 255, 255, 0.05),
    0 15px 15px rgba(0, 0, 0, 0.05), inset 0 15px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/clock.png");
  background-size: cover;

  .clock__details {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    &--state {
      p {
        color: #b3712e;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
    }

    &--time {
      p {
        color: #fff;
        font-size: 26px;
        font-weight: 400;
        letter-spacing: 1px;
      }
    }

    &--series {
      p {
        color: #b3712e;
        letter-spacing: 1px;
      }
    }
  }
}

.config {
  background-color: #3e3b4d;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12px;
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
  transition: transform 300ms ease, opacity 600ms ease;
  &__header {
    text-align: center;
    h3 {
      color: #fff;
      margin-bottom: 0.5rem;
    }

    p {
      color: #fff;
      opacity: 0.5;
    }
  }

  .close-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 24px;
    top: 12px;
    cursor: pointer;
  }
}

.config__options {
  width: 100%;
  max-width: 500px;
  padding-inline: 24px;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.config__options--item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.25rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
  span {
    opacity: 0.5;
    min-width: 100%;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
  }

  .item__time {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    text-align: center;
    color: #fff;

    p {
      font-size: 30px;
      font-weight: 400;
    }
  }
}

.item__btn {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  border: 2px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:active {
    border-color: rgba(255, 255, 255, 0.05);
  }

  &:active svg path {
    fill: rgba(255, 255, 255, 0.05);
  }
}

.config__footer {
  button {
    margin-top: 2rem;
    margin-bottom: 5rem;
    outline: 0;
    border: 2px solid #fff;
    border-radius: 12px;
    background-color: transparent;
    padding: 0.5rem 1.5rem;
    cursor: pointer;

    span {
      color: #fff;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 2px;
      font-size: 16px;
    }
  }
}

.config.config-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: initial;
}

.btn-disabled {
  border-color: rgba(255, 255, 255, 0.05);
  pointer-events: none;
  user-select: none;

  svg path {
    fill: rgba(255, 255, 255, 0.05);
  }
}

.starting {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  h1 {
    color: #fff;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1rem;
  }

  p {
    font-size: 30px;
    color: #fff;
    font-weight: 600;
    border-radius: 50%;
    border: 2px solid #fff;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(1.5);
}

.row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
}

.input {
  display: none;
}

.btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #454d78;
  box-shadow: inset -18px -18px 35px #3b4166, inset 18px 18px 35px #4f598a;
  cursor: pointer;
  font-size: 30px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input:checked ~ .btn {
  box-shadow: inset 21px 21px 21px #262a42, inset -21px -21px 21px #6470ae;
}

.progress__bar {
  position: absolute;
  top: -50%;
  left: -50%;
  transform: translate(50%, 50%);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
}

.barra-progreso {
  transition: stroke-dashoffset 0.5s ease-in-out;
  animation-timing-function: linear;
}

/* Define una animación para la barra de progreso */
@keyframes fillProgress {
  0% {
    stroke-dashoffset: 439.6px; /* Valor inicial */
  }
  20% {
    stroke-dashoffset: 352px; /* Valor inicial */
  }
  40% {
    stroke-dashoffset: 264px; /* Valor inicial */
  }
  60% {
    stroke-dashoffset: 176px; /* Valor inicial */
  }
  80% {
    stroke-dashoffset: 88px; /* Valor inicial */
  }
  100% {
    stroke-dashoffset: 0; /* Valor final */
  }
}

@media (max-width: 375px) and (max-height: 667px) {
  .config {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow-y: scroll;

    &__footer {
      button {
        margin-bottom: 24px;
      }
    }
  }
}

@media (min-width: 768px) {
  .container__header {
    margin-bottom: 6rem;

    h2 {
      font-size: 30px;
    }

    .back-btn img {
      width: 50px;
      height: 50px;
    }

    svg {
      width: 45px;
      height: 45px;
    }
  }

  .config__header {
    h3 {
      font-size: 26px;
    }
  }
  .container__clock {
    width: 350px;
    height: 350px;

    svg {
      width: 285px;
      height: 285px;
    }
  }

  .row .btn {
    width: 75px;
    height: 75px;
  }
}
</style>
