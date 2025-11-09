export default function handler(req, res) {
  // دریافت توکن از هدر
  const auth = req.headers.authorization;

  // اگر توکن ارسال نشده باشد
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing token" });
  }

  // نمونه دیتای تستی
  const users = [
    { id: 1, name: "Abolghasem Ahmadimaram", email: "admin@mail.com", gender: "male", role: "admin" },
    { id: 2, name: "User One", email: "user1@mail.com", gender: "female", role: "user" },
    { id: 3, name: "User Two", email: "user2@mail.com", gender: "male", role: "user" }
  ];

  res.status(200).json(users);
}
