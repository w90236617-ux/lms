var users = document.getElementById("users")
var loading = document.getElementById("loading")
var maintable = document.getElementById("maintable")

async function GetAllUser() {

    await firebase.database().ref("user").get().then((db) => {
        console.log(db.val()) //convert read form
        maintable.classList.remove("hide")
        loading.style.display = "none"

        if (db.val() == null) {
            users.innerHTML = "<td colspan='6' style='text-align:center'><h1>No user found</h1></td>"
            return
        }

        var data = db.val()               // object with keys
        var keys = Object.keys(data)      // firebase keys array
        var values = Object.values(data)  // user data array

        users.innerHTML = ""; // clear before re-render (avoid duplicate rows)

        for (var i = 0; i < values.length; i++) {

            var userKey = keys[i]; // actual firebase key for this user

            if (values[i]["image"] == undefined || values[i]["image"] == "") {
                users.innerHTML += `
         <tr id="row-${userKey}">
         <td>${i + 1}</td>
                            <td>${values[i]["name"]}</td>
                            <td>${values[i].email}</td>
                            <td>
                          No image</td>
                            <td>
                                <span class="status">Active</span>
                            </td>
                            <td>
                                <button class="delete" onclick="deleteUsers('${userKey}')">   Delete </button>
                            </td>
                        </tr>
        `
            }

            else {
                users.innerHTML += `
         <tr id="row-${userKey}">
         <td>${i + 1}</td>
                            <td>${values[i]["name"]}</td>
                            <td>${values[i].email}</td>
                            <td>
                          <img src='${values[i]["image"]}' /></td>
                            <td>
                                <span class="status">Active</span>
                            </td>
                            <td>
                            
                                <button class="delete"  onclick="deleteUsers('${userKey}')">   Delete </button>
                            </td>
                        </tr>
        `
            }

        }
        // totalStd.innerText=data.length
    })
        .catch((e) => {
            console.log(e)
        })

}


function deleteUsers(userKey) {

    var confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    firebase.database().ref("user/" + userKey).remove()
        .then(() => {
            console.log("User deleted successfully:", userKey);

            // remove the row from the table instantly (no reload needed)
            var row = document.getElementById("row-" + userKey);
            if (row) {
                row.remove();
            }

            // if table becomes empty after deletion
            if (users.children.length === 0) {
                users.innerHTML = "<td colspan='6' style='text-align:center'><h1>No user found</h1></td>"
            }
        })
        .catch((e) => {
            console.log("Error deleting user:", e);
            alert("Something went wrong while deleting the user.");
        });

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