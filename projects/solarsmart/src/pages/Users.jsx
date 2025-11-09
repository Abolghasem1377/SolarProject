import React, { useEffect, useState, useMemo } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // 📦 دریافت توکن JWT ذخیره‌شده
  const token = useMemo(() => localStorage.getItem("token") || "", []);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setErr("");

        // ✅ بررسی نقش کاربر (فقط ادمین مجاز است)
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user || user.role !== "admin") {
          setErr("Access denied: admin only 🚫");
          setLoading(false);
          return;
        }

        // ✅ آدرس واقعی سرور PostgreSQL روی Render
        const API_URL = "https://solarsmart-backend-new.onrender.com/api/users";

        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.users || [];
        setUsers(list);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("❌ Fetch error:", e);
          setErr(e.message || "Failed to load users");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [token]);

  // ✅ حالت‌های مختلف نمایش
  if (loading)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-center">
        ⏳ Loading users…
      </div>
    );

  if (err)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-red-600 text-center">
        Error: {err}
      </div>
    );

  if (!users.length)
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow text-center">
        No users found.
      </div>
    );

  // ✅ نمایش جدول کاربران
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
        👥 Users List
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-green-50 text-green-800">
              <th className="py-3 pr-4">#</th>
              <th className="py-3 pr-4">Name</th>
              <th className="py-3 pr-4">Email</th>
              <th className="py-3 pr-4">Gender</th>
              <th className="py-3 pr-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id || i}
                className="border-b last:border-0 hover:bg-green-50 transition"
              >
                <td className="py-2 pr-4">{i + 1}</td>
                <td className="py-2 pr-4">{u.name || "-"}</td>
                <td className="py-2 pr-4">{u.email || "-"}</td>
                <td className="py-2 pr-4 capitalize">{u.gender || "-"}</td>
                <td className="py-2 pr-4 uppercase text-gray-600">
                  {u.role || "USER"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
