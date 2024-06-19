export const getIdDate = (date) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }

    return date.toLocaleDateString("id-ID", options)
}