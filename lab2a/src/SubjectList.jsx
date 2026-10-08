import LikeButton from "./LikeButton.jsx";
// Step 3: a list from an array. .map() turns data into elements; each needs a unique key.
//list dot atau 123 ol - ordered list for ul
//like button is child for subjectlist
function SubjectList({ subjects }) {
  //declare for loop
  return (
    <div className="box">
      <h2>My subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.code}>
            {subject.code} {subject.name} <LikeButton label="Like" />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SubjectList;
