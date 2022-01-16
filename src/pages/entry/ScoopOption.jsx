export default function ScoopOption({ name, imagePath }) {
  return (
    <div>
      <img alt={`${name}`} src={`http://localhost:3030/${imagePath}`} />
    </div>
  );
}
