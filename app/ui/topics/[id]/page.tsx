export default function Page({ params }: { params: { id: string } }) {
  return <div>Topic Page: {params.id}</div>;
}
