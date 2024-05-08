import { IconCheck, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

    console.log(laundry)

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

    const getTotalPayment = total => "Rp " + total.toLocaleString('id-ID')

    return (
        <div className="edit-laundry-content w-full flex flex-col rounded-md border-b-2 border-b-boldPurple overflow-hidden shadow-2xl">
            <div className="edit-laundry-content w-full flex gap-2 p-2">
                <div className="laundry-info w-full flex flex-col gap-4">
                    <div className="info-item">
                        <div className="field text-sm">ID</div>
                        <div className="value">{laundry.id}</div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Status</div>
                        <select defaultValue={laundry.is_finish ? "Pesanan telah selesai" : "Pesanan sedang dikerjakan"} className="select select-sm select-primary outline-none">
                            <option>Pesanan sedang dikerjakan</option>
                            <option>Pesanan telah selesai</option>
                        </select>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Kategori</div>
                        <select defaultValue={laundry.category} className="select select-sm select-primary outline-none">
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
                    <div className="info-item flex items-center gap-8">
                        <div className="drop flex items-center gap-1">
                        {
                            laundry.is_self_drop ?
                            <div className="rounded-md bg-green-600 text-white">
                                <IconCheck stroke={1.5} width={20} height={20} />
                            </div> :
                            <div className="rounded-md bg-red-600 text-white">
                                <IconX stroke={1.5} width={20} height={20} />
                            </div>
                        }
                            <span className="text-sm">Bawa sendiri</span>
                        </div>
                        <div className="pickup flex items-center gap-1">
                        {
                            laundry.is_self_pickup ?
                            <div className="rounded-md bg-green-600 text-white">
                                <IconCheck stroke={1.5} width={20} height={20} />
                            </div> :
                            <div className="rounded-md bg-red-600 text-white">
                                <IconX stroke={1.5} width={20} height={20} />
                            </div>
                        }
                            <span className="text-sm">Ambil sendiri</span>
                        </div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Metode pembayaran</div>
                        <div className="value"></div>
                    </div>
                    <div className="info-item">
                        <div className="field text-sm">Total pembayaran</div>
                        <input type="number" min={0} className="p-2 py-1 rounded-md border-2 border-boldPurple outline-none" defaultValue={laundry.total ? getTotalPayment(laundry.total) : 0} />
                    </div>
                    <div className="info-item flex items-center gap-1">
                    {
                        laundry.is_paid ? 
                        <>
                        <div className="rounded-md bg-green-600 text-white">
                            <IconCheck stroke={1.5} width={20} height={20} />
                        </div>
                        <span className="text-sm">Sudab bayar</span>
                        </> :
                        <>
                        <div className="rounded-md bg-red-600 text-white">
                            <IconX stroke={1.5} width={20} height={20} />
                        </div>
                        <span className="text-sm">Belum bayar</span>
                        </>
                    }
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
                <div className="cancel p-2 py-1 bg-red-600 gap-2 text-white rounded-md">Cancel</div>
                <div className="save p-2 py-1 bg-green-600 gap-2 text-white rounded-md">Save</div>
            </div>
        </div>
    )
}