img = "";
objects = [];
model_status = "";

function preload() {
    img = loadImage("Computer.jpg")
}

function setup() {
    canvas = createCanvas(620 , 460)
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded")
    objectDetector.detect(img, gotResults)
    model_status = true
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results
    }
}

function draw() {
        image(img, 0, 0, 620, 460)
    if (model_status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected | CocoSSD Model has identified " + objects.length + " object/s"

            fill("red")
            percentage = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percentage  + "%" , objects[i].x + 15 , objects[i].y + 15)
            noFill()
            stroke("red")
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height)
        }
    }
}
