const ctx1 = document.getElementById("activityBarChart").getContext("2d");

//Weekly Activity
new Chart(ctx1, {
    type: "bar",
    data: {
        labels: [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
        ],
        datasets: [{
            label: "Workout Minutes",
            data: [35, 45, 60, 50, 70, 55, 65],
            backgroundColor: [
                "#6db2f7",
                "#5fa5ec",
                "#5299e1",
                "#458dd6",
                "#3780cb",
                "#2a74c0",
                "#0e4ebb",
            ],
            borderRadius: 8,
            maxBarThickness: 45
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            x: {
                grid: { display: false },
            },
            y: {
                beginAtZero: true,
                grid: {
                    borderDash: [5, 5],
                    color: "rgba(255,255,255,0.1)",
                }
            }
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
            delay: (context) => context.dataIndex * 150
        }
    }
});


//Workout Goals
const ctx2 = document.getElementById("goalDonutChart");

new Chart(ctx2, {
    type: "doughnut",
    data: {
        datasets: [{
            data: [70, 30],
            backgroundColor: ["#0e4ebb", "#2e3a52"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        rotation: 0,
        circumference: 360,

        cutout: "70%",

        animation: {
            animateRotate: true,
            duration: 1500,
            easing: "easeOutCubic"
        },

        plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
        }
    }
});



//Heartbeat

const bpmValue = document.getElementById("bpmValue");

const statusElement = document.getElementById("bpmStatus");

if (bpmValue < 60) {
    statusElement.textContent = "Low";
    statusElement.style.color = "#ff4d4d";
} else if (bpmValue > 100) {
    statusElement.textContent = "High";
    statusElement.style.color = "#ff4d4d";
} else {
    statusElement.textContent = "Normal";
    statusElement.style.color = "#00ff88";
}

const heartbeatCtx = document.getElementById("heartbeatChart");

new Chart(heartbeatCtx, {
    type: "line",

    data: {
        labels: Array(20).fill(""),
        datasets: [{
            data: [72, 75, 80, 78, 82, 77, 79, 85, 83, 78, 76, 81, 88, 84, 79, 75, 78, 80, 77, 78],
            borderColor: "#ff4d6d",
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 0,
            fill: false
        }]
    },

    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: { display: false },
            y: { display: false }
        }
    }
});


//Sleep Schedule
const sleepHours = 6.5;
const requiredHours = 8;
const percent_sleep = (sleepHours / requiredHours) * 100;

const progressBar = document.getElementById('sleepProgress');

setTimeout(() => {
    progressBar.style.width = percent_sleep + "%";
}, 300);


//Food Measurement
const circle = document.querySelector(".food__circle");

const food_goal = 1100;
const eaten = 100;

const percent_food = Math.round((eaten / food_goal) * 100);

let current_food = 0;

function animateDonut() {

    if (current_food <= percent_food) {

        circle.style.background = `
        conic-gradient(
            #6db2f7 0% ${current_food}%,
            #2e3a52 ${current_food}% 100%
        )`;

        current_food++;

        requestAnimationFrame(animateDonut);
    }
}

animateDonut();


//Water Measurement
let goal = 3500;
let current = 1000;
const step = 250;

const capsule = document.querySelector(".water__capsule");
const percentText = document.getElementById("waterPercent");

function updateWater() {
    current = Math.max(0, Math.min(current, goal));

    let percent = (current / goal) * 100;

    let color;

    if (percent < 40) {
        color = "#ff4d4d"; // red (low water)
    } 
    else if (percent < 70) {
        color = "#ff8c42"; // orange (medium)
    } 
    else {
        color = "#6db2f7"; // blue (good hydration)
    }

    capsule.style.background =
        `linear-gradient(to top, ${color} ${percent}%, #eee ${percent}%)`;

    percentText.textContent = Math.round(percent) + "%";
}

document.getElementById("addWater").onclick = () => {
    current += step;
    updateWater();
};

document.getElementById("removeWater").onclick = () => {
    current = Math.max(0, current - step);
    updateWater();
};

updateWater();

//Health Progress
const healthValue = 67;

document.getElementById("healthPercent").textContent = healthValue + "%";

const healthStatus = document.getElementById("healthStatus");

if (healthValue < 40) {
    healthStatus.textContent = "Poor";
    healthStatus.style.color = "#ff4d4d";
}
else if (healthValue < 70) {
    healthStatus.textContent = "Average";
    healthStatus.style.color = "#ff8c42";
}
else {
    healthStatus.textContent = "Healthy";
    healthStatus.style.color = "#00ff88";
}


const segments = document.querySelectorAll(".health__segment");
const totalSegments = segments.length;
const activeCount = Math.floor((healthValue / 100) * totalSegments);

segments.forEach((segment, index) => {
    if (index < activeCount) {
        segment.classList.add("health__segment--active");
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const totalTime = 20;
    const completedTime = 10;

    const timeLeft = totalTime - completedTime;
    const progressPercent = (completedTime / totalTime) * 100;

    document.getElementById("meditationTimeLeft").textContent =
        timeLeft + " min left";

    const progressBar = document.getElementById("meditationProgress");
    progressBar.style.width = progressPercent + "%";

});


//Steps
const stepsCtx = document.getElementById("stepsLineChart");

if (stepsCtx) {
    new Chart(stepsCtx, {
        type: "line",
        data: {
            labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
            datasets: [{
                label: "Steps",
                data: [500, 1800, 3200, 4500, 7200, 9000],
                borderColor: "#0e4ebb",
                backgroundColor: "rgba(14,78,187,0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: "#0e4ebb"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Time"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Steps Count"
                    },
                    beginAtZero: true
                }
            }
        }
    });
}