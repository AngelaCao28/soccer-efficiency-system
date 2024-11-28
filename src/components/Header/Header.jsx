import header from '../../assets/svgSource/header/header.png'

const headerContainer = {
  style: {
    width: 1920,
    height: 40,
    margin: "0 0",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row"
  }
}

const Header = () => {
  return (
    <div {...headerContainer}>
      <img src={header} width={1920} height={40} alt='header'/>
    </div>
  );
};

export default Header;