import { IconMapPinFilled } from "@tabler/icons-react"
import { IconClockHour3 } from "@tabler/icons-react"
import { IconMail } from "@tabler/icons-react"
import { IconPhoneCall } from "@tabler/icons-react"

export default function Footer(){

    const infoData = [
        {
            title: "0812 3456 7890",
            svg: <IconPhoneCall stroke={1.5} />
        },
        {
            title: "zenfresh@mail.com",
            svg: <IconMail stroke={1.5} />
        },
        {
            title: "Mon - Sun: 08:00 - 17:00",
            svg: <IconClockHour3 stroke={1.5} />
        }
    ]

    return (
        <footer className="w-full bg-[#111] flex flex-col px-[10vw] py-8 text-[#eee] mobile:px-4 tablet:px-[5vw]">
            <div className="top flex justify-between items-end mb-8 mobile:flex-col mobile:items-center mobile:gap-8">
                <div className="info flex flex-col gap-4">
                {
                    infoData.map((item, index) => {
                        return (
                            <div className="item flex items-center gap-2" key={index}>
                                <div className="svg flex text-boldPurple">
                                    {item.svg}
                                </div>
                                <span>{item.title}</span>
                            </div>
                        )
                    })
                }
                </div>
                <div className="links flex flex-col gap-2 items-end mobile:items-center">
                    <div className="footer-title">outlets</div> 
                    <a className="link link-hover">Yogyakarta</a>
                    <a className="link link-hover">Sleman</a>
                    <a className="link link-hover">Bantul</a>
                    <a className="link link-hover">Kulon Progo</a>
                </div>
                <div className="links flex flex-col gap-2 items-end mobile:items-center">
                    <div className="footer-title">others</div> 
                    <a className="link link-hover">Blog</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Help Center</a>
                </div>
            </div>
            <div className="bottom w-full flex justify-between border-t pt-8 mobile:flex-col-reverse mobile:gap-4">
                <div className="copyright mobile:text-center">© 2023 ZenFresh</div>
                <div className="bottom-links flex gap-4 items-center mobile:justify-between">
                    <div>Privacy policy</div>
                    <div>Terms of service</div>
                </div>
            </div>
        </footer>
    )
}