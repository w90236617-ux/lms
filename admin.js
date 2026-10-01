// async function createAdminFirst(params) {
// //    let adimn= await firebase.database().ref("admin")
// await firebase.auth().createUserWithEmailAndPassword("raheem@gmail.com","raheem321")
// .then(async(snap)=>{
//     await firebase.database().ref("admin").child(snap.user.uid).set({
//         name:"raheem",
//         email:"raheem@gmail.com",
//         role:"admin",
//         password:"raheem321",
//         adminkey:snap.user.uid
//     })
// })
// }
// createAdminFirst()



async function login(){
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value

    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then((snap)=>{
        console.log(snap.user.uid)
        window.location.href="./dashbaord.html"
    })
    .catch((e)=>{
        console.log(e)
    })
}