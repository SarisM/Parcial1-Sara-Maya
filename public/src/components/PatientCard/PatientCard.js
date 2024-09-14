class PatienItem extends HTMLElement {
    constructor(){
        super()
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ['state', 'nombre', 'especie', 'sintomas', 'fecha']
    }

    connectedCallback(){
        this.render()
    }

    attributeChangedCallback(propName, oldValue, newValue){
        this.render()
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue
            this.render()
        }
    }

    deletePatient() {
        this.remove();
    }

    toggleTask(){
        this.state = !this.state
        this.render()
    }

    render(){
        this.shadowRoot.innerHTML = `
        <li class=${this.state ? "pendiente" : "atendido"}>
            <h3>nombre ${this.nombre}</h3>
            <p>especie ${this.especie}</p>
            <p>Sintomas ${this.sintomas}</p>
            <p>fecha de ingreso ${this.fecha}</p>
            <p>${!this.state ? "Pendiente" : "atendido"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="patient-checkbox">
        </li>
        `
        

        const checkbox = this.shadowRoot.querySelector('.patient-checkbox')
        checkbox.addEventListener('change', () => this.toggleTask())

        // this.shadowRoot.querySelector('.patient-checkbox').addEventListener('click', () => this.deletePatient());
    }
}

customElements.define('patient-item', PatienItem)
export default PatienItem