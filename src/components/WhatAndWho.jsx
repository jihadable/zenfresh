import aboutUs from "../assets/aboutus.jpg"

export default function WhatAndWho(){

    const whatAndWhoData = [
        {
            title: "Siapa kami",
            text: "Kami lebih dari sekedar layanan laundry. Kami adalah tim profesional berdedikasi yang bersemangat memberikan perawatan yang luar biasa. Perjalanan kami dimulai dengan visi untuk memberikan pengalaman laundry yang memadukan kenyamanan, kualitas, dan keberlanjutan ekonomi. Dengan keahlian bertahun-tahun di industri laundry, kami telah berkembang menjadi nama yang terpercaya. Kami bangga atas komitmen kami terhadap kepuasan pelanggan dan praktik sadar lingkungan. Kenali wajah-wajah di balik Zenfresh dan temukan layanan laundry yang peduli."
        },
        {
            title: "Apa yang kami kerjakan",
            text: "Misi inti kami sederhana: membuat hidup Anda lebih mudah dan pakaian Anda lebih segar. Kami menawarkan layanan komprehensif yang mencakup pencucian, pengeringan, pelipatan, dan bahkan perawatan khusus untuk kain halus. Opsi penjemputan dan pengantaran kami yang efisien dirancang agar sesuai dengan jadwal Anda, memberikan Anda kenyamanan yang layak Anda dapatkan. Selain kebersihan, kami memprioritaskan umur panjang pakaian Anda dan kesejahteraan bumi kita. Melalui praktik ramah lingkungan dan keahlian laundry terbaik, kami bertujuan untuk mendefinisikan kembali pengalaman laundry Anda."
        }
    ]

    return (
        <section className="what-and-who w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="img flex">
                <img src={aboutUs} alt="Image" className="w-full h-fit rounded-md" />
            </div>
            <div className="info flex gap-4 mobile:flex-col">
            {
                whatAndWhoData.map((item, index) => {
                    return (
                        <div className="item w-full flex flex-col gap-4" key={index}>
                            <div className="title text-2xl font-bold">{item.title}</div>
                            <div className="text text-black/[.7] text-justify">{item.text}</div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}