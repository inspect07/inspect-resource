import { useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import jsonData from "./data/data.json";

const App = () => {
  const [menu, setMenu] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [filtered, setDataFilter] = useState<any>([]);
  const [active, setActive] = useState<String>("all");

  useEffect(() => {
    const { menu, tools } = jsonData;
    setMenu(menu);
    setData(tools);
    setDataFilter(tools);
  }, []);

  const selectSideMenu = (menu: String) => {
    if (menu === "all") {
      setDataFilter(data);
      return;
    }

    const filteredData = data.filter((item: any) => item.menu === menu);
    setDataFilter(filteredData);
  };

  const openNewTab = (link: any) => {
    window.open(link, "_blank");
  };

  const comingSoon = () => {
    return (
      <>
        <div className="soon">Coming Soon!</div>
      </>
    );
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
          <div className="content">
            {filtered.length > 0
              ? filtered.map((tool: any, index: any) => {
                  return (
                    <div
                      className="card"
                      key={index}
                      onClick={() => openNewTab(tool.link)}
                    >
                      <div className="card-content">
                        {tool.logo !== "" ? (
                          <img
                            src={tool.logo}
                            width={80}
                            height={80}
                            alt=""
                            className="logo"
                          />
                        ) : (
                          <img
                            width={80}
                            height={80}
                            src="./my-logo.png"
                            alt=""
                            className="default-logo"
                          />
                        )}
                        <div className="title-details">
                          <div className="name">{tool.name}</div>
                          <div className="description">{tool.description}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : comingSoon()}
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default App;
