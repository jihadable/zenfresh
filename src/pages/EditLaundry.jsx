import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";

export default function EditLaundry(){

    const { id } = useParams()
    const { laundries } = useContext(AuthContext)

    const [laundry, setLaundry] = useState(null)

    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])

    if (laundry === undefined && laundries !== null){
        return (
            <div className="text-2xl font-bold">Invalid ID</div>
        )
    }

    return (
        <>
        <Navbar />
        <Hero page={"Edit Laundry"} path={"/edit/" + id} />
        <EditLaundryContainer laundry={laundry} />
        <Footer />
        </>
    )
}

function EditLaundryContainer({ laundry }){
    return (
        <section className="edit-laundry-container w-[80vw] my-32 mx-auto flex flex-col items-center gap-8 mobile:w-full mobile:px-4 tablet:w-[90vw]">
            <div className="title text-3xl font-bold text-center">Edit Laundry</div>
            {
                laundry === null &&
                <span className="loading loading-spinner loading-lg bg-boldPurple"></span>
            }
            {
                laundry !== null &&
                <EditLaundryContent user={laundry.user} laundry={laundry} />
            }
        </section>
    )
}

function EditLaundryContent({ user, laundry }){

    const navigate = useNavigate()

    const [
        isFinishInput,
        categoryInput,
        isSelfDropInput,
        isSelfPickupInput,
        paymentMethodInput,
        totalInput,
        isPaidInput
    ] = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const { auth, token } = useContext(AuthContext)
    
    const handleSave = async() => {
        const is_finish = JSON.parse(isFinishInput.current.value)
        const category = categoryInput.current.value
        const is_self_drop = JSON.parse(isSelfDropInput.current.value)
        const is_self_pickup = JSON.parse(isSelfPickupInput.current.value)
        const payment_method = paymentMethodInput.current.value
        const total = totalInput.current.value === "" || totalInput.current.value === "0" ? null : parseInt(totalInput.current.value)
        const is_paid = JSON.parse(isPaidInput.current.value)

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }

        const end_date = is_finish ? new Date().toLocaleDateString("id-ID", options) : null

        try {
            const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT

            const { data: response } = await axios.patch(
                `${laundriesAPIEndpoint}/${laundry.id}`,
                {
                    is_finish,
                    end_date,
                    category,
                    is_self_drop,
                    is_self_pickup,
                    payment_method,
                    total,
                    is_paid
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            auth()

            console.log(response)

            navigate("/laundries")
        } catch(error) {
            const response = error.response.data

            console.log(response)
        }
    }

    return (
        <div className="edit-laundry-content w-full flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl">
            <div className="edit-laundry-content w-full flex gap-2 p-2 mobile:flex-col mobile:gap-4">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <select defaultValue={laundry.is_finish} className="value select select-sm select-primary" ref={isFinishInput}>
                            <option value={false}>Pesanan sedang dikerjakan</option>
                            <option value={true}>Pesanan telah selesai</option>
                        </select>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <select defaultValue={laundry.category} className="value select select-sm select-primary" ref={categoryInput}>
                            <option>Biasa</option>
                            <option>Premium</option>
                            <option>Kilat</option>
                        </select>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal mulai</div>
                        <div className="value">{laundry.start_date}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal selesai</div>
                        <div className="value">{laundry.end_date || "-"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Opsi pemesanan</div>
                        <div className="value flex items-center gap-2 mobile:flex-col mobile:items-start">
                            <select defaultValue={laundry.is_self_drop} className="value select select-sm select-primary" ref={isSelfDropInput}>
                                <option value={true}>Bawa sendiri</option>
                                <option value={false}>Pengambilan oleh kurir</option>
                            </select>
                            <select defaultValue={laundry.is_self_pickup} className="value select select-sm select-primary" ref={isSelfPickupInput}>
                                <option value={true}>Ambil sendiri</option>
                                <option value={false}>Pengantaran oleh kurir</option>
                            </select>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <select defaultValue={laundry.payment_method} className="value select select-sm select-primary" ref={paymentMethodInput}>
                            <option>Cash</option>
                            <option>QRIS</option>
                            <option>Bank Mandiri</option>
                            <option>OVO</option>
                        </select>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <input type="number" min={0} className="p-2 py-1 rounded-md border border-boldPurple outline-none" defaultValue={laundry.total ? laundry.total : 0} ref={totalInput} />
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status pembayaran</div>
                        <select defaultValue={laundry.is_paid} className="value select select-sm select-primary" ref={isPaidInput}>
                            <option value={false}>Belum bayar</option>
                            <option value={true}>Sudah bayar</option>
                        </select>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Nama lengkap Pelanggan</div>
                        <div className="value">{user.fullname}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Alamat</div>
                        <div className="value">{user.address || "-"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">No HP</div>
                        <div className="value">{user.no_hp || "-"}</div>
                    </div>
                </div>
            </div>
            <div className="actions flex items-center gap-2 p-2 self-end">
                <Link to={"/laundries"} className="cancel p-2 py-1 bg-red-600 gap-2 text-white rounded-md">Cancel</Link>
                <button type="button" className="save p-2 py-1 bg-green-600 gap-2 text-white rounded-md" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}