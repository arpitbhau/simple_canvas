// Jai Shree Ram 🚩

function markingPoints() {
    const main = document.querySelector(".main");
    main.style.pointerEvents = "none"; // Disable interactions with the drawing area

    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;
    let lastX = null;
    let lastY = null;

    // Track mouse position & mouse down/up events
    document.addEventListener("mousedown", e => e.button === 0 && (isMouseDown = true)); // Left mouse down
    document.addEventListener("mouseup", e => e.button === 0 && (isMouseDown = false)); // Left mouse up
    document.addEventListener("mousemove", e => {
        mouseX = e.clientX; // Get mouse X position
        mouseY = e.clientY; // Get mouse Y position
    });

    // Function to add a point (dot)
    function addPoint(x, y) {
        const point = document.createElement("div");
        point.className = "point absolute w-2 h-2 rounded-full bg-white"; // Style the point (dot)
        point.style.left = `${x}px`; // X position
        point.style.top = `${y}px`; // Y position
        point.style.opacity = "1"; // No fade, make the point instantly visible

        main.appendChild(point); // Add point to the main container
    }

    // Fast point placement loop to ensure drawing at maximum speed
    function drawerLoop() {
        if (isMouseDown) {
            if (lastX !== null && lastY !== null) {
                // Place multiple points per frame to create a smooth drawing effect
                addPoint(lastX, lastY);
            }
        }
        setTimeout(() => drawerLoop(), 0); // Run the loop at maximum speed, as fast as possible
    }

    // Update last position when the mouse is down
    document.addEventListener("mousemove", () => {
        if (isMouseDown) {
            lastX = mouseX; // Update last X position
            lastY = mouseY; // Update last Y position
        }
    });

    // Start drawing loop
    drawerLoop();
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