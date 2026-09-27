// Initial student marks

let subjects = [

    {
        name: "Web Development",
        marks: 25
    },

    {
        name: "DBMS",
        marks: 19
    },

    {
        name: "Data Structures",
        marks: 21
    },

    {
        name: "OOP with Java",
        marks: 18
    },

    {
        name: "Discrete Maths",
        marks: 10
    }

];


let editIndex = -1;


// Display table

function displayData() {

    const table =
        document.getElementById("marksTable");

    table.innerHTML = "";


    subjects.forEach((item, index) => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${item.name}
            </td>

            <td>
                ${item.marks}/30
            </td>

            <td>
                ${((item.marks / 30) * 100).toFixed(1)}%
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editSubject(${index})">

                    Edit

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteSubject(${index})">

                    Delete

                </button>

            </td>

        `;


        table.appendChild(row);

    });


    calculateSummary();

    drawChart();

}



// Add or Update Subject

function addOrUpdate() {

    const subject =
        document
        .getElementById("subject")
        .value
        .trim();


    const marks =
        Number(
            document
            .getElementById("marks")
            .value
        );


    const message =
        document.getElementById("message");


    // Validation

    if (
        subject === "" ||
        marks < 0 ||
        marks > 30 ||
        isNaN(marks)
    ) {

        message.textContent =
            "Enter a subject and marks between 0 and 30.";

        return;

    }


    // Add new subject

    if (editIndex === -1) {

        subjects.push({

            name: subject,

            marks: marks

        });


        message.textContent =
            "Subject added successfully!";

    }


    // Update existing subject

    else {

        subjects[editIndex] = {

            name: subject,

            marks: marks

        };


        editIndex = -1;


        message.textContent =
            "Subject updated successfully!";

    }


    // Clear inputs

    document
        .getElementById("subject")
        .value = "";


    document
        .getElementById("marks")
        .value = "";


    displayData();

}



// Edit subject

function editSubject(index) {

    document
        .getElementById("subject")
        .value =
        subjects[index].name;


    document
        .getElementById("marks")
        .value =
        subjects[index].marks;


    editIndex = index;


    document
        .getElementById("message")
        .textContent =
        "Edit the values and click Add / Update.";

}



// Delete subject

function deleteSubject(index) {

    subjects.splice(index, 1);

    displayData();

}



// Calculate Total, Average and Highest

function calculateSummary() {

    const total =
        subjects.reduce(
            (sum, item) =>
                sum + item.marks,
            0
        );


    const average =
        subjects.length
        ? total / subjects.length
        : 0;


    const highest =
        subjects.length
        ? Math.max(
            ...subjects.map(
                item => item.marks
            )
        )
        : 0;


    document
        .getElementById("total")
        .textContent =
        total +
        " / " +
        (subjects.length * 30);


    document
        .getElementById("average")
        .textContent =
        average.toFixed(2);


    document
        .getElementById("highest")
        .textContent =
        highest;

}



// Draw Dynamic Bar Chart

function drawChart() {

    const canvas =
        document.getElementById("chart");


    const ctx =
        canvas.getContext("2d");


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    const left = 70;

    const bottom = 310;

    const chartHeight = 250;

    const chartWidth = 680;


    // Draw axes

    ctx.beginPath();

    ctx.moveTo(left, 40);

    ctx.lineTo(left, bottom);

    ctx.lineTo(750, bottom);

    ctx.stroke();


    // Y-axis labels

    ctx.font =
        "14px Arial";


    ctx.fillStyle =
        "#111827";


    for (
        let i = 0;
        i <= 30;
        i += 5
    ) {

        const y =
            bottom -
            (i / 30) *
            chartHeight;


        ctx.fillText(
            i,
            35,
            y + 5
        );


        // Grid lines

        ctx.beginPath();

        ctx.moveTo(left, y);

        ctx.lineTo(750, y);

        ctx.strokeStyle =
            "#e5e7eb";

        ctx.stroke();

    }


    const barWidth =
        subjects.length
        ? chartWidth / subjects.length - 25
        : 60;


    // Draw bars

    subjects.forEach(
        (item, index) => {

            const x =
                left +
                25 +
                index *
                (
                    chartWidth /
                    Math.max(
                        subjects.length,
                        1
                    )
                );


            const barHeight =
                (item.marks / 30) *
                chartHeight;


            const y =
                bottom -
                barHeight;


            // Bar

            ctx.fillStyle =
                "#2563eb";


            ctx.fillRect(
                x,
                y,
                barWidth,
                barHeight
            );


            // Marks on top

            ctx.fillStyle =
                "#111827";


            ctx.fillText(
                item.marks,
                x + 10,
                y - 8
            );


            // Subject name

            ctx.save();


            ctx.translate(
                x + barWidth / 2,
                bottom + 18
            );


            ctx.rotate(-0.35);


            ctx.fillText(
                item.name,
                -35,
                0
            );


            ctx.restore();

        }
    );

}



// Display data when page loads

displayData();
