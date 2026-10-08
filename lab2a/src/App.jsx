import Counter from "./Counter.jsx";
import LikeButton from "./LikeButton.jsx";
import SubjectList from "./SubjectList.jsx";

const subjects = [
  { code: "BICS 3301", name: "Cross-Platform Software Development" },
  { code: "BICS 2305", name: "Operating Systems" },
  { code: "BICS 2306", name: "Software Engineering" },
];

function App() {
  return (
    <>
      <h1>Week 2 code-along</h1>
      <br />
      <Counter />
      <div className="box">
        <LikeButton label="React" />
        <br />
        <LikeButton label="Firebase" />
        <br />
        <LikeButton label="PWA" />
        <LikeButton label="ALI" />
      </div>
      <SubjectList subjects={subjects} />
    </>
  );
}

export default App;
