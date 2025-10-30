import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SkillsSection from "./SkillsSection";
import { API_URLS } from "../constants";

export default function Headline() {
  const [headline, setHeadline] = useState([]);

  useEffect(() => {
    fetchHeadline();
  }, []);

  const fetchHeadline = async () => {
    try {
      const response = await fetch(API_URLS.HEADLINE.VIEW);
      const data = await response.json();
      setHeadline(<ReactMarkdown>{data.headLine}</ReactMarkdown>);
    } catch (error) {
      console.error("Error fetching headline:", error);
    }
  };

  return (
    <div>
      <div className="container-fluid py-5" id="about">
        <div className="row justify-content-center">
          <div className="col-10 text-start">
            <h2 className="h2 mb-3">
              ABOUT ME{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "240px",
                  height: "2px",
                  background:
                    "linear-gradient(90deg, #fcde19, #ff3d00, #fcde19)",
                  marginLeft: "10px",
                  verticalAlign: "middle",
                }}
              ></span>
            </h2>
            <p className="text-muted mt-4" style={{ lineHeight: "1.8" }}>
              {headline}
            </p>
          </div>
        </div>
      </div>
      <SkillsSection />
    </div>
  );
}
