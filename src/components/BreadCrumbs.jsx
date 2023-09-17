import { IconHome } from "@tabler/icons-react";

export default function BreadCrumbs({ page, path }){
    return (
        <div className="breadcrumbs text-white">
            <ul>
                <li>
                    <a href="/" className="flex gap-2">
                        <IconHome stroke={1.5} className="text-black" />
                    </a>
                </li> 
                <li>
                    <a href={path}>{page}</a>
                </li> 
            </ul>
        </div>
    )
}