import React, { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, MapPin } from "lucide-react";

import defectedImg from "./assets/defected.png";
import defected2Img from "./assets/defected2.png";
import healthyImg from "./assets/healthy.png";
import fullmapImg from "./assets/fullmap.png";
import fullmapHealthyImg from "./assets/fullmapHealthy.png";

const AgriMonitorPitchApp = () => {
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const [currentScreen, setCurrentScreen] = useState("alert");

  const alertData = {
    title: "พบความผิดปกติในสวน",
    date: "5 ตุลาคม 2568",
    time: "10:30 น.",
    location: "สวนยางแปลงที่ 1, โซนตะวันออก",
    area: "1 ไร่ 5 งาน 16 ตารางวา",
    summary: {
      text: "ต้นยางมีสุขภาพไม่ดี เนื่องจากอากาศชื้นสูง (89%) และเย็น (19°C) ติดต่อกัน 7 วัน ทำให้เสี่ยงต่อโรคเชื้อรา พื้นที่ใกล้เคียงก็พบปัญหาคล้ายกัน",
    },
    detection: {
      description: "ใบเปลี่ยนสีเหลือง เริ่มเห็น 2 สัปดาห์แล้ว กระจายเป็นวงกลม",
    },
    indices: [
      {
        name: "NDVI",
        icon: "🌱",
        label: "ความเขียวของใบ (NDVI)",
        value: "0.45",
        status: "ต่ำกว่าปกติ",
        desc: "ใบไม่เขียวสด แสดงว่าต้นไม่แข็งแรง",
        normalRange: "0.65 - 0.85",
      },
      {
        name: "NDRE",
        icon: "🍃",
        label: "ความแข็งแรงของใบ (NDRE)",
        value: "0.32",
        status: "ต่ำ",
        desc: "ใบอ่อนแอ อาจขาดธาตุอาหาร",
        normalRange: "0.55 - 0.75",
      },
      {
        name: "NDMI",
        icon: "💧",
        label: "ความชื้นในต้น (NDMI)",
        value: "0.28",
        status: "แห้ง",
        desc: "ต้นมีน้ำน้อย อาจขาดน้ำหรือเป็นโรค",
        normalRange: "0.50 - 0.70",
      },
      {
        name: "PSRI",
        icon: "🍂",
        label: "ใบแก่/เสื่อม (PSRI)",
        value: "0.18",
        status: "สูง",
        desc: "ใบเริ่มแก่ก่อนเวลา เป็นสัญญาณเครียด",
        normalRange: "< 0.05",
      },
    ],
    nearbyFarms: [
      { direction: "ทิศตะวันออกเฉียงเหนือ", distance: "3", time: "5 วันที่แล้ว" },
      { direction: "ทิศตะวันตก", distance: "4", time: "1 สัปดาห์ที่แล้ว" },
      { direction: "ทิศใต้", distance: "5", time: "3 วันที่แล้ว" },
    ],
  };

  const healthyData = {
    title: "สวนมีสุขภาพดี",
    date: "5 ตุลาคม 2568",
    time: "10:30 น.",
    location: "สวนยางแปลงที่ 2, โซนตะวันตก",
    area: "2 ไร่ 3 งาน 40 ตารางวา",
    summary: {
      text: "ต้นยางแข็งแรงดี อากาศเหมาะสม ชื้นพอดี (72%) อบอุ่น (26°C) มีฝนสม่ำเสมอ ดูแลได้ดี ไม่พบปัญหา",
    },
    detection: {
      description: "ต้นยางสุขภาพดี ใบเขียวสม่ำเสมอ ไม่มีความผิดปกติ",
    },
    indices: [
      {
        name: "NDVI",
        icon: "🌱",
        label: "ความเขียวของใบ (NDVI)",
        value: "0.78",
        status: "ดีมาก",
        desc: "ใบเขียวสด ต้นแข็งแรง",
        normalRange: "0.65 - 0.85",
      },
      {
        name: "NDRE",
        icon: "🍃",
        label: "ความแข็งแรงของใบ (NDRE)",
        value: "0.65",
        status: "ดี",
        desc: "ใบแข็งแรง มีธาตุอาหารเพียงพอ",
        normalRange: "0.55 - 0.75",
      },
      {
        name: "NDMI",
        icon: "💧",
        label: "ความชื้นในต้น (NDMI)",
        value: "0.58",
        status: "พอดี",
        desc: "ต้นมีน้ำเพียงพอ ไม่แห้งหรือท่วม",
        normalRange: "0.50 - 0.70",
      },
      {
        name: "PSRI",
        icon: "🍂",
        label: "ใบแก่/เสื่อม (PSRI)",
        value: "0.02",
        status: "ต่ำ",
        desc: "ใบยังอ่อน ไม่เสื่อมก่อนวัย",
        normalRange: "< 0.05",
      },
    ],
    nearbyFarms: [],
  };

  const currentData = currentScreen === "alert" ? alertData : healthyData;
  const isAlert = currentScreen === "alert";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      {/* Toggle Buttons */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-white rounded-xl shadow-lg p-2">
        {["alert", "healthy"].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentScreen === screen
                ? screen === "alert"
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-emerald-500 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {screen === "alert" ? "🚨 มีปัญหา" : "✅ สุขภาพดี"}
          </button>
        ))}
      </div>

      {/* Phone Container */}
      <div
        className="w-full max-w-md bg-black rounded-[3rem] shadow-2xl p-3"
        style={{ height: "844px" }}
      >
        <div className="bg-white rounded-[2.5rem] h-full overflow-hidden relative flex flex-col">
          {/* Header */}
          <div
            className={`flex-shrink-0 ${
              isAlert
                ? "bg-gradient-to-r from-red-500 to-orange-500"
                : "bg-gradient-to-r from-emerald-500 to-lime-500"
            } text-white p-3`}
          >
            <div className="flex items-center gap-3">
              {isAlert ? (
                <AlertTriangle className="w-7 h-7" />
              ) : (
                <CheckCircle className="w-7 h-7" />
              )}
              <div>
                <h1 className="text-xl font-bold">{currentData.title}</h1>
                <p className="text-xs text-white/90">
                  {currentData.date} • {currentData.time}
                </p>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="relative aspect-video bg-black">
            <img src={isAlert ? fullmapImg : fullmapHealthyImg} alt="Field" className="w-full h-[238.5px] object-cover" />
            <div className="absolute top-2 left-2 flex flex-col items-center h-[75%]">
              <span className="text-[10px] font-bold text-white mb-1">สูง</span>
              <div className="flex-1 w-4 rounded-full" style={{background:"linear-gradient(to bottom, #ef4444, #fb923c, #fde047, #86efac, #16a34a)"}}/>
              <span className="text-[10px] font-bold text-white mt-1">ต่ำ</span>
            </div>
            <div className={`absolute top-2 right-2 ${isAlert ? "bg-red-500" : "bg-emerald-500"} rounded-lg px-2 py-1 text-white text-xs font-bold`}>
              {currentData.area}
            </div>
          </div>
          {/* Carousel - FIXED */}
          <div className="flex-shrink-0 py-2 flex justify-center bg-gray-50">
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-xs">◀</button>
              <div className="flex gap-2">
                {(isAlert
                  ? [{ date: '01/07', img: defected2Img }, { date: '06/07', img: defected2Img }, { date: '11/07', img: defectedImg }]
                  : [{ date: '01/07', img: healthyImg }, { date: '06/07', img: healthyImg }, { date: '11/07', img: healthyImg }]
                ).map((slide, i) => (
                  <div key={i} className={`flex flex-col items-center p-1 rounded-lg shadow-sm ${i === 2 ? 'bg-white border-2 border-green-400' : 'bg-white/80'}`}>
                    <img src={slide.img} alt={slide.date} className="w-12 h-9 object-cover rounded" />
                    <span className={`text-[10px] mt-0.5 ${i === 2 ? 'text-green-700 font-semibold' : 'text-gray-600'}`}>{slide.date}</span>
                  </div>
                ))}
              </div>
              <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-xs">▶</button>
            </div>
          </div>
          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
             {/* Summary */}
            <div className={`${isAlert ? "bg-orange-50 border-orange-200" : "bg-emerald-50 border-emerald-200"} rounded-xl p-3 border-2`}>
              <h3 className="font-bold text-sm mb-2 flex items-center gap-1">📋 สรุปสถานการณ์</h3>
              <p className="text-xs text-gray-700">{currentData.summary.text}</p>
            </div>
            <Section title="สิ่งที่เราตรวจพบ" icon="🔍">
              {currentData.detection.description}
            </Section>

            {/* Indices */}
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                <span className="text-lg">🛰️</span> ข้อมูลจากดาวเทียม
              </h3>
              <div className="space-y-2">
                {currentData.indices.map((idx, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 p-2 rounded-lg ${
                      isAlert ? "bg-red-50" : "bg-green-50"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{idx.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-xs text-gray-800">
                          {idx.label}
                        </span>
                        <span
                          className={`text-xs md:text-sm font-semibold px-2 py-1 rounded-lg ${
                            isAlert
                              ? "bg-red-200 text-red-600"
                              : "bg-green-200 text-green-600"
                          }`}
                        >
                          {idx.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-tight">
                        {idx.desc}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] text-gray-500">
                          ค่าปกติ: {idx.normalRange}
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {idx.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {isAlert ? <AlertSuggestions /> : <HealthySuggestions />}

            {/* Note */}
            <div className={`${isAlert ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} rounded-xl p-3 border`}>
              <div className="flex gap-2">
                <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isAlert ? 'text-yellow-600' : 'text-blue-600'}`} />
                <div>
                  <h4 className={`font-semibold text-xs mb-1 ${isAlert ? 'text-yellow-900' : 'text-blue-900'}`}>📌 หมายเหตุ</h4>
                  <p className={`text-[11px] leading-relaxed ${isAlert ? 'text-yellow-700' : 'text-blue-700'}`}>
                    {isAlert
                      ? 'นี่เป็นข้อมูลเบื้องต้น ยังต้องตรวจสอบจริงเพื่อยืนยัน'
                      : 'ระบบติดตามทุก 5 วัน หากพบปัญหาจะแจ้งเตือนทันที'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
    <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
      <span className="text-lg">{icon}</span> {title}
    </h3>
    <div className="text-xs text-gray-700 leading-relaxed">{children}</div>
  </div>
);

// ---------------- FULL RECOMMENDATIONS ----------------
const recommendations = {
  step1: {
    title: "ตรวจสอบพื้นที่ด้วยตัวเอง",
    subtitle: "เดินสำรวจพื้นที่ที่ตรวจพบความผิดปกติ",
    cases: [
      {
        id: "disease",
        icon: "🦠",
        title: "โรคพืช",
        indicators: ["ใบเหลือง", "มีจุดดำ", "ใบร่วง"],
        details: [
          "สังเกตใบที่มีอาการเหลือง มีจุดสีน้ำตาล หรือสีดำ",
          "ตรวจดูลำต้นและกิ่งมีคราบเหนียว หรือแผลเปื่อยหรือไม่",
          "เช็คการกระจายตัวของอาการ - กระจุกตัวหรือกระจายทั่วไป",
          "ถ่ายรูปใบที่มีอาการชัดเจนเพื่อให้ AI วิเคราะห์",
        ],
        action: "ถ่ายรูปใบเพื่อตรวจโรค",
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        indicators: ["ใบเหลืองทั้งใบ", "เส้นใบยังเขียว"],
        details: [
          "ใบเหลืองสม่ำเสมอทั่วใบ - อาจขาดไนโตรเจน",
          "ใบเหลืองแต่เส้นใบเขียว - อาจขาดเหล็ก หรือแมงกานีส",
          "ขอบใบเหลือง/แห้ง - อาจขาดโพแทสเซียม",
          "เก็บตัวอย่างดินและใบส่งตรวจวิเคราะห์",
        ],
      },
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        indicators: ["ใบเหี่ยว", "ดินแห้ง/แฉะ"],
        details: [
          "ตรวจดินลึก 10-15 ซม. หากแห้งแสดงว่าขาดน้ำ",
          "หากดินแฉะมาก อาจน้ำท่วมขัง รากเน่า",
          "ดูระบบน้ำหยด สปริงเกอร์ ทำงานปกติหรือไม่",
          "สังเกตพื้นที่ลุ่ม ที่น้ำอาจขังหรือไม่ระบาย",
        ],
      },
    ],
  },
  step2: {
    title: "ดำเนินการแก้ไขเบื้องต้น",
    subtitle: "ทำการแก้ไขทันทีตามสาเหตุที่พบ",
    cases: [
      {
        id: "disease",
        icon: "🦠",
        title: "โรคพืช",
        actions: [
          "ตัดใบที่มีอาการเป็นโรคออก เผาทิ้งห่างจากสวน",
          "ฉีดพ่นสารป้องกันโรค: แมนโคเซบ 2-3 กรัม/ลิตร",
          "เริ่มพ่นจากจุดกลางของพื้นที่ที่เป็นโรค แล้วค่อยขยายออก",
          "พ่นในช่วงเช้า หรือเย็น ไม่พ่นตอนแดดจัด",
        ],
        precaution: "⚠️ สวมอุปกรณ์ป้องกัน หลีกเลี่ยงสูดสารเคมี",
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "ใส่ปุ๋ยตามผลการตรวจดิน หรือใช้ปุ๋ยสูตร 15-15-15",
          "หว่านปุ๋ยรอบทรงพุ่ม ห่างจากโคนต้น 30-50 ซม.",
          "รดน้ำหลังใส่ปุ๋ย ให้ปุ๋ยละลาย",
          "ฉีดพ่นปุ๋ยทางใบสูตรที่ขาด (กรณีเร่งด่วน)",
        ],
        precaution: "💡 อย่าใส่ปุ๋ยมากเกินไป อาจทำให้ไหม้ราก",
      },
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        actions: [
          "กรณีขาดน้ำ: รดน้ำทันที แต่อย่าให้มากจนท่วม",
          "รดน้ำช้าๆ ให้ซึมลึก ดีกว่ารดเยอะแต่ตื้น",
          "กรณีน้ำขัง: ขุดร่องระบายน้ำออกจากพื้นที่",
          "ซ่อมแซมระบบน้ำหยด สปริงเกอร์ที่ชำรุด",
        ],
        precaution: "⏰ รดน้ำตอนเช้า-เย็น ไม่รดตอนเที่ยงแดดจัด",
      },
    ],
  },
  step3: {
    title: "ป้องกันการแพร่กระจาย",
    subtitle: "ดำเนินการป้องกันไม่ให้ปัญหาลุกลาม",
    cases: [
      {
        id: "disease",
        icon: "🦠",
        title: "โรคพืช",
        actions: [
          "กักกันพื้นที่ที่เป็นโรค ห้ามเอาเศษใบไปที่อื่น",
          "ทำความสะอาดเครื่องมือทุกครั้งหลังใช้ในพื้นที่เป็นโรค",
          "ฉีดพ่นสารป้องกันโรคในรัศมี 5-10 เมตร รอบพื้นที่",
          "เพิ่มการระบายอากาศ ตัดแต่งกิ่งหนาแน่นออก",
        ],
        note: "แจ้งเตือนเกษตรกรใกล้เคียง ประมาณ 2-3 แปลง",
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "ตรวจสอบพื้นที่อื่นในแปลง ว่ามีอาการคล้ายกันหรือไม่",
          "ปรับปรุงดินทั้งแปลง เติมปุ๋ยอินทรีย์",
          "ใส่ปุ๋ยเสริมทั้งแปลง ตามผลการตรวจดิน",
          "วางแผนการใส่ปุ๋ยสม่ำเสมอ 3-4 เดือนต่อครั้ง",
        ],
        note: "บันทึกผลการตรวจดิน เปรียบเทียบปีต่อปี",
      },
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        actions: [
          "ติดตั้งระบบน้ำหยดให้ครบทุกต้น ถ้ายังไม่มี",
          "ตรวจสอบระบบน้ำทั้งหมด ซ่อมส่วนที่รั่ว อุดตัน",
          "คลุมดินด้วยฟาง แกลบ ช่วยรักษาความชื้น",
          "ขุดร่องระบายน้ำในพื้นที่ลุ่ม",
        ],
        note: "จัดตารางการรดน้ำให้ชัดเจน มี backup ถ้าระบบขัดข้อง",
      },
    ],
  },
  step4: {
    title: "ติดตามผลและบันทึก",
    subtitle: "เฝ้าระวังและบันทึกเพื่อการเรียนรู้",
    cases: [
      {
        id: "disease",
        icon: "🦠",
        title: "โรคพืช",
        actions: [
          "ถ่ายรูปพื้นที่ที่เป็นโรค ทุก 2-3 วัน",
          "บันทึกการใช้สารเคมี วันที่ อัตราการพ่น",
          "ติดตามว่าอาการดีขึ้นภายใน 7-10 วัน หรือไม่",
          "ถ้าไม่ดีขึ้น หรือแย่ลง ปรึกษาผู้เชี่ยวชาญทันที",
        ],
        report: "📝 กรอกฟอร์มรายงานผลการรักษา",
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "สังเกตการเปลี่ยนแปลงของสีใบ หลังใส่ปุ๋ย 2-3 สัปดาห์",
          "บันทึกวันที่ใส่ปุ๋ย ชนิด ปริมาณ",
          "ถ่ายรูปใบ ก่อน-หลังใส่ปุ๋ย เปรียบเทียบ",
          "ตรวจดินซ้ำทุก 6-12 เดือน ปรับสูตรปุ๋ย",
        ],
        report: "📊 บันทึกผลการตรวจดินและใส่ปุ๋ย",
      },
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        actions: [
          "สังเกตความชื้นดิน ทุก 2-3 วัน",
          "บันทึกปริมาณน้ำที่ใช้ต่อวัน",
          "ตรวจสอบระบบน้ำทุกสัปดาห์",
          "ถ่ายรูปอาการใบเหี่ยว ติดตามการฟื้นตัว",
        ],
        report: "💧 บันทึกปริมาณน้ำและความชื้นดิน",
      },
    ],
  },
};

// Suggestions for Alert (with AI summary + images)
const AlertSuggestions = () => {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedCases, setExpandedCases] = useState({});

  const toggleStep = (key) => setExpandedSteps((p) => ({ ...p, [key]: !p[key] }));
  const toggleCase = (key) => setExpandedCases((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-3 border-2 border-red-200">
      <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
        <span className="text-lg">💡</span> คำแนะนำในการแก้ไข
      </h3>

      <div className="text-[11px] text-gray-600 mb-3">
        AI วิเคราะห์ว่าความผิดปกติอาจมาจาก โรคพืช, ขาดธาตุอาหาร, หรือ ปัญหาน้ำ  
        <div className="mt-1 mb-1"><b>โดยคาดว่าเกิดจาก:</b></div>
        <ul className="pl-4 list-disc text-[11px] space-y-1">
          <li>
            <b>โรคพืช</b> เพราะค่า <b>NDVI</b> ต่ำ (0.45) และ <b>PSRI</b> สูง (0.18) 
            สอดคล้องกับอาการใบเหลืองและแก่ก่อนวัย
          </li>
          <li>
            <b>ขาดธาตุอาหาร</b> เพราะค่า <b>NDRE</b> ต่ำ (0.32) 
            แสดงถึงความแข็งแรงของใบลดลง อาจขาดไนโตรเจนหรือแมงกานีส
          </li>
          <li>
            <b>ปัญหาน้ำ</b> เพราะค่า <b>NDMI</b> ต่ำ (0.28) 
            บ่งบอกว่าความชื้นไม่เพียงพอ อาจเกิดจากดินแห้งหรือรากเสียหาย
          </li>
        </ul>      
      </div>

      {Object.entries(recommendations).map(([stepKey, step], i) => (
        <div key={stepKey} className="bg-white rounded-lg border mb-2">
          <button onClick={() => toggleStep(stepKey)} className="w-full flex justify-between items-center p-2">
            <span className="font-bold text-xs">{i + 1}. {step.title}</span>
            <span className="text-xs text-gray-500">{expandedSteps[stepKey] ? "▼" : "▶"}</span>
          </button>
          {expandedSteps[stepKey] && (
            <div className="p-2 text-[11px] text-gray-700 space-y-2">
              <p>{step.subtitle}</p>
              {step.cases.map((case_) => {
                const caseKey = `${stepKey}-${case_.id}`;
                return (
                  <div key={case_.id} className="border rounded p-2">
                    <button onClick={() => toggleCase(caseKey)} className="w-full flex justify-between items-center">
                      <span className="flex items-center gap-1">{case_.icon}{case_.title}</span>
                      <span className="text-xs text-gray-500">{expandedCases[caseKey] ? "▼" : "▶"}</span>
                    </button>
                    {expandedCases[caseKey] && (
                      <div className="mt-1 space-y-1">
                        {case_.indicators && <p>🔍 อาการ: {case_.indicators.join(", ")}</p>}
                        {case_.details && case_.details.map((d,i)=><p key={i}>• {d}</p>)}
                        {case_.actions && case_.actions.map((a,i)=><p key={i}>• {a}</p>)}
                        {case_.action && <button className="w-full bg-emerald-500 text-white py-1 rounded">📸 {case_.action}</button>}
                        {case_.precaution && <p className="text-orange-700 bg-orange-50 p-1 rounded">{case_.precaution}</p>}
                        {case_.note && <p className="text-blue-700 bg-blue-50 p-1 rounded">{case_.note}</p>}
                        {case_.report && <p className="text-purple-700 bg-purple-50 p-1 rounded">{case_.report}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button className="mt-3 w-full bg-white border-2 border-emerald-500 text-emerald-700 py-2 rounded text-[11px] font-semibold">
        📞 ปรึกษาผู้เชี่ยวชาญ
      </button>
    </div>
  );
};

// Suggestions for Healthy
const HealthySuggestions = () => (
  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border-2 border-blue-200">
    <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
      <span className="text-lg">💡</span> แนวทางการดูแลเพิ่มเติม
    </h3>
    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
      <li>ดูแลความชื้นในดินให้เหมาะสม</li>
      <li>ให้ปุ๋ยอย่างสม่ำเสมอทุก 2 เดือน</li>
      <li>ตรวจสอบโรคและแมลงศัตรูพืชเป็นประจำ</li>
      <li>เก็บกวาดใบที่ร่วงหล่นเพื่อป้องกันโรค</li>
    </ul>
  </div>
);

export default AgriMonitorPitchApp;
