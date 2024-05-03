import { IconAlarm, IconBottle, IconHeartHandshake, IconTruckReturn } from "@tabler/icons-react"

export default function Plans(){

    const plansData = [
        {
            title: "Pilih Waktu untuk Pemesanan",
            svg: <IconAlarm stroke={1.5} width={64} height={64} />,
            text: "Pilih waktu pengiriman yang sesuai dengan jadwal Anda."
        },
        {
            title: "Kami Mencuci dan Mengeringkan Cucian Kotor",
            svg: <IconBottle stroke={1.5} width={64} height={64} /> ,
            text: "Tim kami menangani pencucian dan pengeringan pakaian kotor Anda dengan presisi."
        },
        {
            title: "Kami Mengembalikan Cucian Bersih Anda",
            svg: <IconTruckReturn stroke={1.5} width={64} height={64} />,
            text: "Kami akan segera mengembalikan cucian Anda dalam keadaan segar, bersih, dan siap pakai."
        },
        {
            title: "Bersantai dan Nikmati Pakaian Bersih Anda",
            svg: <IconHeartHandshake stroke={1.5} width={64} height={64} />,
            text: "Duduk, bersantai, dan nikmati kemewahan pakaian bersih dan rapi tanpa repot."
        }
    ]

    return (
        <section className="plans w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Laundry mudah dan cepat</div>
            <div className="plans-items flex gap-4 mobile:flex-col">
            {
                plansData.map((item, index) => {
                    return (
                        <div className="plan flex flex-col items-center gap-4" key={index}>
                            <div className="img w-fit flex justify-center items-center p-4 rounded-full bg-boldPurple/[.2] text-boldPurple">
                                {item.svg}
                            </div>
                            <div className="title font-bold text-xl text-center">{item.title}</div>
                            <div className="text text-center text-[#555] text-sm">{item.text}</div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}