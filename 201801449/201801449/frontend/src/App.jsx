import {useState,useEffect} from 'react';
import './App.css';
import Chart1 from "./components/Chart1.jsx";
import LineChart from "./components/LineChart.jsx";
import AreaChart from "./components/AreaChart.jsx";
import {GetCPUPercentage} from "../wailsjs/go/main/App.js";
import {GetDiskPercentage} from "../wailsjs/go/main/App.js";
import {GetRAMPercentage} from "../wailsjs/go/main/App.js";

function App() {

    const [name, setName] = useState(["En uso","Disponible"]);
    const [values, setValues] = useState([0,0]);
    const [name2, setName2] = useState([]);
    const [values2, setValues2] = useState([]);
    const [name3, setName3] = useState([]);
    const [values3, setValues3] = useState([]);

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

    //Uso RAM
    const [ram, setRAM] = useState(0);
    const updateRAM = (result) => setRAM(result);
    function getRAM() {
        GetRAMPercentage().then(updateRAM);
    }

    useEffect(() => {
        const ac = setInterval(() => {
            getCPU();
            getDisk();
            getRAM();
            setValues2(values2 => [...values2,cpu]);
            setName2(name2 => [...name2,cpu]);
            setValues([disk,100-disk]);
            setName3(name3 => [...name3,ram]);
            setValues3(values3 => [...values3,ram]);
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

            <h1>Uso de RAM</h1>
                <div className='chart3' style={{width:"500px"}}>
                    <h5>Consumo {ram} %</h5>
                    <AreaChart name={name3} values={values3}/>
                </div>


        </div>
    )
}

export default App
