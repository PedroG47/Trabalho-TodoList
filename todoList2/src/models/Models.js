import { Model as BaseModel } from "vue-api-query";


// Configuração da URL do API Rest
export default class Model extends BaseModel{
    baseURL(){
        return "http://localhost:3000"
    }

    request(config){
        return this.$http.request(config)
    }
}