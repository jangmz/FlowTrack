import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center" style={{ "height": "100vh" }}>
            <h1>{error.status} {error.statusText}</h1>
            <p className="alert alert-danger">
                <i>{error.data}</i>
            </p>
            <Link to="/">
                <button className="btn btn-primary">Go back to homepage</button>
            </Link>
        </div>
    )
}