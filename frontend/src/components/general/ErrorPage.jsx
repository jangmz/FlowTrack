import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h1>{error.status} {error.statusText}</h1>
            <p>
                <i>{error.data}</i>
            </p>
            <Link to="/">Go back to homepage</Link>
        </div>
    )
}