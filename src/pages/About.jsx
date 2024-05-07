import AboutCompany from "../components/AboutCompany"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import WhatAndWho from "../components/WhatAndWho"

export default function About(){

    document.title = "ZenFresh | About"

    return (
        <>
        <Navbar />
        <Hero page={"About"} path={"/about"} />
        <WhatAndWho />
        <AboutCompany />
        <Footer />
        </>
    )
}