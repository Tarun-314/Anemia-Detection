import "./AboutUs.css"; // Import your customized CSS
import React, { useEffect, useRef } from "react";
import img from "../../images/aboutus.svg";
import lkn from "../../images/linkedin.svg";
import shm from "../../images/Shyam.png";
import trn from "../../images/Tarun.jpg";
import snk from "../../images/Shashank.jpg";
import omk from "../../images/Omkar.png";
const AboutUs = () => {
  const containerLeftRef = useRef(null);
  const containerRightRef = useRef(null);

  useEffect(() => {
    const containerLeft = containerLeftRef.current;
    const containerRight = containerRightRef.current;

    const setContainerHeight = () => {
      if (containerLeft && containerRight) {
        const leftHeight = containerLeft.clientHeight;
        containerRight.style.height = `${leftHeight}px`;
        console.log(leftHeight);
      }
    };

    // Call the function initially
    setContainerHeight();

    // Call the function when window size changes
    window.addEventListener("resize", setContainerHeight);

    // Cleanup
    return () => {
      window.removeEventListener("resize", setContainerHeight);
    };
  }, [containerLeftRef, containerRightRef]); // Add refs to the dependency array

  return (
    <div className="about-us-container">
      <div className="container">
        <div class="container-left" ref={containerLeftRef}>
          <div className="abt1">
            <h1>Empowered by Knowledge: Dive into Anemia Net</h1>
            <p>
              Welcome to AnemiaNet, where we're passionate about leveraging
              cutting-edge technology to improve healthcare accessibility and
              outcomes. Founded by a dedicated team of four individuals driven
              by a shared vision, we've combined our expertise in machine
              learning (ML) and deep learning (DL) to create an innovative
              solution for detecting anemia.
            </p>
          </div>
          <div className="abt2">
            <h2>Our Motive</h2>
            <p>
              As we know that Anemia is a very common blood disorder and the
              only way untill now to know wether a person is Anemic or not was
              to draw their blood and perform test on it under microscope but
              the idea of giving their blood if they are Anemic might not sound
              reasonable and hence we have come up with a non-invasive approach
              to detcting Anemia by simply using our one of a kind website where
              a person can test their Anemia just by uploading the images of
              their palm, fingernails and the conjunctiva of the eye.
            </p>
          </div>
          <div className="abt3">
            <h2>Our Approach</h2>
            <p>
              Harnessing the latest advancements in ML and DL, we've developed a
              sophisticated algorithm capable of accurately detecting anemia
              from various sources of medical data, including blood samples and
              diagnostic images. Our team has meticulously trained and validated
              our models using large datasets, ensuring reliable performance
              across diverse populations.
            </p>
          </div>
        </div>
        <div class="container-right" ref={containerRightRef}>
          <img src={img} alt="about us img"></img>
        </div>
      </div>
      <div className="team">
        <h2>Meet the Team Behind AI-Powered Anemia Detection</h2>
        <p>
          We are a passionate group of developers driven by the ambition to
          leverage technology for social good. Together, we created this
          innovative website integrated using artificial intelligence and
          machine learning, empowering individuals to detect Anemia using
          non-invasive image recognition technology.
        </p>
        <h2>Our Dedicated Developers</h2>
        <section className="team-members">
          <div className="member-card1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={shm} alt="shyam"></img>
              <a
                href="https://www.linkedin.com/in/shyam-agarwal-27aa3a253/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>
                  Shyam
                  <img
                    src={lkn}
                    alt="linked In"
                    style={{
                      height: "20px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      clipPath: "none",
                      width: "20px",
                    }}
                  ></img>
                </h3>
              </a>
            </div>

            <p className="mdesc">
              As the project lead, Shyam envisioned this solution and
              spearheaded its development. His expertise in all the various
              components laid the foundation for the anemia detection project.
            </p>
          </div>
          <div className="member-card2">
            <p className="mdesc">
              Sashank's exceptional front-end development skills brought the
              website to life, ensuring a user-friendly and intuitive experience
              for everyone.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={snk} alt="Shashank"></img>
              <a
                href="https://www.linkedin.com/in/saisashankenuganti/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>
                  Sashank{" "}
                  <img
                    src={lkn}
                    alt="linked In"
                    style={{
                      height: "20px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      clipPath: "none",
                      width: "20px",
                    }}
                  ></img>
                </h3>
              </a>
            </div>
          </div>
          <div className="member-card1">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={omk} alt="Omkar"></img>
              <a
                href="https://www.linkedin.com/in/omkar-gardas-099809217/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>
                  Omkar{" "}
                  <img
                    alt="linked In"
                    src={lkn}
                    style={{
                      height: "20px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      clipPath: "none",
                      width: "20px",
                    }}
                  ></img>
                </h3>
              </a>
            </div>
            <p className="mdesc">
              Omkar's backend prowess solidified the website's infrastructure,
              managing data flow and ensuring smooth operation under load.
            </p>
          </div>
          <div className="member-card2">
            <p className="mdesc">
              Tarun's meticulous work on backend integration and his expertise
              in training ML models played a vital role in achieving seamless
              website functionality and desired accuracy levels, making him a
              true asset to the team.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={trn} alt="Traun"></img>
              <a
                href="https://www.linkedin.com/in/tarun-kumar-talloju"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>
                  Tarun{" "}
                  <img
                    alt="linked In"
                    src={lkn}
                    style={{
                      height: "20px",
                      marginTop: "5px",
                      marginLeft: "5px",
                      clipPath: "none",
                      width: "20px",
                    }}
                  ></img>
                </h3>
              </a>
            </div>
          </div>
        </section>
        <h2>Our Development Journey</h2>
        <section className="project-journey">
          <p>
            Our journey began with a shared passion for using technology to
            tackle healthcare challenges. We embarked on extensive research,
            exploring machine learning models and algorithms that could
            accurately detect anemia based on palm, nail, and conjunctiva
            images. We meticulously fine-tuned these models on diverse datasets,
            ensuring generalizability and reliability. Throughout the process,
            we held user sessions and feedback workshops to refine the user
            interface and ensure a seamless experience for people of all
            technical backgrounds.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
