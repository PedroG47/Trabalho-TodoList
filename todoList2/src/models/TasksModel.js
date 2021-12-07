import Model from "./Models";

//Configuração da URL que irá fazer a busca
export default class Tasks extends Model{
    resource(){
        return "tasks";
    }
}