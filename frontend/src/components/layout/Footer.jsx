import {
  AiFillInstagram,
  AiFillLinkedin,
  AiFillGithub,
  AiFillFacebook,
} from "react-icons/ai";
const Footer = () => {
  return (
    <>
      <footer>
        <div>
          <h2>KHI Food Zack</h2>
          <p>We are to give you the best taste. </p>
          <br />
          <em>We give attention to genuine feedback.</em>
          <strong>All right recevied @khifoodzack</strong>
        </div>
        <aside>
          <h3>Follow Us</h3>
          <a href="https://www.facebook.com/talha.bhat.39">
            <AiFillFacebook />
          </a>
          <a href="https://www.instagram.com/muhammad_talha178/">
            <AiFillInstagram />
          </a>
          <a href="https://github.com/muhammadtalha894">
            <AiFillGithub />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-talha-bin-tayyab-b8aa94225/">
            <AiFillLinkedin />
          </a>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
