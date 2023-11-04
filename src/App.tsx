import { useEffect, useState } from "react";
import "./App.scss";
import Content from "./components/Content";
import Header from "./components/Header";
import jsonData from "./data/data.json";

const App = () => {
  const { menu, tools } = jsonData;
  const [data, setData] = useState<any>(tools);
  const [filtered, setDataFilter] = useState<any>(tools);
  const [active, setActive] = useState<String>("all");

  useEffect(() => {
    const fav = localStorage.getItem("inspect-resource-favorites");
    if (fav) {
      const favList = JSON.parse(fav);

      addFavoriteFlag(favList);
    }
  }, []);

  const addFavoriteFlag = (favoriteList: any) => {
    const updatedData = [...filtered];

    updatedData.forEach((obj, index) => {
      const isTarget = favoriteList.some(
        (target: any) => target.name === obj.name
      );
      if (isTarget) {
        updatedData[index] = { ...obj, isFavorite: true };
      }
    });

    setDataFilter(updatedData);
  };

  const selectSideMenu = (menu: String) => {
    if (menu === "all") {
      setDataFilter(data);
      return;
    }

    const filteredData = data.filter((item: any) => item.menu === menu);
    setDataFilter(filteredData);
  };

  return (
    <div className="App">
      <Header menu={menu} menuCB={selectSideMenu} />
      <div className="content">
        <div className="banner">
          <div className="hero-container">
            <div className="title">This is Inspect Resource</div>
            <div className="description">
              Enhance your web design skills for free. Explore our curated
              collection of templates, assets, tutorials, and expert insights.
              Unlock your creativity and design without limits!
            </div>
          </div>
          <div className="robot">
            <div className="eye1"></div>
            <div className="eye2"></div>
            <img src="./robot.png" alt="" height={320} />
          </div>
        </div>
        <div className="content-container">
          <div className="sidebar-menu">
            <ul>
              {menu.map((list: any, index: any) => {
                return (
                  <li
                    className={`${active === list ? "active" : ""}`}
                    key={index}
                    onClick={() => {
                      setActive(list);
                      selectSideMenu(list);
                    }}
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
          </div>
          <div style={{ width: "100%" }}>
            <Content filtered={filtered} />
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
