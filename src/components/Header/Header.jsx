import React from "react";
import headerVector from "../../images/vetores/Vector_header.png";

function Header() {
  return (
    <header className="header">
      <img
        className="header__image-vector"
        src={headerVector}
        alt="Around the U.S"
      />
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
