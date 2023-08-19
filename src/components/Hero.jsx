export default function Hero({page, header}){

    return (
        <div className={`${page}-hero flex justify-center items-center bg-center bg-cover w-full h-[100vh] bg-fixed`}>
            <div className={`tagline font-bold text-5xl text-greenCustome mobile:text-2xl`}>{header}</div>
        </div>
    )
}