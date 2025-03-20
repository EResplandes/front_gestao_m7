import config from "./Config"

export default class FormularioService {

    async cadastro(form, idPadrinho) {
        return await fetch(`${config.urlApi}/formulario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(response => {
            return response.json()
        }).catch(error => {
            console.log(error)
        })
    }

    async validaForm(form, idPadrinho) {

    }

}