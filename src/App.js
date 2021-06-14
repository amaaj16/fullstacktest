import './App.css';
import React, {useEffect, useState} from 'react';
import C3Chart from "react-c3js";
import 'c3/c3.css';

const Loader = () => {
    return (
        <h1>Loading...</h1>
    )
};

function App() {
    const [loader, setLoader] = useState(true)
    const [data, setData] = useState({columns: []});
    const [loadData, setLoadData] = useState(false)
    const [search, setSearch] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currencies] = useState(["AED","AFN","ALL","AMD","ANG","AOA",
        "ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL",
        "BSD","BTC","BTN","BWP","BYN","BYR","BZD","CAD","CDF","CHF","CLF","CLP","CNY","COP",
        "CRC","CUC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FKP",
        "GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF",
        "IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR",
        "KMF","KPW","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LTL","LVL","LYD",
        "MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRO","MUR","MVR","MWK","MXN","MYR","MZN",
        "NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG",
        "QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLL","SOS",
        "SRD","STD","SVC","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TWD","TZS",
        "UAH","UGX","USD","UYU","UZS","VEF","VND","VUV","WST","XAF","XAG","XAU","XCD","XDR",
        "XOF","XPF","YER","ZAR","ZMK","ZMW","ZWL"])
    const [base, setBase] = useState('EUR');
    const [mon, setMon] = useState(currencies[0]);



    const handleSelect = (e) => {
        setMon(e.target.value)
    }
    const handleStartDate=(e) =>{
        setStartDate(e.target.value)
    }
    const handleEndDate=(e) =>{
        setEndDate(e.target.value)
    }
    const handleSubmit = () => {
        setSearch(!search)
    }

    useEffect(() => {
        if(mon!==""){

            fetch(`http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_KEY_FIXER_IO}&start_date=${startDate}&end_date=${endDate}&base=${base}&symbols=${mon}`)
                .then(res => res.json())
                .then(rates => {
                    console.log(rates)
                    if(rates.success){
                        const dat = {
                            columns: [
                                [`${mon}`,Array.from(Object.values(rates.rates))]
                            ]
                        };
                        setData(dat)
                        setLoadData(false)

                    }else{

                        setLoadData(true)
                    }


                })
        }
        setLoader(false)
    }, [search])

    if (loader) {
        return <Loader className="loader"/>
    }
    return (

        <div className="App">
            <div className="form">
                <label>Tipo de cambio:</label>
            <select onChange={handleSelect}>
                {
                    currencies.map((currency, index) => (
                        <option values={currency} key={index} >{currency}</option>
                    ))

                }
            </select>
            <label>Fecha Inicio:</label>
            <input type="text" placeholder="YYYY-MM-DD" onChange={handleStartDate}/>
            <label>Fecha Fin:</label>
            <input type="text" placeholder="YYYY-MM-DD" onChange={handleEndDate}/>
            <button onClick={handleSubmit}>Buscar</button>
            </div>
            <div className="grafica">
            <C3Chart data={data}/>
            </div>
        </div>
    );
};

export default App;
