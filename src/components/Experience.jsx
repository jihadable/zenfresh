export default function Experience(){

    const expItems = [
        {
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-filled text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" stroke-width="0" fill="currentColor"></path>
            </svg>,
            nums: 3096,
            title: "Happy Clients"
        },
        {
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-address-book text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z"></path>
                <path d="M10 16h6"></path>
                <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M4 8h3"></path>
                <path d="M4 12h3"></path>
                <path d="M4 16h3"></path>
            </svg>,
            nums: 7,
            title: "Years of experience"
        },
        {
            svg:
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users text-greenCustome" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
            </svg>,
            nums: 20,
            title: "Employees"
        }
    ]

    return (
        <section className="exp flex justify-evenly py-8 my-32 mobile:flex-col mobile:items-center mobile:gap-10">
        {
            expItems.map((exp, index) => {
                return (
                    <div className="item flex flex-col gap-2 items-center bg-[rgb(102,187,106,.3)] p-8 rounded-[74%_26%_72%_28%_/_27%_69%_31%_73%] w-fit" key={index}>
                        {exp.svg}
                        <div className="nums text-3xl font-bold">{exp.nums}</div>
                        <div className="title">{exp.title}</div>
                    </div>
                )
            })
        }
        </section>
    )
}