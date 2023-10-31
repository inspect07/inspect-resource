import { useState } from "react";

const Header = (props: any) => {
  const { menu, menuCB } = props;
  const [isOpen, setOpen] = useState(false);
  const [active, setActive] = useState<String>("all");

  return (
    <>
      <div className="header">
        <img src="./my-logo.png" alt="Inspect Logo" width={55} />
        <div className="name">INSPECT</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mobile-menu"
          onClick={() => setOpen(!isOpen)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="mobile-menu-content">
          <ul>
            {menu.map((list: any, index: any) => {
              return (
                <li
                  className={`${active === list ? "active" : ""}`}
                  key={index}
                  onClick={() => {
                    setActive(list);
                    menuCB(list);
                    setOpen(false);
                  }}
                >
                  {list}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
