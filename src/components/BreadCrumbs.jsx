import { IconHome } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import goTop from "./goTop"

export default function BreadCrumbs({ page, path }){
    return (
        <div className="breadcrumbs text-white">
            <ul>
                <li>
                    <Link to="/" onClick={goTop} className="flex gap-2">
                        <IconHome stroke={1.5} />
                    </Link>
                </li> 
                <li>
                    <Link to={path} onClick={goTop}>{page}</Link>
                </li> 
            </ul>
        </div>
    )
}