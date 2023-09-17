import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import WhatAndWho from "../components/WhatAndWho"
import AboutCompany from "../components/AboutCompany"

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