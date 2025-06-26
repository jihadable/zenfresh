import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const getIdDate = (timestamp) => {
    return dayjs(Number(timestamp)).fromNow()
}
