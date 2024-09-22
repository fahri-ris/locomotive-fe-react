import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import axios from 'axios';
import {useEffect, useState} from "react";

function Dashboard() {
    const [dataset, setDataset] = useState([]); // State for dataset
    const [totals, setTotals] = useState({ poor: 0, good: 0, excellent: 0 });

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/summary');
            setDataset(response.data.dataset); // Set dataset from API response
            setTotals({
                poor: response.data.totalPoor,
                good: response.data.totalGood,
                excellent: response.data.totalExcelent,
            }); // Assuming totals come in the response
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Use effect to fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    const chartSetting = {
        yAxis: [
            {
                label: 'Locomotive Total',
            },
        ],
        width: 800,
        height: 400,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-100px, 0)',
            },
        },
    };

    const valueFormatter = (value) =>{
        return `${value}mm`;
    }

    return (
        <>
            <div className="mt-24 ml-72">
                <h1 className="mb-8 text-3xl font-bold">
                    Dashboard
                </h1>
                <div className="flex">
                    <BarChart className="bg-gray-100 border-solid border-2 border-gray-200 rounded-xl w-full "
                              dataset={dataset}
                              xAxis={[{scaleType: 'band', dataKey: 'month'}]}
                              series={[
                                  {dataKey: 'poor', label: 'Poor', valueFormatter},
                                  {dataKey: 'good', label: 'Good', valueFormatter},
                                  {dataKey: 'excelent', label: 'Excelent', valueFormatter},
                              ]}
                              {...chartSetting}
                    />

                    <div className="flex flex-col w-80 ml-4 mr-8 gap-2">
                        <div
                            className="flex flex-col justify-center items-center gap-2 bg-[#02b2af] border-solid border-2 border-gray-200 rounded-xl h-32">
                            <h1 className="font-bold text-lg">Total Status Poor</h1>
                            <p className="font-bold text-5xl">{totals.poor}</p>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center gap-2 bg-[#2E96FF] border-solid border-2 border-gray-200 rounded-xl h-32">
                            <h1 className="font-bold text-lg">Total Status Good</h1>
                            <p className="font-bold text-5xl">{totals.good}</p>
                        </div>
                        <div
                            className="flex flex-col justify-center items-center gap-2 bg-[#B800D8] border-solid border-2 border-gray-200 rounded-xl h-32">
                            <h1 className="font-bold text-lg">Total Status Excelent</h1>
                            <p className="font-bold text-5xl">{totals.excellent}</p>
                        </div>
                    </div>

                </div>


            </div>

        </>
    )
}

export default Dashboard;