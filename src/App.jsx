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
    nearbyFarms: [
      { direction: "ทิศตะวันออกเฉียงเหนือ", distance: "3", time: "5 วันที่แล้ว" },
      { direction: "ทิศตะวันตก", distance: "4", time: "1 สัปดาห์ที่แล้ว" },
      { direction: "ทิศใต้", distance: "5", time: "3 วันที่แล้ว" },
    ],
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
  };

  const currentData = currentScreen === "alert" ? alertData : healthyData;
  const isAlert = currentScreen === "alert";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-start pt-4 pb-6 px-4">
      {/* Toggle Buttons */}
      <div className="w-full max-w-sm flex gap-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-1.5 mb-4">
        {["alert", "healthy"].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-xs transition-all duration-300 ${
              currentScreen === screen
                ? screen === "alert"
                  ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {screen === "alert" ? "🚨 มีปัญหา" : "✅ สุขภาพดี"}
          </button>
        ))}
      </div>

      {/* Phone Container */}
      <div
        className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] shadow-2xl p-3"
        style={{ 
          maxWidth: "420px",
          height: "min(85vh, 800px)"
        }}
      >
        <div className="bg-white rounded-[2rem] h-full overflow-hidden relative flex flex-col shadow-inner">
          {/* Header - Fixed */}
          <div
            className={`flex-shrink-0 ${
              isAlert
                ? "bg-gradient-to-r from-red-500 via-red-500 to-orange-500"
                : "bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500"
            } text-white p-3 shadow-lg`}
          >
            <div className="flex items-center gap-2.5">
              {isAlert ? (
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
              ) : (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
              <div>
                <h1 className="text-sm sm:text-base font-bold">{currentData.title}</h1>
                <p className="text-[9px] sm:text-[10px] text-white/90">
                  {currentData.date} • {currentData.time}
                </p>
              </div>
            </div>
          </div>

          {/* Map - Fixed */}
          <div className="relative bg-black flex-shrink-0">
            <img 
              src={isAlert ? fullmapImg : fullmapHealthyImg} 
              alt="Field Map" 
              className="w-full h-40 sm:h-48 object-cover" 
            />
            <div className="absolute top-2 left-2 flex flex-col items-center h-[65%]">
              <span className="text-[8px] sm:text-[9px] font-bold text-white mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">สูง</span>
              <div 
                className="flex-1 w-3 rounded-full shadow-xl border border-white/20" 
                style={{background:"linear-gradient(to bottom, #ef4444, #fb923c, #fde047, #86efac, #16a34a)"}}
              />
              <span className="text-[8px] sm:text-[9px] font-bold text-white mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">ต่ำ</span>
            </div>
            <div className={`absolute top-2 right-2 ${isAlert ? "bg-red-500" : "bg-emerald-500"} rounded-lg px-2 py-1 text-white text-[9px] sm:text-[10px] font-bold shadow-lg`}>
              {currentData.area}
            </div>
          </div>

          {/* Carousel - Fixed */}
          <div className="flex-shrink-0 py-2 sm:py-2.5 flex justify-center bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-xs font-bold text-gray-600 hover:text-gray-900 transition-all hover:scale-105">
                ◀
              </button>
              <div className="flex gap-1.5">
                {(isAlert
                  ? [{ date: '01/07', img: defected2Img }, { date: '06/07', img: defected2Img }, { date: '11/07', img: defectedImg }]
                  : [{ date: '01/07', img: healthyImg }, { date: '06/07', img: healthyImg }, { date: '11/07', img: healthyImg }]
                ).map((slide, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col items-center p-1 rounded-lg shadow-md transition-all ${
                      i === 2 
                        ? 'bg-white border-2 border-green-500 scale-105 shadow-lg' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                  >
                    <img 
                      src={slide.img} 
                      alt={slide.date} 
                      className="w-10 h-7 sm:w-11 sm:h-8 object-cover rounded" 
                    />
                    <span className={`text-[8px] sm:text-[9px] mt-0.5 ${i === 2 ? 'text-green-700 font-bold' : 'text-gray-600'}`}>
                      {slide.date}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-md hover:shadow-lg flex items-center justify-center text-xs font-bold text-gray-600 hover:text-gray-900 transition-all hover:scale-105">
                ▶
              </button>
            </div>
          </div>

          {/* Scrollable content - Only this part scrolls */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-white to-gray-50" style={{ minHeight: 0 }}>
            {/* Summary */}
            <div className={`${
              isAlert 
                ? "bg-gradient-to-br from-orange-50 to-red-50 border-orange-300" 
                : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-300"
            } rounded-xl p-3 border-2 shadow-sm`}>
              <h3 className="font-bold text-xs mb-2 flex items-center gap-2">
                📋 สรุปสถานการณ์
              </h3>
              <p className="text-[10px] sm:text-[11px] text-gray-700 leading-relaxed">
                {currentData.summary.text}
              </p>
            </div>

            <Section title="สิ่งที่เราตรวจพบ" icon="🔍">
              {currentData.detection.description}
            </Section>

            {/* Indices */}
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
              <h3 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-base">🛰️</span> ข้อมูลจากดาวเทียม
              </h3>
              <div className="space-y-2.5">
                {currentData.indices.map((idx, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 p-2.5 rounded-xl border-2 transition-all ${
                      isAlert 
                        ? "bg-red-50 border-red-200 hover:border-red-300" 
                        : "bg-green-50 border-green-200 hover:border-green-300"
                    }`}
                  >
                    <span className="text-xl flex-shrink-0">{idx.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-[10px] sm:text-[11px] text-gray-800">
                          {idx.label}
                        </span>
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                            isAlert
                              ? "bg-red-200 text-red-700"
                              : "bg-green-200 text-green-700"
                          }`}
                        >
                          {idx.status}
                        </span>
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed mb-1.5">
                        {idx.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] sm:text-[9px] text-gray-500">
                          ค่าปกติ: {idx.normalRange}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {idx.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Farms */}
            {isAlert && currentData.nearbyFarms && currentData.nearbyFarms.length > 0 && (
              <Section title="สวนใกล้เคียง" icon="📊">
                <p className="text-[10px] text-gray-600 mb-2">
                  พบสวนที่มีอาการคล้ายกัน {currentData.nearbyFarms.length} แปลง:
                </p>
                {currentData.nearbyFarms.map((farm, i) => (
                  <div
                    key={i}
                    className="bg-orange-50 rounded-lg p-2 border border-orange-200 mb-1.5 flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-[10px] text-gray-800">
                        {farm.direction} {farm.distance} กม.
                      </div>
                      <div className="text-[9px] text-gray-600">
                        รายงานเมื่อ {farm.time}
                      </div>
                    </div>
                    <MapPin className="w-3 h-3 text-orange-600" />
                  </div>
                ))}
              </Section>
            )}
            
            {/* Suggestions */}
            {isAlert ? <AlertSuggestions currentData={currentData} /> : <HealthySuggestions />}

            {/* Note */}
            <div className={`${
              isAlert 
                ? 'bg-yellow-50 border-yellow-300' 
                : 'bg-blue-50 border-blue-300'
            } rounded-xl p-3 border-2 shadow-sm`}>
              <div className="flex gap-2">
                <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isAlert ? 'text-yellow-600' : 'text-blue-600'
                }`} />
                <div>
                  <h4 className={`font-bold text-[10px] sm:text-[11px] mb-1 ${
                    isAlert ? 'text-yellow-900' : 'text-blue-900'
                  }`}>
                    📌 หมายเหตุ
                  </h4>
                  <p className={`text-[9px] sm:text-[10px] leading-relaxed ${
                    isAlert ? 'text-yellow-700' : 'text-blue-700'
                  }`}>
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

// Section Component
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
    <h3 className="font-bold text-xs text-gray-800 mb-2 flex items-center gap-2">
      <span className="text-base">{icon}</span> {title}
    </h3>
    <div className="text-[10px] sm:text-[11px] text-gray-700 leading-relaxed">{children}</div>
  </div>
);

// Recommendations Data
const recommendations = {
  step1: {
    title: "ตรวจสอบพื้นที่ด้วยตัวเอง",
    subtitle: "เดินสำรวจพื้นที่ที่ตรวจพบความผิดปกติ",
    cases: [
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
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "จากข้อมูลดาวเทียมในหลายพื้นที่ พบว่าค่าความชื้นในพืช (NDMI) ต่ำต่อเนื่องหลายวัน มักสัมพันธ์กับช่วงอากาศร้อนหรือฝนน้อย ทำให้ต้นไม้ขาดน้ำและหยุดโตชั่วคราว",
          advice:
            "ลองตรวจดินลึก 10–15 ซม. หากแห้งมากควรรดน้ำเพิ่ม โดยเฉพาะในช่วงที่อุณหภูมิสูงกว่า 30°C ติดต่อกัน",
          note:
            "ข้อมูลนี้อ้างอิงจากสถิติในอดีต เพื่อช่วยให้เข้าใจแนวโน้ม ไม่ได้ยืนยันปัญหาจริงในสวนของท่าน",
        },
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
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "ในพื้นที่ที่มีค่าความเขียวของใบ (NDRE) ต่ำต่อเนื่อง มักพบว่าต้นเจริญเติบโตช้า ใบเหลืองเร็ว หรือออกใบใหม่ช้า โดยเฉพาะในช่วงฝนทิ้งช่วง",
          advice:
            "อาจพิจารณาเสริมปุ๋ยสูตรกลาง เช่น 15-15-15 หรือใส่ปุ๋ยคอกเพิ่มความอุดมของดิน เพื่อให้ต้นแข็งแรงขึ้น",
          note:
            "ข้อมูลนี้อ้างอิงจากแนวโน้มในพื้นที่เกษตรใกล้เคียง ไม่ได้ยืนยันปัญหาจริงของแปลงนี้",
        },
      },
      {
        id: "leafage",
        icon: "🍂",
        title: "ใบแก่ก่อนวัย / เครียดจากสภาพแวดล้อม",
        indicators: ["ใบเหลือง", "หลุดร่วงง่าย"],
        details: [
          "ตรวจดูความชื้นในดิน และอุณหภูมิในพื้นที่",
          "หากฝนตกหลายวันติดต่อกัน ให้ตรวจระบบระบายน้ำ",
          "ตัดแต่งกิ่งให้โปร่ง เพื่อให้ลมและแสงผ่านได้ดี",
        ],
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "เมื่อค่าความแก่ของใบ (PSRI) สูงกว่าปกติ มักพบว่าเกิดจากสภาพอากาศเย็นและชื้นมาก ใบแก่เร็วและหลุดร่วงง่าย โดยเฉพาะในพื้นที่ที่มีฝนต่อเนื่อง",
          advice:
            "หากมีฝนตกต่อเนื่องหลายวัน ควรปรับการระบายน้ำในสวน และตัดแต่งกิ่งที่หนาแน่น เพื่อช่วยให้ลมและแสงเข้าได้ดีขึ้น",
          note:
            "ข้อมูลนี้เป็นเพียงแนวทางจากสถิติ ไม่ได้ระบุว่าพืชมีโรคหรือศัตรูพืช",
        },
      },
    ],
  },
  step2: {
    title: "ดำเนินการแก้ไขเบื้องต้น",
    subtitle: "ทำการแก้ไขทันทีตามสาเหตุที่พบ",
    cases: [
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
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "หลายกรณีพบว่าพื้นที่ที่มีค่า NDMI ต่ำกว่า 0.4 ติดต่อกัน 7 วัน พืชมักเริ่มแสดงอาการเหี่ยวและโตช้าลง โดยเฉพาะในฤดูแล้ง",
          advice:
            "ในช่วงอากาศร้อน ควรรดน้ำแบบแผ่วเบาแต่สม่ำเสมอ เพื่อให้ดินชุ่มลึกและรากได้รับน้ำเต็มที่",
          note:
            "แนวทางนี้อ้างอิงจากสถิติในอดีต เพื่อช่วยป้องกันไม่ให้พืชเครียดจากความแห้ง",
        },
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "ใส่ปุ๋ยสูตรกลาง 15-15-15 รอบโคนต้น ห่างจากโคนประมาณ 30–50 ซม.",
          "รดน้ำหลังใส่ปุ๋ยเพื่อช่วยให้ปุ๋ยละลายซึมลงดิน",
          "ฉีดพ่นปุ๋ยทางใบในช่วงเช้าเพื่อเร่งฟื้นฟู",
        ],
        precaution: "💡 อย่าใส่ปุ๋ยมากเกินไป อาจทำให้รากไหม้",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "จากข้อมูลหลายปีในพื้นที่ภาคใต้ พบว่าพืชที่มีค่า NDRE ต่ำกว่า 0.35 ต่อเนื่อง 2 รอบ มีแนวโน้มให้ผลผลิตน้อยลงจากภาวะธาตุอาหารไม่สมดุล",
          advice:
            "ควรตรวจดินปีละ 1–2 ครั้ง และปรับสูตรปุ๋ยตามความเหมาะสมของพืชในแต่ละช่วงอายุ",
          note:
            "ข้อมูลนี้ใช้เพื่อแนะแนวทาง ไม่ได้ระบุปัญหาเฉพาะในสวนของท่าน",
        },
      },
      {
        id: "leafage",
        icon: "🍂",
        title: "ใบแก่ก่อนวัย / เครียดจากสภาพแวดล้อม",
        actions: [
          "เพิ่มการระบายอากาศในแปลง โดยตัดกิ่งที่หนาแน่นออก",
          "ตรวจระบบน้ำและดิน หากน้ำขังควรปรับระบายน้ำทันที",
          "หลีกเลี่ยงการให้น้ำตอนแดดจัด เพราะจะทำให้ใบช้ำ",
        ],
        precaution: "🌤️ ควรดูพยากรณ์อากาศก่อนปรับการให้น้ำหรือใส่ปุ๋ย",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "ข้อมูลจากหลายพื้นที่แสดงให้เห็นว่าค่า PSRI สูงมักเกิดในช่วงฝนตกชุกและอุณหภูมิต่ำกว่า 22°C ใบพืชมักแก่เร็วและร่วงง่าย",
          advice:
            "หากเจอสภาพอากาศแบบนี้บ่อย ควรดูแลระบบระบายน้ำและตัดแต่งกิ่งสม่ำเสมอ",
          note:
            "ข้อมูลนี้เพื่อการเฝ้าระวัง ไม่ได้ยืนยันว่าพืชมีปัญหาจริง",
        },
      },
    ],
  },
  step3: {
    title: "ป้องกันการแพร่กระจาย",
    subtitle: "ดำเนินการป้องกันไม่ให้ปัญหาลุกลาม",
    cases: [
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        actions: [
          "ติดตั้งระบบน้ำหยดให้ครบทุกต้น ถ้ายังไม่มี",
          "ตรวจสอบระบบน้ำทั้งหมด ซ่อมส่วนที่รั่วหรืออุดตัน",
          "คลุมดินด้วยฟางหรือแกลบ ช่วยรักษาความชื้น",
          "ขุดร่องระบายน้ำในพื้นที่ลุ่ม",
        ],
        note: "จัดตารางการรดน้ำให้ชัดเจน โดยเฉพาะในฤดูแล้ง",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "พื้นที่ที่มีระบบน้ำหยดและคลุมดินมักรักษาความชื้นได้ดีกว่า 20–30% เมื่อเทียบกับพื้นที่เปิดโล่ง",
          advice:
            "ควรคลุมดินทุกต้นหลังให้น้ำ เพื่อช่วยลดการระเหยและรักษาน้ำในดินให้นานขึ้น",
          note:
            "ข้อมูลนี้เป็นแนวทางทั่วไปจากการสังเกตพื้นที่หลายแห่งในภาคใต้",
        },
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "ปรับปรุงดินทั้งแปลงด้วยปุ๋ยอินทรีย์ทุก 3–4 เดือน",
          "เติมปุ๋ยเสริมธาตุรอง เช่น เหล็ก แมงกานีส สังกะสี",
          "ใช้ปุ๋ยสูตรตามผลตรวจดินเพื่อรักษาสมดุล",
        ],
        note: "เก็บตัวอย่างดินส่งตรวจทุกปี เพื่อปรับสูตรปุ๋ยให้เหมาะสม",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "พบว่าการใส่ปุ๋ยอินทรีย์ร่วมกับปุ๋ยเคมีในปริมาณเหมาะสม ช่วยให้ค่า NDRE ของพืชสูงขึ้นภายใน 1 เดือน",
          advice:
            "ใส่ปุ๋ยอินทรีย์ทุกครั้งหลังการเก็บเกี่ยว เพื่อให้ดินฟื้นตัวเร็วและเพิ่มความสมบูรณ์ในรอบถัดไป",
          note:
            "ข้อมูลนี้อ้างอิงจากผลทดลองในพื้นที่เกษตรภาคกลางและภาคใต้",
        },
      },
    ],
  },
  step4: {
    title: "ติดตามผลและบันทึก",
    subtitle: "เฝ้าระวังและบันทึกเพื่อการเรียนรู้",
    cases: [
      {
        id: "water",
        icon: "💧",
        title: "ปัญหาน้ำ",
        actions: [
          "ตรวจวัดความชื้นดินทุก 2–3 วัน",
          "บันทึกปริมาณน้ำที่ใช้ต่อวัน",
          "ถ่ายภาพพื้นที่ที่มีปัญหาซ้ำเพื่อติดตามการฟื้นตัว",
        ],
        report: "💧 บันทึกข้อมูลความชื้นในดินและน้ำที่ใช้แต่ละรอบ",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "พบว่าการติดตามความชื้นดินอย่างสม่ำเสมอช่วยลดโอกาสเกิดภาวะขาดน้ำได้ถึง 40%",
          advice:
            "ควรใช้แอปหรือสมุดบันทึกช่วยจดข้อมูล เพื่อดูแนวโน้มและวางแผนให้น้ำได้แม่นยำขึ้น",
          note:
            "เป็นแนวทางการจัดการน้ำที่ช่วยให้สวนยั่งยืนในระยะยาว",
        },
      },
      {
        id: "nutrient",
        icon: "🌿",
        title: "ขาดธาตุอาหาร",
        actions: [
          "ถ่ายรูปใบทุก 2 สัปดาห์เพื่อเปรียบเทียบความเขียว",
          "บันทึกวันที่และชนิดปุ๋ยที่ใช้",
          "ตรวจดินซ้ำทุก 6–12 เดือน",
        ],
        report: "📊 บันทึกผลการตรวจดินและใบ เพื่อดูการเปลี่ยนแปลงระยะยาว",
        context: {
          icon: "📊",
          title: "จากข้อมูลในอดีต",
          summary:
            "สวนที่บันทึกข้อมูลการใส่ปุ๋ยและตรวจดินต่อเนื่อง มักรักษาความสม่ำเสมอของสีใบและผลผลิตได้ดีกว่า",
          advice:
            "หากใช้ปุ๋ยสูตรใดแล้วเห็นการเปลี่ยนแปลงชัดเจน ให้บันทึกไว้เพื่อใช้ในรอบต่อไป",
          note:
            "การติดตามอย่างต่อเนื่องช่วยลดต้นทุนและเพิ่มความแม่นยำในการดูแลสวน",
        },
      },
    ],
  },
};

// AI Analysis Component
const AIAnalysis = ({ currentData }) => {
  // Map case IDs to their corresponding satellite indices and colors
  const indexMapping = {
    water: { index: "NDMI", value: currentData.indices.find(i => i.name === "NDMI"), color: "text-blue-700" },
    nutrient: { index: "NDRE", value: currentData.indices.find(i => i.name === "NDRE"), color: "text-orange-700" },
    leafage: { index: "PSRI", value: currentData.indices.find(i => i.name === "PSRI"), color: "text-red-700" },
  };

  return (
    <div className="text-[9px] sm:text-[10px] text-gray-700 mb-3 bg-white/70 rounded-xl p-2.5 border border-orange-200">
      <div className="font-semibold mb-1.5">🤖 AI วิเคราะห์ว่าความผิดปกติอาจมาจาก:</div>
      <ul className="pl-3 space-y-1.5">
        {recommendations.step1.cases.map((case_) => {
          const mapping = indexMapping[case_.id];
          if (!mapping || !mapping.value) return null;
          
          return (
            <li key={case_.id} className="leading-relaxed">
              <span className={`font-bold ${mapping.color}`}>{case_.title}</span> - 
              ค่า {mapping.index} {mapping.value.status.toLowerCase()} ({mapping.value.value}) {case_.context.summary.split('(')[1]?.split(')')[0] ? '- ' + case_.context.summary : ''}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Context Info Component
const ContextInfo = ({ context }) => {
  if (!context) return null;
  
  return (
    <div className="mt-2.5 p-2 bg-blue-50 border border-blue-200 rounded-lg space-y-1.5">
      <div className="flex items-center gap-1.5 font-semibold text-blue-900 text-[9px]">
        <span className="text-sm">{context.icon}</span>
        {context.title}
      </div>
      <p className="text-[9px] leading-relaxed text-blue-800">
        {context.summary}
      </p>
      <p className="text-[9px] leading-relaxed text-blue-700 bg-blue-100 p-1.5 rounded">
        💡 <span className="font-semibold">คำแนะนำ:</span> {context.advice}
      </p>
      <p className="text-[8px] text-blue-600 italic">
        ℹ️ {context.note}
      </p>
    </div>
  );
};

// Alert Suggestions Component
const AlertSuggestions = ({ currentData }) => {
  const [expandedSteps, setExpandedSteps] = useState({});
  const [expandedCases, setExpandedCases] = useState({});

  const toggleStep = (key) => setExpandedSteps((p) => ({ ...p, [key]: !p[key] }));
  const toggleCase = (key) => setExpandedCases((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-50 rounded-xl p-3 border-2 border-red-300 shadow-md">
      <h3 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-2">
        <span className="text-base">💡</span> คำแนะนำในการแก้ไข
      </h3>

      <AIAnalysis currentData={currentData} />

      {Object.entries(recommendations).map(([stepKey, step], i) => (
        <div key={stepKey} className="bg-white rounded-xl border-2 border-gray-200 mb-2.5 shadow-sm overflow-hidden">
          <button 
            onClick={() => toggleStep(stepKey)} 
            className="w-full flex justify-between items-center p-2.5 hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-[10px] sm:text-[11px] text-gray-800">
              {i + 1}. {step.title}
            </span>
            <span className="text-xs text-gray-500 font-bold">
              {expandedSteps[stepKey] ? "▼" : "▶"}
            </span>
          </button>
          {expandedSteps[stepKey] && (
            <div className="px-2.5 pb-2.5 text-[9px] sm:text-[10px] text-gray-700 space-y-2 border-t border-gray-100 pt-2">
              <p className="italic text-gray-600">{step.subtitle}</p>
              {step.cases.map((case_) => {
                const caseKey = `${stepKey}-${case_.id}`;
                return (
                  <div key={case_.id} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleCase(caseKey)} 
                      className="w-full flex justify-between items-center p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="flex items-center gap-1.5 font-semibold text-[10px]">
                        <span className="text-sm">{case_.icon}</span>
                        {case_.title}
                      </span>
                      <span className="text-xs text-gray-500 font-bold">
                        {expandedCases[caseKey] ? "▼" : "▶"}
                      </span>
                    </button>
                    {expandedCases[caseKey] && (
                      <div className="p-2.5 space-y-2 bg-white">
                        {case_.indicators && (
                          <p className="text-blue-700 bg-blue-50 p-2 rounded-lg text-[9px]">
                            🔍 <span className="font-semibold">อาการ:</span> {case_.indicators.join(", ")}
                          </p>
                        )}
                        {case_.details && case_.details.map((d,i)=>(
                          <p key={i} className="pl-2 leading-relaxed text-[9px]">• {d}</p>
                        ))}
                        {case_.actions && case_.actions.map((a,i)=>(
                          <p key={i} className="pl-2 leading-relaxed text-[9px]">• {a}</p>
                        ))}
                        {case_.action && (
                          <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 rounded-lg font-semibold text-[10px] hover:shadow-lg transition-all">
                            📸 {case_.action}
                          </button>
                        )}
                        {case_.precaution && (
                          <p className="text-orange-700 bg-orange-50 p-2 rounded-lg border border-orange-200 font-medium text-[9px]">
                            {case_.precaution}
                          </p>
                        )}
                        {case_.note && (
                          <p className="text-blue-700 bg-blue-50 p-2 rounded-lg border border-blue-200 text-[9px]">
                            💡 {case_.note}
                          </p>
                        )}
                        {case_.report && (
                          <p className="text-purple-700 bg-purple-50 p-2 rounded-lg border border-purple-200 text-[9px]">
                            {case_.report}
                          </p>
                        )}
                        <ContextInfo context={case_.context} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button className="mt-3 w-full bg-white border-2 border-emerald-500 text-emerald-700 py-2.5 rounded-xl text-[10px] sm:text-[11px] font-bold hover:bg-emerald-50 transition-all shadow-sm hover:shadow-md">
        📞 ปรึกษาผู้เชี่ยวชาญ
      </button>
    </div>
  );
};

// Healthy Suggestions Component
const HealthySuggestions = () => (
  <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-xl p-3 border-2 border-blue-300 shadow-md">
    <h3 className="font-bold text-xs text-gray-800 mb-3 flex items-center gap-2">
      <span className="text-base">💡</span> แนวทางการดูแลเพิ่มเติม
    </h3>
    <ul className="space-y-2 text-[10px] sm:text-[11px] text-gray-700">
      <li className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-blue-200">
        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
        <span>ดูแลความชื้นในดินให้เหมาะสม</span>
      </li>
      <li className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-blue-200">
        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
        <span>ให้ปุ๋ยอย่างสม่ำเสมอทุก 2 เดือน</span>
      </li>
      <li className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-blue-200">
        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
        <span>ตรวจสอบโรคและแมลงศัตรูพืชเป็นประจำ</span>
      </li>
      <li className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-blue-200">
        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
        <span>เก็บกวาดใบที่ร่วงหล่นเพื่อป้องกันโรค</span>
      </li>
    </ul>
  </div>
);

export default AgriMonitorPitchApp;