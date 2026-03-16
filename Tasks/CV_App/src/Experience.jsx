import { useState } from "react";

function Experience({ data, setData }) {
  const [edit, setEdit] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <div>
      <h2>Experience</h2>

      {edit ? (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Company"
            value={data.company}
            onChange={(e) => setData({ ...data, company: e.target.value })}
          />

          <input
            placeholder="Position"
            value={data.position}
            onChange={(e) => setData({ ...data, position: e.target.value })}
          />

          <textarea
            placeholder="Responsibilities"
            value={data.responsibilities}
            onChange={(e) =>
              setData({ ...data, responsibilities: e.target.value })
            }
          />

          <input
            placeholder="From"
            value={data.from}
            onChange={(e) => setData({ ...data, from: e.target.value })}
          />

          <input
            placeholder="To"
            value={data.to}
            onChange={(e) => setData({ ...data, to: e.target.value })}
          />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Company: {data.company}</p>
          <p>Position: {data.position}</p>
          <p>{data.responsibilities}</p>
          <p>
            {data.from} - {data.to}
          </p>

          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Experience;
