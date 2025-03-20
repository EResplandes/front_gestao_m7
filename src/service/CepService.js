export default class CepService {

    async buscaCep(cep) {
        return await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .catch(error => console.log(error));
    }

}