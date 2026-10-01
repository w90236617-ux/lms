var totalStd = document.getElementById("totalstd")
var totalcourse = document.getElementById("totalcourse")
var totalquiz = document.getElementById("totalquiz")
var maintabl = document.getElementById("maintabl")
var maintable = document.getElementById("maintable")

async function GetAllUsers() {

    // ===== TOTAL STUDENTS =====
    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val())
        maintable.classList.remove("hide")
        loading.style.display = "none"

        if (db.val() == null) {
            totalStd.innerText = 0
            return
        }

        var data = Object.values(db.val())
        console.log(data.length)
        totalStd.innerText = data.length
    })
        .catch((e) => {
            console.log(e)
        })


    // ===== TOTAL COURSES =====
    await firebase.database().ref("course").get().then((db) => {
        console.log(db.val())
        maintabl.classList.remove("hide")

        if (db.val() == null) {
            totalcourse.innerText = 0
            return
        }

        var data = Object.values(db.val())
        console.log(data.length)
        totalcourse.innerText = data.length
    })
        .catch((e) => {
            console.log(e)
        })


    // ===== TOTAL QUIZZES =====
    await firebase.database().ref("Quiz").get().then((db) => {
        console.log(db.val())

        if (db.val() == null) {
            totalquiz.innerText = 0
            return
        }

        var data = Object.values(db.val())
        console.log(data.length)
        totalquiz.innerText = data.length
    })
        .catch((e) => {
            console.log(e)
        })

}

GetAllUsers()

var users = document.getElementById("users")


async function GetAllUser() {

    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val()) //convert read form 

        if (db.val() == null) {
            return
        }

        var data = Object.values(db.val()) //data convert array
        for (var i = 0; i < data.length; i++) {

            users.innerHTML += `
         <tr>
                            <td>${data[i]["name"]}</td>
                            <td>${data[i].email}</td>
                            <td>
                          web development</td>
                            <td>
                                <span class="status">Active</span>
                            </td>
                        </tr>
        `
        }
    })
        .catch((e) => {
            console.log(e)
        })

}
function logoutAdmin() {

    var confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    firebase.auth().signOut()
        .then(() => {
            console.log("Admin logged out successfully");
            
            // clear any stored session data if you're using localStorage/sessionStorage
            localStorage.clear();
            sessionStorage.clear();

            // redirect to login page
            window.location.href = "./login.html"; // change this to your actual login page name
        })
        .catch((error) => {
            console.log("Logout error:", error);
            alert("Something went wrong while logging out.");
        });

}

GetAllUser()