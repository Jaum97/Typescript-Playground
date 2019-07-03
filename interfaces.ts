interface Vehicle {
}
interface TwoWheeler implements Vehicle {
}

class Vehicle {
    constructor (public brand: string) { }
    getBrandName() {
        return brand;
    }
}
class Engine {
    constructor (public manufacturer: string) { }
    getManufacturerName() {
        return manufacturer;
    }
}
interface TwoWheeler extends Vehicle, Engine {
    getBrandName();
    getManufacturerName()
}
