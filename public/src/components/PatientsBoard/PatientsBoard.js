import '../PatientCard/PatientCard.js'

class PatientBoard extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
        this.patients = []
        this.pacientesAtendidos = []
    }

    connectedCallback(){
        this.render()

        const form = this.shadowRoot.querySelector('.patient-form')
        form.addEventListener("submit", (e)=>{
            e.preventDefault()
        
            const nombre = this.shadowRoot.querySelector('.input-nombre').value
            const especie = this.shadowRoot.querySelector('.input-especie').value
            const fecha = this.shadowRoot.querySelector('.input-fecha').value
            const sintomas = this.shadowRoot.querySelector('.input-sintomas').value

            this.patients.push({nombre, especie, fecha, sintomas, state: false})
            this.addPatient({nombre, especie, fecha, sintomas, state: false})
            console.log(this.patients);
            
            form.reset()
        })

        // this.pacientesAtendidos.push({nombre, especie, fecha, sintomas, state: true})

    }

    render(){
            
        this.shadowRoot.innerHTML = `
        <h2>Añadir Paciente</h2>
        <form class="patient-form">
            <h4>nombre</h4>
            <input type="text" placeholder="nombre" class="input-nombre" required>
            <h4>especie</h4>
            <input type="text" placeholder="especie" class="input-especie" required>
            <h4>Fecha de ingreso</h4>
            <input type="date" class="input-fecha" required>
            <h4>Síntomas</h4>
            <input type="text" placeholder="sintomas" class="input-sintomas" required>
            <button>Añadir</button>
        </form>
        <ul class="pacientes-pendientes">
        <p>Pacientes pendientes<p/>
        </ul>
        <ul class="pacientes-atendidos">
        <p>Pacientes atendidos<p/>

        </ul>
        
        `

        this.patients.forEach(patient => this.addPatient(patient))
        console.log(this.patients);
        // Función para añadir producto al los pacientes atendidos 
        const pacientesAtendidos = this.patients.filter(element => element.state === true);
        console.log(pacientesAtendidos)
                
        // // Añadir al contenedor del paciente
        const container = this.shadowRoot.querySelector('.pacientes-atendidos');
        pacientesAtendidos.forEach(paciente => container.appendChild(paciente) )
            
    }

    addPatient({nombre, especie, state, fecha, sintomas}){
        
        const patientContainer = this.shadowRoot.querySelector('.pacientes-pendientes')
        patientContainer.innerHTML += `
        <patient-item nombre="${nombre}" state="${state}" especie="${especie}" fecha="${fecha}" sintomas="${sintomas}"></patient-item>
        `

        // const taskItem = document.createElement('task-item')
        // taskItem.setAttribute('title', title)
        // taskItem.setAttribute('description', description)
        // taskItem.setAttribute('state', state)

        // this.shadowRoot.querySelector('.tasks-container').appendChild(taskItem)


        

    }
}

customElements.define('patient-board', PatientBoard)
export default PatientBoard