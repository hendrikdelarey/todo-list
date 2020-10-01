class Shape {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
    }

    calculateSurface() {
    }

    printX () {
        console.log(x);
    }
}

class Triangle extends Shape {
    calculateSurface() {
        return this.x * this.y;
    }

    printX() {
        console.log("y")
    }
}

class Rectangle extends Shape {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
    }

    calculateSurface() {
        super.printX()
    }
}

let testRectangle = new Rectangle(5, 3);
let testTriangle = new Triangle(3, 2);



let shapes = [testRectangle, testTriangle]

shapes.forEach(s => {
    s.printX();
})
