export default function DeviceOverviewCard({ title, stock, icon }) {
    return (
        <div className="card text-bg-light m-2 col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-2" style={{ "minWidth": "180px"}}>
            <div className="card-header d-flex justify-content-between">
                <span style={{ "color": "#005f84"}}>{title}</span>
                <img src={icon} style={{ "width": "25px"}}/>
            </div>
            <div className="card-body">
                {
                    Object.entries(stock).map(([status, count]) => (
                        <p key={status} className="card-text mb-0">
                            {status}: {count}
                        </p>
                    ))
                }                
            </div>
            <div className="card-footer">
                <p className="card-text mb-0" style={{ "color": "#005f84"}}>Total: {stock.total}</p>
            </div>
        </div>
    )
}