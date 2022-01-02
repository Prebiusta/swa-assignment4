import {DataType} from "./DataType.js";

export class Event extends DataType {
    constructor(time, place, type, unit) {
        super(type, unit)
        this.time = time
        this.place = place
    }

    getTime = () => this.time

    getPlace = () => this.place
}