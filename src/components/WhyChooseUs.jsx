import { IconPlant, IconShoppingBag, IconTruckDelivery, IconWashMachine } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import goTop from "./goTop";

export default function WhyChooseUs(){

    const whyChooseUsData = [
        {
            title: "Tim laundry yang expert",
            text: "Tim laundry kami memiliki pengalaman bertahun-tahun dalam memberikan layanan laundry terbaik. Dari penghilangan noda hingga perawatan kain, kami unggul dalam setiap aspek pembersihan pakaian. Percayakan kepada kami untuk menghidupkan kembali pakaian Anda dan menjaganya tetap dalam kondisi murni.",
            svg: <IconWashMachine stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        },
        {
            title: "Kenyamanan sampai ujung jari Anda",
            text: "Kami memahami gaya hidup Anda yang sibuk, itulah sebabnya kami menawarkan opsi penjadwalan dan pengiriman tanpa kerumitan. Dengan ZeFfresh, Anda dapat menikmati kenyamanan pakaian yang bersih dan segar tanpa mengganggu rutinitas harian Anda.",
            svg: <IconTruckDelivery stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        },
        {
            title: "Komitmen dalam Ekosistem",
            text: "Di ZenFresh, kami peduli terhadap lingkungan. Laundry kami ramah lingkungan, menggunakan mesin yang efisien dan deterjen yang dapat terurai secara hayati. Bergabunglah dengan kami dalam komitmen kami terhadap kehidupan berkelanjutan sambil menikmati pakaian yang bersih dan harum.",
            svg: <IconPlant stroke={1.5} className="w-14 h-1/4 mobile:w-10 mobile:h-10" />
        }
    ]

    return (
        <section className="why-choose-us w-[80vw] mx-auto my-32 flex gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="left flex flex-col gap-4 w-3/5 h-fit sticky top-20 mobile:static mobile:w-full mobile:items-center tablet:w-2/5">
                <div className="title font-bold text-3xl mobile:text-center">Kenapa memilih ZenFresh?</div>
                <div className="text text-black/[.7] mobile:text-center">Di ZenFresh, kami bangga menjadi layanan laundry pilihan Anda karena berbagai alasan. Laundry kami menghadirkan pengalaman yang berkesan, memastikan pakaian Anda menerima perawatan terbaik. Kami memahami pentingnya kenyamanan dalam hidup Anda, itulah sebabnya kami menawarkan pilihan penjadwalan dan pengiriman yang mudah.</div>
                <Link to="/order" onClick={goTop} className="flex w-fit rounded-md gap-2 items-center px-4 py-2 bg-boldPurple text-white">
                    <span>Pesan sekarang</span>
                    <IconShoppingBag stroke={1.5} />
                </Link>
            </div>
            <div className="right flex flex-col gap-8 w-2/5 mobile:w-full tablet:w-3/5">
            {
                whyChooseUsData.map((item, index) => {
                    return (
                        <div className="item flex gap-4" key={index}>
                            <div className="svg p-4 rounded-full flex justify-center items-center bg-boldPurple/[.2] text-boldPurple h-fit">
                                {item.svg}
                            </div>
                            <div className="info flex flex-col gap-2">
                                <div className="title font-bold text-xl">{item.title}</div>
                                <div className="text text-sm">{item.text}</div>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}