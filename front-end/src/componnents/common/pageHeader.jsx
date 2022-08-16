function PageHeader({ title, description }) {
  return (
    <>
      <div className="container">
        <div className="row mb-2">
          <div className="col-12">
            <h1 className="text-center">
              i <i className="bi bi-card-checklist"></i> card
            </h1>
            <h2 className="text-center">{title}</h2>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row mb-2">
          <div className="col-12">
            <p className="text-center">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
