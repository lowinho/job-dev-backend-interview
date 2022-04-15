export type ISchedule = {
    id?: number;
    idRestaurant: number;
    idSale: number;
    dayWeek: string;
    initialTime: string;
    endTime: string;
}