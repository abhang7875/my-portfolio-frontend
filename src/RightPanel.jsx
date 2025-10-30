export default function RightPanel({ content }) {
  return (
    <div className="col-md-8 col-12">
      <div className="card shadow-lg h-100">
        <div>{content}</div>
      </div>
    </div>
  );
}
