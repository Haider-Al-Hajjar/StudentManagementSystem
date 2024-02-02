
var currentId = ""

document.addEventListener("DOMContentLoaded", function checkPassword(confirmed) {
    readFromFile().then((database) => {
        console.log(readFromFile())
        console.log(database)
        while (confirmed !== 1) {
            let isTeacher = prompt("Welcome to the Student Management System. Type 'teacher' if you're a teacher, and 'student' if you're a student. (Case sensitive).")
            if (isTeacher == null) {
                alert("You must submit an answer.")
            }
            else if (isTeacher.toString() == "`") {
                return
            }
            else if (isTeacher.toString() == 'teacher') {
                console.log("Is Teacher!")
                const teacherId = prompt("Enter teacher id")
                for (let i = 0; i < database.teachers.length; i++) {
                    if (parseFloat(teacherId) === database.teachers[i]) {
                        console.log("Teacher Id correct!")
                        alert("Login successful.")
                        currentId = database.teachers[i]
                        confirmed = 1
                        return
                    }
                }
                alert("Id incorrect.")
            }
            else if (isTeacher.toString() == 'student') {
                console.log("Is Student!")
                const studentId = prompt("Enter student id")
                for (let i = 0; i < database.students.length; i++) {
                    if (parseFloat(studentId) === database.students[i]) {
                        console.log("Student Id correct!")
                        alert("Login successful.")
                        currentId = database.students[i]
                        confirmed = 1
                        return
                    }
                }
                alert("Id incorrect.")
            }
            else if (isTeacher.toString() == 'admin') {
                console.log("Is Admin!")
                const adminId = prompt("Enter admin id")
                for (let i = 0; i < database.admins.length; i++) {
                    if (adminId == database.admins[i]) {
                        console.log("Admin Id correct!")
                        alert("Login successful.")
                        currentId = database.admins[i]
                        confirmed = 1
                        return
                    }
                }
                alert("Id incorrect.")

            }
        }
    })

})

function readFromFile() {
    return fetch('http://localhost:3000/readFromFile')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error('Error reading from file:', error);
            throw error; // Re-throw the error to propagate it to the caller
        })
}


function writeToFile(idArray) {
    // Your data to be written to the file
    input = document.getElementById("addStudentIDButton")
    if (parseFloat(input.value) !== null) {
        idArray = {
            input: parseFloat(input.value)
        }
    }
    // Make a POST request to the server endpoint for writing data
    fetch('http://localhost:3000/writeToFile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(idArray),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(message => {
            console.log(message);
        })
        .catch(error => {
            console.error('Error writing to file:', error);
        });
}