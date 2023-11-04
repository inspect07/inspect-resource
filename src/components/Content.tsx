import { useEffect, useState } from "react";
import Favorites from "./Favorites";

const Content = (props: any) => {
  const { filtered } = props;
  const [favorites, setFavorites] = useState<any>([]);
  const [data, setData] = useState<any>(filtered);

  useEffect(() => {
    const fav = localStorage.getItem("inspect-resource-favorites");
    if (fav) {
      setFavorites(JSON.parse(fav));
    }
  }, []);

  useEffect(() => {
    setData(filtered);
  }, [filtered]);

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

  const addToFavorite = (item: any) => {
    const fav = findObject(item);
    if (!isExist(item)) {
      setFavorites([...favorites, fav]);
      localStorage.setItem(
        "inspect-resource-favorites",
        JSON.stringify([...favorites, fav])
      );

      const targetIndex = data.findIndex((obj: any) => obj.name === item.name);

      const updatedData = [...data];

      if (targetIndex !== -1) {
        updatedData[targetIndex] = {
          ...updatedData[targetIndex],
          isFavorite: true,
        };

        setData(updatedData);
      }
    }
  };

  const findObject = (item: any) => {
    for (const obj of filtered) {
      if (obj.name === item.name) {
        return obj;
      }
    }

    return null;
  };

  const isExist = (item: any) => {
    for (const obj of favorites) {
      if (obj.name === item.name) {
        return true;
      }
    }

    return false;
  };

  return (
    <div>
      {favorites.length > 0 && <Favorites favorites={favorites} />}
      <div className="content">
        {data.length > 0
          ? data.map((tool: any, index: any) => {
              return (
                <div className="card" key={index}>
                  <div className="add-favorite">
                    {tool.isFavorite ? (
                      <svg
                        onClick={() => addToFavorite(tool)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => addToFavorite(tool)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className="card-content"
                    onClick={() => openNewTab(tool.link)}
                  >
                    {tool.logo !== "" ? (
                      <img
                        src={tool.logo}
                        width={50}
                        height={50}
                        alt=""
                        className="logo"
                      />
                    ) : (
                      <img
                        width={50}
                        height={50}
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
  );
};

export default Content;
