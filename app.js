
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY} from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

import Swal from 'https://esm.sh/sweetalert2@11';



/**function select  */
async function searchDino(){
    const textDino = document.getElementById("searchD").value;
    const markedPre = document.getElementById("responseJson");
    let response = {}
    try {
        markedPre.replaceChildren();
        
        if(textDino === null || textDino ===""){
            response = {
                        status: "error",
                        message: "input is empty",
                    };
            markedPre.append(JSON.stringify(response, null, 2));
            return;
        }
        

        const {data, error} = await supabase
        .from('dinosaur')
        .select('id, name, id_specie, alias,  species ( name, code_name, diet) ')
        .eq('name',textDino);

        if(error || data.length === 0){
            Swal.fire({
                title:'Error',
                text: 'The name is bad',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        }else{
            const json = JSON.stringify(data, null, 2);
            markedPre.append(json);   
        }

        

    } catch (error) {
        markedPre.append(
            [
                {
                    "status": error,
                    "message": error.message,
                }
            ]
        );
    }
}


/**function read */
async function getAll(){
    const {data, error} = await supabase
    .from('dinosaur')
    .select('*');

    if(error){
        Swal.fire({
            title:'Error',
            text: 'The service is stop or query not is correct',
            icon: 'error',
            confirmButtonText: 'Ok',
        })
    }
    
    const listD = document.getElementById("listDinosaur");

    data.forEach(element => {
        const dino_li = document.createElement("li");
        dino_li.textContent = element.name;
        listD.append(dino_li);
    });

    console.log(data);

} 

getAll();

document.getElementById("btnSearch").addEventListener("click", searchDino);

window.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        const data = document.getElementById("searchD").value;
        if(data !== null && data !== ""){
            this.document.getElementById("btnSearch").click();
        }
    }

});

