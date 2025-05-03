// firebase.js (حتماً این فایل رو جداگانه اضافه کن)
const firebaseConfig = {
  apiKey: "AIzaSyDtg4qFG7edEizG0xKTr0RLKdxtaCHe45M",
  authDomain: "iranvabistore.firebaseapp.com",
  projectId: "iranvabistore",
  storageBucket: "iranvabistore.appspot.com",
  messagingSenderId: "550281336186",
  appId: "1:550281336186:web:ab8b0503f50a98657a72c3",
  measurementId: "G-NG60PS146Y"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// login-register.js (اضافه کن بعد از firebase.js در index.html)

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const mobile = document.getElementById("loginMobile").value.trim();

  // مدیر خاص با رمز
  const adminMobile = "09127824705";
  const adminPassword = "Mm@09127824705m";
  if (mobile === adminMobile) {
    document.getElementById("adminPasswordGroup").style.display = "block";
    const enteredPass = document.getElementById("adminPassword").value.trim();
    if (enteredPass === adminPassword) {
      sessionStorage.setItem("loggedInUser", JSON.stringify({ mobile, role: "admin" }));
      alert("✅ ورود مدیر موفق بود");
      location.href = "admin-dashboard.html";
    } else {
      alert("❌ رمز عبور اشتباه است");
    }
    return;
  }

  // کاربران عادی (بدون رمز)
  try {
    const userDoc = await db.collection("users").doc(mobile).get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
      alert("✅ ورود موفق");
      location.reload();
    } else {
      // گرفتن نقش از فرم ثبت‌نام (مخفی یا قبل وارد شده)
      const roleInput = document.getElementById("regRole");
      const role = roleInput ? roleInput.value : "retail";

      // ثبت‌نام خودکار کاربر جدید
      const defaultData = {
        fullName: "کاربر جدید",
        shopName: "بدون عنوان",
        address: "نامشخص",
        role: role,
        mobile,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await db.collection("users").doc(mobile).set(defaultData);
      sessionStorage.setItem("loggedInUser", JSON.stringify(defaultData));
      alert("ثبت‌نام خودکار انجام شد و وارد شدید");
      location.reload();
    }
  } catch (error) {
    alert("خطا در ورود: " + error.message);
  }
});
