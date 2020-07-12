import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import str from "./credentials";
console.log(str);
const CountrySingle = ({ ob }) => {
  const [bol, setBol] = useState(true);
  const toggle = () => {
    setBol(!bol);
  };
  if (bol) {
    return <CountrySimple ob={ob} toggle={toggle} bol={bol} />;
  } else {
    return <CountryDetail ob={ob} toggle={toggle} bol={bol} />;
  }
};
const CountrySimple = ({ ob, toggle, bol }) => {
  return (
    <div>
      <h3>{ob.name}</h3>
      <button onClick={() => toggle()}>{bol ? "show" : "hide"}</button>
    </div>
  );
};
const CountryDetail = ({ ob, toggle, bol }) => {
  return (
    <div>
      <h3>{ob.name}</h3>
      <button onClick={() => toggle()}>{bol ? "show" : "hide"}</button>
      <p>population: {ob.population}</p>
      <ul>
        {ob.languages.map((ob) => (
          <li key={ob.name}>{ob.name}</li>
        ))}
      </ul>
      <img src={ob.flag} height="100" />
    </div>
  );
};
// 国家名称列表，参数为检索后国家对象、按钮状态、设置按钮状态
const CountryDisplay = ({ filterCountry }) => {
  return filterCountry.map((ob) => <CountrySingle key={ob.name} ob={ob} />);
};
// 国家列表主体 参数为api获取国家，输入框，按钮状态，设置按钮状态
const FilterCountryDisplay = ({ country, filter }) => {
  console.log(country);
  // 过滤api原始对象
  const filterCountry = filter
    ? country.filter((ob) => ob.name.toLowerCase().indexOf(filter) !== -1)
    : [];
  console.log(filterCountry);
  // 如果过滤后对象长度超过10
  if (filterCountry.length > 10) {
    return <p>Too many matches, specify another filter</p>;
    // 如果长度小于10且大于1
  } else if (filterCountry.length < 10 && filterCountry.length > 1) {
    console.log("b");
    return <CountryDisplay filterCountry={filterCountry} />;
  } else if ((filterCountry.length = 1 && filterCountry[0] !== undefined)) {
    return filterCountry.map((ob) => (
      <div key={ob.name}>
        <p>{ob.name}</p>
        <p>population: {ob.population}</p>
        <ul>
          {ob.languages.map((ob) => (
            <li key={ob.name}>{ob.name}</li>
          ))}
        </ul>
        <img src={ob.flag} height="100" />
      </div>
    ));
  } else if (filter.length > 0) {
    return <p>No relevant data</p>;
  } else {
    return <p>Please enter the country name</p>;
  }
};
const App = () => {
  const [country, setCountry] = useState("Please enter the country name");
  const [filter, setFilter] = useState("");
  const api =
    "http://api.seniverse.com/v3/weather/now.json?location=beijing&" +
    str +
    "&callback=foo";
  const filterChange = (event) => {
    setFilter(event.target.value);
  };
  //  获取国家
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountry(response.data);
    });
    axios
      .get("v3/weather/now.json?location=beijing&" + str + "&callback=foo")
      .then((response) => {
        console.log(response);
      });
  }, []);
  return (
    <div>
      <h2>find countries</h2>
      <input value={filter} onChange={filterChange} />
      <FilterCountryDisplay country={country} filter={filter} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
