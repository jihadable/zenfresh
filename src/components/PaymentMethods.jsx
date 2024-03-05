import dana from "../assets/dana.png"
import mandiri from "../assets/mandiri.png"
import ovo from "../assets/ovo.png"
import bri from "../assets/bri.png"
import bni from "../assets/bni.png"
import linkaja from "../assets/linkaja.png"
import spay from "../assets/spay.png"
import qris from "../assets/qris.png"
import bca from "../assets/bca.png"
import gopay from "../assets/gopay.png"
import paypal from "../assets/paypal.png"

export default function PaymentMethods(){

    const paymentMethodsData = [dana, qris, bca, mandiri, ovo, bri, gopay, bni, linkaja, spay, paypal]

    return (
        <section className="payment-methods w-[80vw] mx-auto my-32 flex flex-col items-center gap-8 mobile:flex-col mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title font-bold text-3xl text-center">Metode Pembayaran</div>
            <div className="payment-methods-items flex items-center justify-center flex-wrap gap-4">
            {
                paymentMethodsData.map((item, index) => {
                    return <img src={item} alt="Image" className="h-8 mobile:h-6" key={index} />
                })
            }
            </div>
        </section>
    )
}