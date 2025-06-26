import { IconCircleNumber1Filled, IconCircleNumber2Filled, IconCircleNumber3Filled, IconCircleNumber4Filled, IconCircleNumber5Filled, IconCircleNumber6Filled } from "@tabler/icons-react";

export default function OrderTimeline(){
    return (
        <section className="w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Order timeline</div>
            <ul className="timeline timeline-vertical mobile:-ml-[75%]">
                <li>
                    <div className="timeline-middle">
                        <IconCircleNumber1Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Customer places a laundry order</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleNumber2Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Courier picks up the clothes from the customer's address</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleNumber3Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">We wash and dry the customer's clothes</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleNumber4Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Courier delivers the clean clothes back to the customer</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleNumber5Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Customer makes a payment</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleNumber6Filled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Customer enjoys their clean clothes</div>
                </li>
            </ul>
        </section>
    )
}