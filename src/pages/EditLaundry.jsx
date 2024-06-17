import { IconChevronLeft, IconSquareCheck, IconStarFilled } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import NotFound from "./NotFound";

export default function EditLaundry(){

    const { id } = useParams()
    const { login, isAdmin, laundries } = useContext(AuthContext)
    
    const [laundry, setLaundry] = useState(null)
    
    useEffect(() => {
        if (laundries !== null){
            setLaundry(laundries.filter(laundry => laundry.id === id)[0])
        }
    }, [id, laundries])
    
    if (login === false || isAdmin === false || (laundry === undefined && laundries !== null)){
        return <NotFound />
    }

    if (login === true && isAdmin && laundries !== null && laundry !== undefined){
        document.title = "ZenFresh | Edit Laundry"

        return (
            <>
            <Navbar />
            <Hero page={"Edit Laundry"} path={"/edit/" + id} />
            <EditLaundryContainer laundry={laundry} />
            <Footer />
            </>
        )
    }
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
        statusInput,
        categoryInput,
        weightInput
    ] = [
        useRef(null),
        useRef(null),
        useRef(null)
    ]

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const getAllCategories = async() => {
            try {
                const categoriesAPIEndpoint = import.meta.env.VITE_CATEGORIES_API_ENDPOINT

                const { data: response } = await axios.get(categoriesAPIEndpoint)

                setCategories(response.categories)
            } catch (error){
                console.log(error)
            }
        }

        getAllCategories()
    }, [])

    const [isLoading, setIsLoading] = useState(false)

    const { auth, token } = useContext(AuthContext)
    
    const handleSave = async() => {
        const status = statusInput.current.value
        const category = categoryInput.current.value
        const weight = weightInput.current.value === "" || weightInput.current.value === "0" ? null : parseFloat(weightInput.current.value)

        try {
            setIsLoading(true)

            const laundriesAPIEndpoint = import.meta.env.VITE_LAUNDRIES_API_ENDPOINT

            await axios.patch(
                `${laundriesAPIEndpoint}/${laundry.id}`,
                {
                    status,
                    category,
                    weight
                },
                {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                }
            )

            auth()

            toast.success("Berhasil memperbarui pesanan")

            setIsLoading(false)

            navigate("/laundries")
        } catch(error) {
            console.log(error)
            toast.error("Gagal memperbarui pesanan")
            setIsLoading(false)
        }
    }

    const getIDCurrency = total => "Rp " + total.toLocaleString("id-ID")

    const getArrayOfStarsFromRating = rate => {
        const arr = []

        for (let i = 1; i <= rate; i++){
            arr.push(true)
        }

        for (let i = rate + 1; i <= 5; i++){
            arr.push(false)
        }

        return arr
    }

    return (
        <div className="edit-laundry-content w-full flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl bg-white">
            <div className="edit-laundry-content w-full flex gap-2 p-2 mobile:flex-col mobile:gap-4">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value font-bold">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <select defaultValue={laundry.status} className="value select select-sm select-primary" ref={statusInput}>
                            <option>Menunggu konfirmasi</option>
                            <option>Kurir menjemput pakaian pelanggan</option>
                            <option>Menunggu proses pencucian</option>
                            <option>Kurir mengantar pakaian pelanggan</option>
                            <option>Menunggu pembayaran</option>
                            <option>Selesai</option>
                        </select>
                    </div>
                {
                    categories !== null &&   
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <select defaultValue={laundry.category.id} className="value select select-sm select-primary" ref={categoryInput}>
                        {
                            categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name} ({getIDCurrency(category.price)})</option>
                            ))
                        }
                        </select>
                    </div>
                }
                    <div className="info-item">
                        <div className="field text-sm">Berat total(kg)</div>
                        <div className="value flex items-center gap-1">
                            <input type="number" min={0} className="p-2 py-1 rounded-md border border-boldPurple outline-none" defaultValue={laundry.weight ? laundry.weight : 0} ref={weightInput} />
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal mulai</div>
                        <div className="value">{laundry.start_date}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Tanggal selesai</div>
                        <div className="value">{laundry.end_date || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <div className="field">{laundry.payment_method || "--"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <div className="value font-bold text-boldPurple">{laundry.weight !== null ? getIDCurrency(laundry.weight * laundry.category.price) : "Rp --"}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status pembayaran</div>
                        <div className={`font-bold px-2 py-1 rounded-md text-xs w-fit h-fit ${laundry.is_paid ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>{laundry.is_paid ? "Sudah bayar" : "Belum bayar"}</div>
                    </div>
                </div>
                <div className="user-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">Rate dari pelanggan</div>
                        <div className="value">
                        {
                            laundry.rate ?
                            getArrayOfStarsFromRating(laundry.rate).map((item, index) => (
                                <IconStarFilled className={`${item ? "text-boldPurple" : "text-neutral"}`} width={12} height={12} key={index} />
                            )) : 
                            "Tidak ada"
                        }
                        </div>
                    </div>
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
                <Link to={"/laundries"} className="cancel flex items-center justify-center w-20 py-1 gap-1 bg-red-600 text-white rounded-md text-sm">
                    <IconChevronLeft stroke={1.5} width={20} height={20} />
                    <span>Cancel</span>
                </Link>
                {
                    isLoading ?
                    <div className="flex items-center justify-center w-20 py-1 rounded-md text-white bg-green-600">
                        <span className="loading loading-spinner loading-sm"></span>
                    </div> :
                    <button type="button" className="save flex items-center justify-center w-20 py-1 gap-1 bg-green-600  text-white rounded-md text-sm" onClick={handleSave}>
                        <IconSquareCheck stroke={1.5} width={20} height={20} />
                        <span>Save</span>
                    </button>
                }
            </div>
        </div>
    )
}