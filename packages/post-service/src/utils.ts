import { DateDto } from "@instagram-node/common";

export const mapDateToDto = (date: Date): DateDto => {
    const dateCreate = new DateDto();
    dateCreate.setDay(date.getDay())
    dateCreate.setMonth(date.getMonth())
    dateCreate.setYear(date.getFullYear())
    return dateCreate;
}
