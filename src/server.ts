import { serverHttp } from "./http";
import './websockets.ts'

serverHttp.listen(3000, ()=>{
    console.log("Funcionando chuchu beleza!");
})