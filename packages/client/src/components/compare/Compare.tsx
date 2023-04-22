import React, {useEffect, useRef, useState} from 'react';
import {useInputValues} from "../textbox/InputValuesContext";
import Chart from 'chart.js/auto';
import './Compare.css'

interface ScoreResponseBody {
    score: number,
    breakdown: {
        water: number,
        carbon: number,
        esg: 'CCC' | 'B' | 'BB' | 'BBB' | 'A' | 'AA' | 'AAA',
        bio: number,
        recycle: number,
        durable: number,
        ctx: string
    },
    expl: string,
    err: string,
    reli_expl: string,
    reliability: number,
}

function Compare() {
    const {inputValues} = useInputValues();
    const [allScores, setAllScores] = useState<ScoreResponseBody[]>([]);
    const initialFetchComplete = useRef(false);

    const nameArray = inputValues.map((inputUrl) => {
        const urlParts = inputUrl.split("/");
        return urlParts[urlParts.indexOf("dp") - 1];
    });

    const scoresArray = allScores.map((score) => score.score);
    const reliabilityArray = allScores.map((score) => score.reliability);
    const waterArray = allScores.map((score) => score.breakdown.water);
    const carbonArray: number[] = allScores.map((score: ScoreResponseBody) => score.breakdown.carbon);
    const esgArray = allScores.map((score) => score.breakdown.esg);
    const bioArray = allScores.map((score) => score.breakdown.bio);
    const recycleArray = allScores.map((score) => score.breakdown.recycle);
    const durableArray = allScores.map((score) => score.breakdown.durable);

    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!initialFetchComplete.current) {
            inputValues.forEach((inputUrl) => {
                fetchScoreData(inputUrl);
            });
            initialFetchComplete.current = true;
        }
    }, [inputValues]);

    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data: ScoreResponseBody = await response.json();
                console.log("Fetched data:", data);
                setAllScores((prevScores) => [...prevScores, data]);
            } else {
                console.error("Error fetching data. Status:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchScoreData = (inputUrl: string) => {
        const productId = inputUrl.split("/").slice(3).join("/");
        fetchData(`http://localhost:3001/score/${productId}`);
    };

    useEffect(() => {
        const data = {
            labels: nameArray,
            datasets: [
                {
                    label: 'Water',
                    data: waterArray,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                },
                {
                    label: 'Carbon',
                    data: carbonArray,
                    backgroundColor: 'rgba(255, 206, 86, 0.5)'
                },
                {
                    label: 'Bio',
                    data: bioArray,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)'
                },
                {
                    label: 'Recycle',
                    data: recycleArray,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)'
                },
                {
                    label: 'Durable',
                    data: durableArray,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };

        const canvas = document.getElementById('myChart') as HTMLCanvasElement;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(canvas, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        });
    }, [allScores]);

    return (
        <div className = 'chart'>
            <canvas id="myChart"></canvas>
        </div>
    )
}

export default Compare;