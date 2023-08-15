import client1 from "../assets/client1.jpg"
import client2 from "../assets/client2.jpg"

export default function HappyClients(){

    const clients = [
        {
            name: "Tatiana Ivanova",
            job: "College Student",
            text: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores ullam inventore, ea autem reprehenderit nostrum rerum veritatis quaerat consectetur rem.`,
            img: client1
        },
        {
            name: "Maria Garcia",
            job: "Housewife",
            text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam necessitatibus exercitationem quibusdam quo nemo nihil deserunt. Similique assumenda dolores sit.`,
            img: client2
        }
    ]

    return (
        <section className="happy-clients flex flex-col items-center gap-8 py-8 mobile:px-4">
            <div className="header text-3xl font-bold">Happy Clients</div>
            <div className="text w-1/2 text-center mobile:w-full">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officiis laboriosam voluptates itaque deleniti quibusdam aliquid provident recusandae obcaecati hic.</div>
            <div className="content flex justify-evenly mobile:flex-col mobile:gap-4 mobile:mt-6">
            {
                clients.map((client, index) => {
                    return (
                        <div className="client flex flex-col gap-6 w-[45%] p-4 rounded-sm mobile:w-full mobile:p-0" key={index}>
                            <div className="chat chat-start p-0">
                                <div className="chat-bubble bg-lightBlue text-black">{client.text}</div>
                            </div>
                            <div className="info flex gap-4">
                                <div className="img">
                                    <img src={client.img} alt="Image" className="w-24 rounded-full" />
                                </div>
                                <div className="name-job flex flex-col gap-2">
                                    <div className="name text-xl">{client.name}</div>
                                    <div className="job text-darkBlue">{client.job}</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}