import React, { useEffect } from 'react';
import Chart from 'chart.js';

import data from '../valuesData.js';

const valuesData = data.keysData;
const valuesLabels = data.keysLabels;
console.log(data);

function rainbowStop(h) {
  let f = (n, k = (n + h * 12) % 12) =>
    0.5 - 0.5 * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  let rgb2hex = (r, g, b) =>
    '#' +
    [r, g, b]
      .map(x =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, 0)
      )
      .join('');
  return rgb2hex(f(0), f(8), f(4));
}

export default function CommonWords() {
  useEffect(() => {
    const colors = [];
    for (let i = 0; i < 1000; i++) {
      const color = rainbowStop(Math.random());
      colors.push(color);
    }
    const ctx = document.getElementById('commonWords').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: valuesLabels,
        datasets: [
          {
            label: 'Word',
            data: valuesData,
            backgroundColor: colors,
            borderColor: colors,
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Common Words in Company Values'
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        },
        label: {
          display: false
        }
      }
    });
    return () => {};
  }, []);
  return (
    <canvas id="commonWords" width="400" height="800">
      <p>Common words used when companies specify their values.</p>
    </canvas>
  );
}
