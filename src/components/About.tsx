import { Link } from "react-router-dom";
import UserLocation from "./UserLocation";

const handelClick = () => {
  sessionStorage.setItem("toggleDetails", "");
  sessionStorage.setItem("savedCoordinates", "");
  sessionStorage.setItem("searchResults", "");
};

const About = () => {
  return (
    <>
      <div className="content d-flex flex-column justify-content-between">
        <div>
          <UserLocation />
          <div
            className="container d-flex flex-column align-items-center mt-5"
            style={{ maxWidth: "620px" }}
          >
            <h1 className="text-dark">About Skycast</h1>
            <p className="mt-5 text ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos
              atque consequuntur est, commodi voluptatum laboriosam voluptate
              vel voluptatem accusantium rerum dignissimos aperiam recusandae
              consectetur quibusdam, in ipsam officiis. Eius at soluta quod odio
              laborum facere veritatis, nam earum totam. Inventore voluptate
              dolorum, facilis quidem eum corporis omnis nihil voluptatibus
              corrupti odio! Voluptatum, officia vero et fugit possimus, tempora
              repellat numquam veritatis itaque omnis velit. Quae accusantium ea
              at ratione rem ut, dolore libero blanditiis totam sint hic
              aspernatur architecto natus eveniet error similique eaque porro id
              eligendi? Consectetur, dolorum at ipsa modi numquam sequi, magni a
              odio ducimus voluptatibus cum repellendus harum quod, nihil
              expedita iusto ipsam. Quibusdam quasi ducimus, maiores, cumque
              omnis odio aut iure ex ipsam alias ad, repellat rerum amet aperiam
              aliquid corrupti modi reiciendis nesciunt commodi rem quod.
              Deserunt repellat placeat nulla quos saepe sit eaque, consectetur
              nemo nostrum distinctio amet in iste, a provident officia mollitia
              cumque vel inventore quod. Facere, voluptates? Ut distinctio
              nesciunt rerum saepe consequuntur sint reiciendis nisi corrupti
              iste veniam sit exercitationem eos minus nihil odit, unde, commodi
              magni possimus minima officiis nam a dolore? Quos aliquid unde
              tempora, hic, porro obcaecati eum consequatur facilis
              reprehenderit quaerat quia expedita nesciunt. Similique!
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center bg-dark py-2 mt-3">
          <Link to={"/"} onClick={handelClick} className="link">
            <h4 className="text-light">Home</h4>
          </Link>
        </div>
      </div>
    </>
  );
};

export default About;
