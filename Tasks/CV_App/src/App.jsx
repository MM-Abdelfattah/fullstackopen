import { useState } from "react";
import GeneralInfo from "./GeneralInfo";
import Education from "./Education";
import Experience from "./Experience";

function App() {
  const [general, setGeneral] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [education, setEducation] = useState({
    school: "",
    study: "",
    date: "",
  });

  const [experience, setExperience] = useState({
    company: "",
    position: "",
    responsibilities: "",
    from: "",
    to: "",
  });

  return (
    <>
      <h1>CV Generator</h1>

      <GeneralInfo data={general} setData={setGeneral} />
      <Education data={education} setData={setEducation} />
      <Experience data={experience} setData={setExperience} />
    </>
  );
}

export default App;
