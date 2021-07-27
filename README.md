# :mask: 코로나 바이러스 현황

<img src="https://yt3.ggpht.com/ytc/AKedOLTdyKcjkkPdb3OfdJ_Esptm4Ry_gWSpqflRqWHa=s88-c-k-c0x00ffffff-no-rj"> 해당 저장소는 Youtube code Scalper님의 <a href="https://www.youtube.com/watch?v=DtLhiMxgsm0">강좌</a>를 바탕으로 만들어졌음을 미리 밝힙니다.

ReactJS 와 Chartjs2를 사용하여 코로나 확진자 및 사망자 추이를 보기좋게 설정하여 만들어보기

### :diamonds: 헤더

<img src=".\gitImages\Header.PNG">

간단하게 헤더 부분을 분리하여 컴포넌트화 시킴

```javascript
import React from "react";

const Header = () => {
  return (
    <header className="header">
      <h1>COVID-19</h1>
      <select>
        <option>국내</option>
        <option>세계</option>
      </select>
    </header>
  );
};

export default Header;
```

### :wrench: 콘텐츠

누적 확진자, 월별 격리자 등을 포함하여 전체적인 현황을 알 수 있는 UI를 만듦

<img src=".\gitImages\InCountry.PNG" />
<img src="./gitImages\Monty.PNG">
<img src="./gitImages\All.PNG">

### :bulb: 알게된 점

JS의 내장 배열 메서드인 reduce는 굉장히 유용하게 사용이 가능한데, 사람들은 대부분 덧셈을 하는 용도의 내장 메서드로 생각한다. 이는 배열 데이터를 축적하는 acc 인자와 현재 인덱스의 데이터를 표현하는 cur인자를 받기 때문에 덧셈에 매우 용이하기 때문인데, 해당 유튜버는 아래와 같은 방법으로 데이터를 파싱함

```javascript
const arr = items.reduce((acc, cur) => {
        // 각 인덱스 번째의 데이터를 가져와 변수에 저장함
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.Recovered;

        // 그동안 쌓였던 배열 데이터 중 year가 현재 데이터의 year와 같고, month가 현재 데이터의 month와 같은 아이템
        const findItem = acc.find((a) => a.year === year && a.month === month);

        // 연도와 월이 같은 데이터가 없으면 새로 저장
        if (!findItem) {
            acc.push({
                year,
                month,
                date,
                confirmed,
                active,
                death,
                recovered,
            });
        }

        // 연도와 월이 같으면서 날짜가 현재 데이터보다 이전인경우 현재 데이터로 변경
        if (findItem && findItem.date < date) {
            findItem.active = active;
            findItem.death = death;
            findItem.date = date;
            findItem.year = year;
            findItem.month = month;
            findItem.recovered = recovered;
            findItem.confirmed = confirmed;
        }
```

즉 위와같은 알고리즘으로 각 월의 마지막 날짜의 데이터로 모든 데이터를 저장하는 것이다.
