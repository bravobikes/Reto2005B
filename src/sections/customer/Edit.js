export default function Edit ({user, close}) {
    const item = [{
        nombreCurso : 'botanic',
        descripcion: 'curso de botanic'
    }]
    return  (
        <div className="Edit">

            <div className="EditContainer">
            <button className="close-btn" onClick={close}>Close</button>

                <h1>{user.nomAp}</h1>
                <h2>Info de empleado:</h2>
                <h3>Pais y estado:</h3>
                <p>{user.paid}</p>
                <p>{user.Estado}</p>
                <h3>Fecha de nacimiento: </h3>
                <p>{user.fechNac}</p>
                <h2>Cursos: </h2>
                <ul>
                    {/* mappear el array de objetos cursos que quiero tener en el objeto */}
                    {/* para cada uno mostrar nombreCurso, descripcion. */}
                    
                    {/* {user.cursos.map((item) => (
                        <li>{item.nombreCurso} - {item.descripcion}</li>
                    ))} */}
                </ul>
                <h2>gameStats</h2>
                <h3>Nivel(lvl)</h3>
                <p>{user.lvl}</p>
                <h3>Puntuacion más alta:</h3>
                <p>{user.topScore}</p>
                <h2>users</h2>
                <h3>Usuario: </h3>
                <p>{user.user}</p>
                <h3>cursos Tomados: </h3>
                <p>{user.cursosTomados}</p>
                <h2>Unidad</h2>
                <h3>unidad: </h3>
                <p>{user.unidad}</p>
                <h3>div: </h3>
                <p>{user.div}</p>
                <h3>perfil: </h3>
                <p>{user.perfil}</p>
                <h3>Managerial: </h3>
                {/* <p>{user.Managerial.toString()}</p> */}
                <h2>Origen </h2>
                <h3>origen Candidato: </h3>
                <p>{user.origenCand}</p>
                <h3>posicion de ingreso: </h3>
                <p>{user.posIngreso}</p>
                <h3>posicion Activa: </h3>
                <p>{user.posAct}</p>
                <h3>Clerical: </h3>
                <p>{user.Clerical}</p>
                <h2>Estudios </h2>
                <h3>escuela: </h3>
                <p>{user.escuela}</p>
                <h3>descripcion del titulo: </h3>
                <p>{user.descTitulo}</p>
                <h3>graduado: </h3>
                {/* <p>{user.grad.toString()}</p> */}
                <h3>esp? </h3>
                <p>{user.esp}</p>
                <h2>Area</h2>
                <h3>Estruc3?</h3>
                <p>{user.Estruc3}</p>
                <h3>Estruc4?</h3>
                <p>{user.Estruc4}</p>
                <h3>Estruc5?</h3>
                <p>{user.Estruc5}</p>
                <h2>Rotacion?</h2>
                <h3>rot?</h3>
                {/* <p>{user.rot.toString()}</p> */}
                <h3>cantidadRot?</h3>
                <p>{user.cantRot}</p>
                <h3>Estruc5?</h3>
                <p>{user.Estruc5}</p>
            </div>
        </div>
    )
}