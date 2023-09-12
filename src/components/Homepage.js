import image1 from "../assets/1.png";
import image2 from "../assets/2.png";
import image3 from "../assets/3.png";
import white from "../assets/white.png";

export default function Homepage() {
  return (
    <div className="m-0 p-0 d-flex flex-column">
      <img
        className="position-absolute top-0"
        src={image1}
        alt="image1"
        style={{ width: "100%"}}
      />
      <img src={white} alt="white" style={{ width: "100%"}} />
      <img
        src={image2}
        alt="image2"
        style={{ width: "100%"}}
      />
      <img
        src={image3}
        alt="image3"
        style={{ width: "100%"}}
      />
    </div>
  );
}