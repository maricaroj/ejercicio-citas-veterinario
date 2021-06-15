import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

  // Crear el estado de las citas 
  const [cita, setCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  })

  // creando el estado del error
  const [error, setError] = useState(false);

  // para dar mensaje al usuario que sus datos fueron guardados exitosamente

  const [mensajeEnviado, setMensajeEnviado] = useState(false);

  const handlerState = e => {
    setCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }

  // Extraer valores de la citas
  const {mascota, propietario, fecha, hora, sintomas} = cita;

  // Cuando el usuario presione agregar cita

  const submitCita = e => {
    e.preventDefault();
    // Validar

    if(
      mascota.trim() === '' || 
      propietario.trim() === '' || 
      fecha.trim() === '' || 
      hora.trim() === '' || 
      sintomas.trim() === '' 
    ){
      setError(true);
      return;
    }
    setError(false);
    // Agregar un Id
    cita.id = uuidv4();
    // Crear una cita
    crearCita(cita)
    // Mostramos mensaje de éxito
    setMensajeEnviado(true)
    // ocultando el mensaje de éxito
    setTimeout(() => {
      setMensajeEnviado(false);
    }, 3000);
    // Limpiar Formulario
    setCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  }

  return(
    <>
      <h2>Crear cita</h2>

      {/* {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null} */}
      {error && <p className="alerta-error">Todos los campos son obligatorios</p>}
      {mensajeEnviado && <p className="alerta-enviado">Sus datos fueron guardados con éxito!</p>}
      <form
        onSubmit={submitCita}
      >
        <label>Nombre de Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          value={mascota}
          onChange={handlerState}
        />
        <label>Nombre del Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"
          placeholder="Nombre del dueño de la mascota"
          value={propietario}
          onChange={handlerState}
        />
        <label>Fecha Ingreso</label>
        <input 
          type="date" 
          name="fecha"
          className="u-full-width"
          value={fecha}
          onChange={handlerState}
        />
        <label>Hora Ingreso</label>
        <input 
          type="time" 
          name="hora"
          className="u-full-width"
          value={hora}
          onChange={handlerState}
        />
        <label>Síntomas</label>
        <textarea 
          name="sintomas"
          className="u-full-width"
          placeholder="¿Cuales son los síntomas?"
          value={sintomas}
          onChange={handlerState}
        ></textarea>
        <button
          type="submit"
          className="u-full-width button-primary"
        >
          Agregar Cita
        </button>
      </form>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;