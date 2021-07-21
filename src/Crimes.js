import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import axios from 'axios';

  

const Crimes = () => {
   
    const [chartData, setChartData]  = useState({});
    const [date, setDate] = useState('');
    const [force, setForce] = useState('avon');
    const [forces, setForces] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [errorText, setText] = useState('');
    const [dataMessage, setDataMessage] = useState('');

    function chart() {

        let chartData = [];
        
        axios.get(`https://data.police.uk/api/crimes-no-location?category=all-crime&force=${force}&date=${date}`)
        .then(res => {
            if(res.data.length === 0) {
                setDataMessage("No crimes on this month")
            } else {
                setDataMessage('');
            }
            console.log(res.data)
        for(const dataObj of res.data ){
            if (chartData.some(e => e.label === dataObj.category)) {

                const elem = (element) => element.label === dataObj.category;
                let index = chartData.findIndex(elem);
                let countNo = chartData[index].count+1;
                chartData[index] = {label:dataObj.category, count:countNo}
              }
            else{
            chartData.push(({label:dataObj.category, count:1}));
            }
            
        }
            
        let label = [];
        let count = [];
        for(const d of chartData){
            label.push(d.label);
            count.push(d.count);
        }

        setIsPending(false);

        setChartData({
            labels: label,
            datasets: [{
                                         label: 'Times happened',
                                         data: count,
                                         backgroundColor: [
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                         ],
                                         borderColor: [
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                         ],
                                         borderWidth: 1
                                     }]
        });
        setText('');
    
    })

    .catch(err => {

        setChartData([]);
        setText('Check if your date is correct');
        setDataMessage('');
;
    })
    
}

useEffect(() => {
    const fetchData = async () => {
        const result = await axios(`https://data.police.uk/api/forces`);
        setForces(result.data);
      };
      fetchData();
  }, []);


useEffect(() => {
      chart();
  }, [date, force]);


  const handleSubmit = (e) => {
    
    setDate(e.target.value)   
  }



    return ( 
        <div>
            <h1 className="title">This is page for crimes in your county for that date</h1>


            <div className="search">
            {isPending && <div>Getting info from Police, please be patient...</div> }
            
                <h3 className="title">Search will load automatically</h3>

                <form>
                    <label className="label">Write date here (YYYY-MM)</label>
                    <input 
                    className="input"
                    type='text'
                    maxLength='7'
                    value={date}
                    onChange={handleSubmit}
                    />

                    
                    <label className="label">Select Police Force</label>

                    <select
                        className="input"
                        value={force}
                        onChange={(e) => setForce(e.target.value)}
                    >
						
                        {forces.map((value) => (
							<option style={{color: 'black'}} value={value.id} key={value.id}>
								{value.name}
							</option>
						))}
                        
                    </select>
                   
                </form>
            </div>


<div className="chart">
              <h1 className="title">Crimes Chart</h1>
              <input className="error" type="text" 
                            value={errorText}/>
            <input className="error" type="text" 
                            value={dataMessage}/>
              <div>
                  <Bar
                    data={chartData}
                    options={{
                        responsive:true,
                        title: { text: "Units", display: true },
                        scales:{
                            yAxes:[ {
                                ticks:{
                                    beginAtZero: true
                                }
                            }
                            ]
                        }
                    }}
                  />
              </div>
          </div>
        </div>
    )}
 
export default Crimes;