export default function Hero({page, header}){

    return (
        <div className={`${page}-hero flex justify-center items-center bg-center bg-cover w-full h-[100vh] bg-fixed`}>
            <div className={`tagline font-bold text-5xl text-greenCustome [text-shadow:2px_0_10px_#000] mobile:text-2xl`}>{header}</div>
        </div>
    )
}