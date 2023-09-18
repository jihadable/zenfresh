import { IconChevronDown } from "@tabler/icons-react"
import faqsImg from "../assets/faqs.jpg"
import { useState } from "react"

export default function Faqs(){

    const faqsData = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods, including digital payments, e-wallet, and bank transfers for your convenience."
        },
        {
            question: "How do I schedule laundry pickup and delivery times?",
            answer: "You can easily schedule laundry pickup and delivery times through our user-friendly online platform. Simply select the preferred time slots that suit your schedule, and we'll handle the rest."
        },
        {
            question: "Are my clothes safe with ZenFresh's laundry service?",
            answer: "Absolutely. At ZenFresh, we prioritize the safety and care of your garments. Our experienced team follows strict quality control procedures to ensure your clothes are handled and cleaned with the utmost care and attention. Your satisfaction and the well-being of your clothing are our top priorities."
        },
        {
            question: "Does ZenFresh handle special garments or specific cleaning requests?",
            answer: "Yes, we can handle various types of special garments and specific cleaning requests. Please let us know your needs, such as dry cleaning, care for special fabrics, or other specific requests when you place your order, and we will be happy to accommodate those requirements. We prioritize providing a tailored laundry service to meet your unique needs."
        }
    ]

    const [faqsIndexOpen, setFaqsIndexOpen] = useState(0)

    return (
        <section className="faqs w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Frequently Asked Questions</div>
            <div className="faqs-content relative flex flex-col w-full mobile:static">
                <div className="faqs-img flex w-[60vw] mobile:hidden">
                    <img src={faqsImg} alt="Image" className="w-full rounded-md h-fit" />
                </div>
                <div className="faqs-items absolute self-end w-2/3 mt-8 overflow-hidden rounded-md  bg-[rgb(255,255,255,.5)] backdrop-blur-lg shadow-2xl mobile:mt-0 mobile:static mobile:w-full mobile:bg-white">
                {
                    faqsData.map((item, index) => {
                        return (
                            <div className="item flex flex-col" key={index}>
                                <div className={`question font-bold flex items-center justify-between px-6 py-4 cursor-pointer mobile:p-4 ${faqsIndexOpen === index ? "bg-boldPurple shadow-2xl text-white" : ""}`} onClick={() => setFaqsIndexOpen(index)}>
                                    <span className="mobile:max-w-[90%] tablet:max-w-[90%]">{item.question}</span>
                                    <IconChevronDown stroke={1.5} />
                                </div>
                                <div className={`answer ${faqsIndexOpen === index ? "active" : ""}`}>
                                    <p className="text px-8 py-4 text-[rgb(0,0,0,.7)] mobile:px-6">{item.answer}</p>
                                </div>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </section>
    )
}