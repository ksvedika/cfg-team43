import React, {Component} from 'react';
import axios from 'axios';
import API from '../api';
async function get_data(){
    let d = await axios.get('http://localhost:3001/test');
    console.log(d);
}
function get_d(){
    return "Vedika buri hai";
}
class Test extends Component{
    async render(){
        await get_data();
        return (
            <div>
                <h1>Vedika is Madddddest :)</h1>
            </div>
        )
    }
}

export default Test;