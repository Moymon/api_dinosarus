
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY} from './config.js';

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

import Swal from 'https://esm.sh/sweetalert2@11';

/**Funcion lectura */
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
    
    console.log(data);

} 

getAll();
