import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Contents = () => {
  const [confirmedData, setConfirmedData] = useState({
    labels: ["1월", "2월", "3월"],
    datasets: [
      {
        label: "국내 누적 확진자",
        backgroundColor: "salmon",
        fill: true,
        data: [10, 5, 3],
      },
    ],
  });
  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`https://api.covid19api.com/country/kr`);
      makeData(res.data);
    };
    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        return acc;
      }, []);
    };

    fetchEvents();
  }, []);

  return (
    <section>
      <h2>국내 코로나 현황</h2>
      <div className="contents">
        <div>
          <Bar
            data={confirmedData}
            options={{
              title: {
                display: true,
                text: "누적 확진자 추이",
                fontSize: 16,
              },
              legend: { display: true, position: "bottom" },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Contents;
