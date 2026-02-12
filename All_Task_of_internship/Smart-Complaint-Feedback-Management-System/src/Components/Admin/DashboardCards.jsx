

const DashboardCards = ({ stats }) => {
  const cardData = [
    {
      title: 'Total Complaints',
      value: stats?.total || 0,
      icon: 'bi-journal-text',
      color: 'primary',
      bg: 'bg-primary bg-opacity-10',
      textColor: 'text-primary'
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: 'bi-clock-history',
      color: 'warning',
      bg: 'bg-warning bg-opacity-10',
      textColor: 'text-warning'
    },
    {
      title: 'In Progress',
      value: stats?.inProgress || 0,
      icon: 'bi-gear',
      color: 'info',
      bg: 'bg-info bg-opacity-10',
      textColor: 'text-info'
    },
    {
      title: 'Resolved',
      value: stats?.resolved || 0,
      icon: 'bi-check-circle',
      color: 'success',
      bg: 'bg-success bg-opacity-10',
      textColor: 'text-success'
    }
  ];

  return (
    <div className="row g-4 mb-4">
      {cardData.map((card, index) => (
        <div key={index} className="col-md-6 col-xl-3">
          <div className={`card border-0 shadow-sm h-100 ${card.bg}`}>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-2">{card.title}</h6>
                  <h2 className={`fw-bold mb-0 ${card.textColor}`}>{card.value}</h2>
                </div>
                <div className={`rounded-circle p-3 ${card.bg}`}>
                  <i className={`bi ${card.icon} fs-3 ${card.textColor}`}></i>
                </div>
              </div>
              <div className="mt-3">
                <small className="text-muted">Updated just now</small>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;