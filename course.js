var courseName = document.getElementById("courseName")
var courseduration = document.getElementById("courseduration")
var coursefee = document.getElementById("coursefee")
var courseTable = document.getElementById("courseTable")
var maintable= document.getElementById("maintable")



async function addNewCourse() {

    var key = await firebase.database().ref("course").push().key
    console.log(key)


    // new Date()

    const modalElement = document.getElementById('staticBackdrop');

    // 2. Get the active Bootstrap instance of that modal
    const modalInstance = bootstrap.Modal.getInstance(modalElement);



    var object = {
        courseName: courseName.value,
        courseduration: courseduration.value,
        coursefee: coursefee.value,
        coursekey: key
    }

    console.log(object)

    await firebase.database().ref("course").child(key).set(object)
    getAllCourse()
    courseName.value = ""
    courseduration.value = ""
    coursefee.value = ""
    // 3. Dismiss it
    if (modalInstance) {
        modalInstance.hide();
    }

}


async function getAllCourse() {
     courseTable.innerHTML=""
    await firebase.database().ref("course").get().then((db) => { 
        console.log(db.val()) //human read
        var data = Object.values(db.val()) //convert array
        console.log(data)
        for(var i=0;i<data.length;i++){
            console.log(data[i])
            courseTable.innerHTML+=`
              <tr>
                            <td>${i+1}</td>
                            <td>${data[i]["courseName"]}</td>
                            <td>${data[i]["coursefee"]}</td>
                            <td>${data[i]["courseduration"]}</td>

                        </tr>
            `
        }
    }
    )
    maintable.classList.remove("hide")
         loading.style.display="none"
         if (db.val()== null) {
             users.innerHTML = "<td colspan='5' style='text-align:center'><h1>No user found</h1></td>"
            return
         }
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

getAllCourse()
