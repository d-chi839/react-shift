export function DataDisplay({ data }) {
  return (
    <div>
      <ul>
        {data.map((item, index) => {
          return (
            <li key={index}>{item.name + "" + item.start + "〜" + item.end}</li>
          );
        })}
      </ul>
    </div>
  );
}
