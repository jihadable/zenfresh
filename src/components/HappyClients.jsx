import { useState } from "react"
import client1 from "../assets/client1.jpg"
import client2 from "../assets/client2.jpg"
import client3 from "../assets/client3.jpg"
import client4 from "../assets/client4.jpg"
import client5 from "../assets/client5.jpg"
import client6 from "../assets/client6.jpg"

export default function HappyClients(){

    const clients = [
        {
            name: "Tatiana Ivanova",
            job: "College Student",
            text: `Perspiciatis et provident minus aperiam dolores aspernatur facilis. Minima, accusamus ad hic dignissimos laboriosam quae quasi molestiae accusantium nemo odio ipsa provident neque dicta perferendis magnam adipisci assumenda.`,
            img: client1
        },
        {
            name: "Maria Garcia",
            job: "Housewife",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam necessitatibus exercitationem quibusdam quo nemo nihil deserunt. Similique assumenda dolores sit.`,
            img: client2
        },
        {
            name: "John Smith",
            job: "College Student",
            text: `Distinctio quaerat illum dignissimos similique officiis commodi reiciendis quasi tempore, porro, corporis impedit possimus quod aliquam quam fuga! Fuga, minus amet ducimus vero molestiae debitis!`,
            img: client3
        },
        {
            name: "Jessica Anderson",
            job: "Teacher",
            text: `Ut vitae aperiam labore cumque tenetur optio doloribus, alias voluptates tempora eius ex quos debitis unde, asperiores nostrum perspiciatis. Ducimus eligendi quae quo esse illo exercitationem dolorum quasi quis, ex soluta maiores!`,
            img: client4
        },
        {
            name: "Michael Johnson",
            job: "Software Engineer",
            text: `Dolores fugiat quo! Dolorum magni obcaecati eveniet tempore. Accusantium possimus cum quos a doloremque dicta totam nihil, voluptates aspernatur pariatur placeat cupiditate animi quaerat recusandae, omnis dolor in reiciendis sed.`,
            img: client5
        },
        {
            name: "Emily Davis",
            job: "CEO",
            text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates exercitationem dolores voluptate, cumque omnis fugit est ea tempore repellendus error illo alias optio aut numquam.`,
            img: client6
        }
    ]

    const btns = [0,1,2]
    const [clientShowIndex, setClientShowIndex] = useState(0)

    return (
        <section className="happy-clients flex flex-col items-center gap-8 py-8 mobile:px-4">
            <div className="header text-3xl font-bold">Happy Clients</div>
            <div className="text w-1/2 text-center mobile:w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officiis laboriosam voluptates itaque deleniti quibusdam aliquid provident recusandae obcaecati hic.</div>
            <div className="content w-[85vw] overflow-x-hidden flex mobile:w-full mobile:overflow-x-auto tablet:w-[90vw] tablet:overflow-x-auto tablet:gap-4">
                <div className={`client-container client${clientShowIndex} transition duration-500 flex gap-6 mobile:gap-4`}>
                {
                    clients.map((client, index) => {
                        return (
                            <div className="client w-[calc((85vw-1.5rem)/2)] flex flex-col gap-6 mobile:p-0 mobile:w-[calc(100vw-5rem)]" key={index}>
                                <div className="chat chat-start p-0 w-fit">
                                    <div className="chat-bubble bg-lightBlue text-black">{client.text}</div>
                                </div>
                                <div className="info flex gap-4">
                                    <div className="img">
                                        <img src={client.img} alt="Image" className="w-24 rounded-full" />
                                    </div>
                                    <div className="name-job flex flex-col gap-2">
                                        <div className="name text-xl font-bold">{client.name}</div>
                                        <div className="job text-darkBlue">{client.job}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
            <div className="btns flex gap-2 mobile:hidden tablet:hidden">
            {
                btns.map((btn, index) => {
                    return <div className={`w-4 h-2 rounded-full ${clientShowIndex === btn ? "bg-darkBlue" : "bg-[#ccc]"} cursor-pointer`} key={index} onClick={() => setClientShowIndex(btn)}></div>
                })
            }
            </div>
        </section>
    )
}