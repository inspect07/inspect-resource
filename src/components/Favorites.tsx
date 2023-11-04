import { useEffect, useState } from "react";

const Favorites = (props: any) => {
  const { favorites } = props;
  const [data, setData] = useState<any>(favorites);

  useEffect(() => {
    setData(favorites);
  }, [favorites]);

  const openNewTab = (link: any) => {
    window.open(link, "_blank");
  };

  const onRemove = (item: any) => {
    const updatedData = data.filter((obj: any) => !compareObjects(obj, item));
    setData(updatedData);
    localStorage.setItem(
      "inspect-resource-favorites",
      JSON.stringify(updatedData)
    );

    window.location.reload();
  };

  const compareObjects = (obj1: any, obj2: any) => {
    for (const key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="favorites">
      {data.length > 0 ? (
        <>
          <div className="title">Favorites</div>
          <div className="content">
            {data.map((tool: any, index: any) => {
              return (
                <div className="card" key={index}>
                  <div className="card-content">
                    {tool.logo !== "" ? (
                      <img
                        src={tool.logo}
                        width={20}
                        height={20}
                        alt=""
                        className="logo"
                      />
                    ) : (
                      <img
                        width={20}
                        height={20}
                        src="./my-logo.png"
                        alt=""
                        className="default-logo"
                      />
                    )}
                    <div className="title-details">
                      <div
                        className="name"
                        onClick={() => openNewTab(tool.link)}
                      >
                        {tool.name}
                      </div>
                      <svg
                        onClick={() => onRemove(tool)}
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Favorites;
