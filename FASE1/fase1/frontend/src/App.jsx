import {useState,useEffect} from 'react';
import './App.css';
import Chart1 from "./components/Chart1.jsx";
import LineChart from "./components/LineChart.jsx";
import {GetCPUPercentage} from "../wailsjs/go/main/App.js";
import {GetDiskPercentage} from "../wailsjs/go/main/App.js";


function App() {

    const [name, setName] = useState(["En uso","Disponible"]);
    const [values, setValues] = useState([0,0]);
    const [name2, setName2] = useState([]);
    const [values2, setValues2] = useState([]);

    //Consumo CPU
    const [cpu, setCPU] = useState(0);
    const updateCPU = (result) => setCPU(result);
    function getCPU() {
        GetCPUPercentage().then(updateCPU);
    }

    //Uso DISCO
    const [disk, setDisk] = useState(0);
    const updateDisk = (result) => setDisk(result);
    function getDisk() {
        GetDiskPercentage().then(updateDisk);
    }

    useEffect(() => {
        const ac = setInterval(() => {
            getCPU();
            getDisk();
            setValues2(values2 => [...values2,cpu]);
            setName2(name2 => [...name2,cpu]);
            setValues([disk,100-disk]);
        },1000);
        return () => clearInterval(ac);
    }
    , [values2,name2]);

    return (
        <div id="App">
            <h1> Uso de Disco Duro </h1>
            <h5> En uso {disk} %           Disponible {100-disk} % </h5>
                <div className='chart1' style={{width:"300px"}}>
                    <Chart1 name={name} values={values}/>
                </div>

            <h1>Uso de CPU </h1>
                <div className='chart2' style={{width:"500px"}}>
                    <h5>Consumo {cpu} %</h5>
                    <LineChart name={name2} values={values2}/>

                </div>


        </div>
    )
}

export default App
