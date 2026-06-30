import PackageForm from "../../components/PackageForm";

export default async function EditPackagePage({ params }) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/packages/${params.id}`,
    {
      cache: "no-store",
    }
  );

  const result = await response.json();

  return (
    <div className="p-5 bg-white">

   

      <PackageForm packageData={result.data} />

    </div>
  );
}