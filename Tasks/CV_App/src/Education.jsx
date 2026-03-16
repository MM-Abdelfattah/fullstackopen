import { useState } from "react";

function Education({ data, setData }) {
  const [edit, setEdit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <div>
      <h2>Education</h2>

      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="School"
            value={data.school}
            onChange={(e) => setData({ ...data, school: e.target.value })}
          />

          <input
            placeholder="Study Title"
            value={data.study}
            onChange={(e) => setData({ ...data, study: e.target.value })}
          />

          <input
            placeholder="Date"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>School: {data.school}</p>
          <p>Study: {data.study}</p>
          <p>Date: {data.date}</p>

          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Education;
