export default function ToppingOption({ name, imagePath }) {
  return (
    <div>
      <img alt={`${name}`} src={`http://localhost:3030/${imagePath}`} />
    </div>
  );
}
