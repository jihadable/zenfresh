import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const getIdDate = input => {
    if (typeof input === "number" && input.toString().length === 10) {
        return dayjs(input * 1000).fromNow()
    }

    if (typeof input === "string" && /^\d+$/.test(input)) {
        return dayjs(Number(input)).fromNow()
    }

    return dayjs(input).fromNow()
}