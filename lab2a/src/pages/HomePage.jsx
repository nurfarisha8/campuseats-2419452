import { Link } from "react-router";
import VendorCard from "../components/VendorCard";
import { useVendors } from "../hooks/useVendors";
import { Loading, ErrorMessage } from "../components/Status";

export default function HomePage() {
  const { vendors, loading, error, reload } = useVendors();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={reload} />;
  }

  return (
    <>
      <h1>Vendors</h1>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <Link
            key={vendor.id}
            to={`/vendor/${vendor.id}`}
            className="vendor-link"
          >
            <VendorCard vendor={vendor} />
          </Link>
        ))}
      </div>
    </>
  );
}
