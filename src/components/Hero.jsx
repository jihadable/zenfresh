export default function Hero({page, header, headerColor}){
    return (
        <div className={`${page}-hero flex justify-center items-center bg-center bg-cover w-full h-[80vh] bg-fixed`}>
            <div className={`tagline font-bold text-5xl ${headerColor} mobile:text-2xl`}>{header}</div>
        </div>
    )
}