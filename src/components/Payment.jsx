import dana from "../assets/dana.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import bri from "../assets/bri.png"
import bni from "../assets/bni.png"
import linkaja from "../assets/linkaja.png"
import spay from "../assets/spay.png"

export default function Payment(){

    const payment = [dana, mandiri, ovo, bri, bni, linkaja, spay]

    return (
        <section className="payment my-12 mt-24 mx-auto flex flex-col items-center gap-4 mobile:w-full mobile:px-4">
            <div className="payment-header text-3xl font-bold">Payment methods</div>
            <div className="payment-content flex items-center gap-4 mobile:flex-wrap">
            {
                payment.map((item, index) => {
                    return <img src={item} alt="Payment" className="w-24 h-fit mobile:w-16 tablet:w-20" key={index} />
                })
            }
            </div>
        </section>
    )
}