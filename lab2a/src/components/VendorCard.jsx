function VendorCard({ vendor }) {
  return (
    <article className="card vendor-card">
      <div className="vendor-thumb">{vendor.name.charAt(0)}</div>

      <div className="vendor-info">
        <p className="vendor-name">{vendor.name}</p>

        <p className="muted">{vendor.location}</p>

        <p className="muted">{vendor.openHours}</p>

        <span className={`status ${vendor.isOpen ? "open" : "closed"}`}>
          {vendor.isOpen ? "Open now" : "Closed"}
        </span>
      </div>
    </article>
  );
}

export default VendorCard;
