import React, { useEffect } from 'react';
import Chart from 'chart.js';

import data from '../valuesData.js';

let valuesData = data.keysData;
let valuesLabels = data.keysLabels;
let keysData = data.valuesData;
let keysLabels = data.valuesLabels;

for (let i = 0; i < valuesData.length; i++) {
  if (valuesData[i] > 10 || valuesData[i] < 3 || valuesLabels[i].length < 4) {
    valuesData = valuesData
      .slice(0, i)
      .concat(valuesData.slice(i + 1, valuesData.length));
    valuesLabels = valuesLabels
      .slice(0, i)
      .concat(valuesLabels.slice(i + 1, valuesLabels.length));
    i--;
  }
}
for (let i = 0; i < keysData.length; i++) {
  if (keysData[i] < 3 || keysLabels[i].length < 4) {
    keysData = keysData
      .slice(0, i)
      .concat(keysData.slice(i + 1, keysData.length));
    keysLabels = keysLabels
      .slice(0, i)
      .concat(keysLabels.slice(i + 1, keysLabels.length));
    i--;
  }
}

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
    const ctx2 = document.getElementById('commonWordsTwo').getContext('2d');

    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels: valuesLabels,
        datasets: [
          {
            label: 'Common Words In Values',
            data: valuesData,
            backgroundColor: colors,
            borderColor: colors
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
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        label: {
          display: false
        }
      }
    });

    new Chart(ctx2, {
      type: 'horizontalBar',
      data: {
        labels: keysLabels,
        datasets: [
          {
            label: 'Common Words in Keys',
            data: keysData,
            backgroundColor: colors,
            borderColor: colors
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Common Words in Company Keys'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        label: {
          display: false
        }
      }
    });
    return () => {};
  }, []);
  return (
    <main>
      <div className="jumbotron">
        <h1>Key-Value Statistics</h1>
        <p className="lead">
          This is a site in which data obtained from company websites which
          specify their key-values is used. It's a mash up of a few analyses.
        </p>
      </div>
      <div className="common-words-chart container">
        <h3>Common Words Chart for Values</h3>
        <p className="lead">
          First, a chart in which I parsed through all the words within the text
          that I obtained and gathered what words are in common. Here, I made
          sure to get rid of meaningless words and those which are very rare, as
          well as those said too frequently (greater than 10, which I
          predominantly did for aesthetic reasons).
        </p>
        <h5>The Top words</h5>
        <ul>
          <li>Customer</li>
          <li>With (though this is likely a filler word)</li>
          <li>Value</li>
          <li>Focus</li>
          <li>Integrity</li>
          <li>Customers (again)</li>
          <li>
            And a few other top words that stick out:
            <ul>
              <li>Transparency</li>
              <li>Embrace</li>
              <li>Quality</li>
              <li>Inclusion</li>
              <li>Diversity</li>
              <li>Innovation</li>
              <li>Trust</li>
              <li>Right</li>
              <li>Ownership</li>
              <li>Make</li>
              <li>Impact</li>
            </ul>
          </li>
        </ul>
        <canvas id="commonWords" width="400" height="800">
          <p>Common words used when companies specify their values.</p>
        </canvas>
      </div>
      <div className="common-words-keys-chart container">
        <h3>Common Words Chart for Keys</h3>
        <p className="lead">
          I did the same data manipulation as for the values in this case and
          found it much more fitting for this form of data as the key, well, it
          is the key word the company wants to convey.
        </p>
        <h5>The Top words</h5>
        <ul>
          <li>Quite a few are customer focused: </li>
          <ul>
            <li>Quickly</li>
            <li>Need</li>
            <li>Serve</li>
            <li>Services</li>
            <li>Built</li>
            <li>Deliver</li>
          </ul>
          <li>And other's are very... kind:</li>
          <ul>
            <li>Lives and Live</li>
            <li>Recognize</li>
            <li>Culture</li>
            <li>Love</li>
          </ul>
          <li>And some odd ones:</li>
          <ul>
            <li>100%</li>
            <li>Employee</li>
          </ul>
        </ul>
        <canvas id="commonWordsTwo" width="400" height="800">
          <p>Common words used when companies specify their values.</p>
        </canvas>
      </div>
      <div className="container">
        <h3>That's that for now.</h3>
        <p className="lead">
          I'll aim to come back to this sometime in the future... especially if
          gathering this data is easier than it currently is.
        </p>
      </div>
    </main>
  );
}
