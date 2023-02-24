import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import Chart1 from "./components/Chart1.jsx";
import LineChart from "./components/LineChart.jsx";

function App() {

    const [name, setName] = useState(["En uso","Disponible"]);
    const [values, setValues] = useState([60,40]);
    const [name2, setName2] = useState([10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40]);
    const [values2, setValues2] = useState([10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40,10,20,40,20,50,90,100,80,40]);

    return (
        <div id="App">
            <h1> Uso de Disco Duro </h1>
                <div className='chart1' style={{width:"300px"}}>
                    <Chart1 name={name} values={values}/>
                </div>

            <h1>Uso de CPU</h1>
                <div className='chart2' style={{width:"500px"}}>
                    <LineChart name={name2} values={values2}/>
                </div>
        </div>
    )
}

export default App
