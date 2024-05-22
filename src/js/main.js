import { btnSiguiente, preguntas } from './constants.js'
import { RenderPreguntasyRespuestas } from './renderPreguntas.js'

const renderPreguntas = new RenderPreguntasyRespuestas(preguntas)

renderPreguntas.renderPreguntas()

btnSiguiente.addEventListener('click', () => {
  if (renderPreguntas.todasPreguntasResueltas) {
    renderPreguntas.indicePreguntaActual++
    renderPreguntas.renderRespuestas()
    return
  }

  if (renderPreguntas.preguntasSeleccionadas[renderPreguntas.indicePreguntaActual] != null) {
    renderPreguntas.indicePreguntaActual++
    renderPreguntas.renderPreguntas()
    return
  }

  Swal.fire({
    title: '¿Desea continuar?',
    icon: 'question',
    text: '¡No has seleccionado ninguna respuesta!',
    confirmButtonText: 'sí, adelante',
    cancelButtonText: 'no, regresar',
    showCancelButton: true,
    showCloseButton: true
  }).then(resultado => {
    if (resultado.isConfirmed) {
      renderPreguntas.preguntasSeleccionadas[renderPreguntas.indicePreguntaActual] = null
      renderPreguntas.indicePreguntaActual++
      renderPreguntas.renderPreguntas()
    }
  })
})