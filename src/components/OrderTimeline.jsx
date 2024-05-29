import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function OrderTimeline(){
    return (
        <section className="w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Alur Pemesanan Laundry</div>
            <ul className="timeline timeline-vertical mobile:-ml-[75%]">
                <li>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Pelanggan melakukan pemesanan laundry</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Kurir menjemput pakaian sesuai dengan alamat Pelanggan</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Kami mencuci dan mengeringkan pakaian Pelanggan</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Kurir mengembalikan pakaian bersih kepada Pelanggan</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Pelanggan melakukan pembarayan melauli kurir (Cash/QRIS)</div>
                    <hr className="bg-primary"/>
                </li>
                <li>
                    <hr className="bg-primary"/>
                    <div className="timeline-middle">
                        <IconCircleCheckFilled stroke={1.5} width={20} height={20} className="text-primary" />
                    </div>
                    <div className="timeline-end timeline-box border-none shadow-md">Pelanggan menikmati pakaian bersih</div>
                </li>
            </ul>
        </section>
    )
}