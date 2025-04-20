// Jai Shree Ram 🚩

function markingPoints() {
    const main = document.querySelector(".main");
    main.style.pointerEvents = "none";

    let isDrawing = false;
    let posX = 0;
    let posY = 0;
    let lastX = null;
    let lastY = null;

    // Function to add point
    function addPoint(x, y) {
        const point = document.createElement("div");
        point.className = "point absolute w-2 h-2 rounded-full bg-white";
        point.style.left = `${x}px`;
        point.style.top = `${y}px`;
        point.style.opacity = "1";
        main.appendChild(point);
    }

    // Drawer loop for speed
    function drawerLoop() {
        if (isDrawing && lastX !== null && lastY !== null) {
            addPoint(lastX, lastY);
        }
        setTimeout(drawerLoop, 0);
    }

    // Mouse events
    document.addEventListener("mousedown", (e) => {
        if (e.button === 0) isDrawing = true;
    });

    document.addEventListener("mouseup", () => {
        isDrawing = false;
    });

    document.addEventListener("mousemove", (e) => {
        posX = e.clientX;
        posY = e.clientY;
        if (isDrawing) {
            lastX = posX;
            lastY = posY;
        }
    });

    // Touch events (for mobile)
    document.addEventListener("touchstart", (e) => {
        isDrawing = true;
        const touch = e.touches[0];
        lastX = touch.clientX;
        lastY = touch.clientY;
    }, { passive: false });

    document.addEventListener("touchend", () => {
        isDrawing = false;
    });

    document.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Prevents scrolling while drawing
        const touch = e.touches[0];
        posX = touch.clientX;
        posY = touch.clientY;
        if (isDrawing) {
            lastX = posX;
            lastY = posY;
        }
    }, { passive: false });

    drawerLoop(); // Start loop
}


function deleteBtn() {
    document.querySelector(".del")
        .addEventListener("click", () => {
            document.querySelector(".main").innerHTML = ``
        })
}

function main() {
    markingPoints();
    deleteBtn();
}

main();