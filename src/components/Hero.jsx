import BreadCrumbs from "./BreadCrumbs";

export default function Hero({ page, path }){
    return (
        <header className="hero-page h-[50vh] w-full px-[10vw] flex items-center mobile:px-4">
            <BreadCrumbs page={page} path={path} />
        </header>
    )
}