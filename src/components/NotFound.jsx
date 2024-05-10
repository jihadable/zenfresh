export default function NotFound(){
    return (
        <section className="not-found w-full h-screen flex justify-center items-center mobile:px-4">
            <div className="content flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl mobile:w-full">
                <div className="text-boldPurple text-7xl font-bold">404</div>
                <div className="text-3xl font-bold">Page Not Found</div>
            </div>
        </section>
    )
}