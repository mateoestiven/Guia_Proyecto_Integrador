import { cantMaximaPreguntas, btnSiguiente } from './constants.js'
const seccionPreguntas = document.getElementById('seccion-preguntas')

export class RenderPreguntasyRespuestas {
  preguntasSeleccionadas = []
  todasPreguntasResueltas = false
  indicePreguntaActual = 0
  p=0
  constructor (preguntas) {
    this.p=preguntas.length
    this.preguntasDesordenadas = preguntas.sort(() => Math.random() - 0.5).splice(0, cantMaximaPreguntas)
    
  }
  

  renderRespuestas = () => {
    if (this.indicePreguntaActual >= cantMaximaPreguntas - 1) {
      this.indicePreguntaActual = cantMaximaPreguntas - 1
      btnSiguiente.innerText = 'Finalizar'
      if(this.p<20){
      setTimeout(function () {
        window.location.href = 'http://localhost:4321/';
    }, 2000);
    }else{
      setTimeout(function () {
        window.location.href = 'http://localhost:4321/';
        }, 2000);
    }
    
    }


    seccionPreguntas.innerHTML = ''
    const pregunta = this.preguntasDesordenadas[this.indicePreguntaActual]
    let respuestasHtml = ''

    pregunta.respuestas.forEach((respuesta, indice) => {
      let bgRespuestas = 'bg-red-400'

      if (respuesta.correcta) {
        bgRespuestas = 'bg-green-400'
      }
      if (this.preguntasSeleccionadas[this.indicePreguntaActual] === indice) {
        bgRespuestas = 'bg-blue-400'
      }

      respuestasHtml += /* html */`
        <p class="p-2 break-all rounded-md ${bgRespuestas}"><span>${indice + 1}.</span> ${respuesta.texto}</p>
      `
    })

    const template = /* html */`
    <div class= "text-center text-sm flex flex-col gap-3 border-b p-1 border-black items-center">
        <p>Pregunta ${this.indicePreguntaActual + 1}</p>
        <p class= "text-xs break-all">${pregunta.pregunta}</p>
    </div>
    <section class="flex flex-col gap-2 text-sm">
            ${respuestasHtml}
    </section>
  `

    seccionPreguntas.insertAdjacentHTML('afterbegin', template)
  }

  renderPreguntas = () => {
    if (this.preguntasSeleccionadas.length === cantMaximaPreguntas) {
      this.indicePreguntaActual = 0
      this.todasPreguntasResueltas = true
      this.renderRespuestas()
      return
    }

    seccionPreguntas.innerHTML = ''
    const pregunta = this.preguntasDesordenadas[this.indicePreguntaActual]
    const respuestasDesordenadas = pregunta.respuestas.sort(() => Math.random() - 0.5)

    let respuestasHtml = ''

    respuestasDesordenadas.forEach((respuesta, indice) => {
      respuestasHtml += /* html */` 
        <label class="flex justify-between w-full gap-4">
          <p class="break-all"><span>${indice + 1}.</span> ${respuesta.texto}</p>
          <input name="inputs-respuestas" class="inputs-respuestas" type="radio">
        </label>
      `
    })

    const template = /* html */`
          <div class= "text-center text-sm flex flex-col gap-3 border-b p-1 border-black">
              <p>Pregunta ${this.indicePreguntaActual + 1}</p>
              <p class= "text-xs break-all">${pregunta.pregunta}</p>
          </div>
          <section class="flex flex-col gap-2 text-sm">
                  ${respuestasHtml}
          </section>
    `

    seccionPreguntas.insertAdjacentHTML('afterbegin', template)
    this.obtenerInputs()
  }

  inputSeleccionado = indice => {
    this.preguntasSeleccionadas[this.indicePreguntaActual] = indice
  }

  obtenerInputs = () => {
    const inputsRespuestas = document.querySelectorAll('.inputs-respuestas')
    inputsRespuestas.forEach((input, indice) => {
      input.addEventListener('change', () => {
        this.inputSeleccionado(indice)
      })
    })
  }
}