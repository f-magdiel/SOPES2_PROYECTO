import {useState,useEffect} from 'react';
import './App.css';
import Chart1 from "./components/Chart1.jsx";
import LineChart from "./components/LineChart.jsx";
import {GetCPUPercentage} from "../wailsjs/go/main/App.js";



function App() {

    const [name, setName] = useState(["En uso","Disponible"]);
    const [values, setValues] = useState([60,40]);
    const [name2, setName2] = useState([]);
    const [values2, setValues2] = useState([]);

    //Consumo CPU
    const [cpu, setCPU] = useState(0);
    const updateCPU = (result) => setCPU(result);
    function getCPU() {
        GetCPUPercentage().then(updateCPU);
    }

    useEffect(() => {
        const ac = setInterval(() => {
            getCPU();
            setValues2(values2 => [...values2,cpu]);
            setName2(name2 => [...name2,cpu]);
        },1000);
        return () => clearInterval(ac);
    }
    , [values2,name2]);

    return (
        <div id="App">
            <h1> Uso de Disco Duro </h1>
                <div className='chart1' style={{width:"300px"}}>
                    <Chart1 name={name} values={values}/>
                </div>

            <h1>Uso de CPU </h1>
                <div className='chart2' style={{width:"500px"}}>
                    <LineChart name={name2} values={values2}/>
                    <h1>Consumo {cpu}%</h1>
                </div>


        </div>
    )
}

export default App
