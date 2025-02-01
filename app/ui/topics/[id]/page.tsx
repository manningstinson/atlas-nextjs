type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  // Simulate Page loading
  await new Promise((r) => setTimeout(r, 3000));

  return <div>Topic Page: {params.id}</div>;
}