
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  loginForm.addEventListener("submit", async function (e) {
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

    // کاربران عادی
    try {
      const userDoc = await db.collection("users").doc(mobile).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        sessionStorage.setItem("loggedInUser", JSON.stringify(userData));
        alert("✅ ورود موفق");
        location.reload();
      } else {
        // نقش را از فرم ثبت‌نام بگیر
        const roleInput = document.getElementById("regRole");
        const role = roleInput ? roleInput.value : "retail";
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
});
