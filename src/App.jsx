import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  MapPin,
} from 'lucide-react';

import defectedImg from './assets/defected.png';
import defected2Img from './assets/defected2.png';
import healthyImg from './assets/healthy.png';
import fullmapImg from './assets/fullmap.png';
import fullmapHealthyImg from './assets/fullmapHealthy.png';

const AgriMonitorPitchApp = () => {
  // Load Tailwind CSS from CDN (for playground/demo environments)
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const [currentScreen, setCurrentScreen] = useState('alert');

  // -------------------- Data --------------------
  const alertData = {
    title: 'พบความผิดปกติในสวน',
    date: '5 ตุลาคม 2568',
    time: '10:30 น.',
    location: 'สวนยางแปลงที่ 1, โซนตะวันออก',
    area: '1 ไร่ 5 งาน 16 ตารางวา',
    summary: {
      text: 'ต้นยางมีสุขภาพไม่ดี เนื่องจากอากาศชื้นสูง (89%) และเย็น (19°C) ติดต่อกัน 7 วัน ทำให้เสี่ยงต่อโรคเชื้อรา พื้นที่ใกล้เคียงก็พบปัญหาคล้ายกัน',
    },
    detection: {
      description: 'ใบเปลี่ยนสีเหลือง เริ่มเห็น 2 สัปดาห์แล้ว กระจายเป็นวงกลม',
    },
    indices: [
      { name: 'NDVI', icon: '🌱', label: 'ความเขียวของใบ (NDVI)', value: '0.45', status: 'ต่ำกว่าปกติ', desc: 'ใบไม่เขียวสด แสดงว่าต้นไม่แข็งแรง', normalRange: '0.65 - 0.85' },
      { name: 'NDRE', icon: '🍃', label: 'ความแข็งแรงของใบ (NDRE)', value: '0.32', status: 'ต่ำ', desc: 'ใบอ่อนแอ อาจขาดธาตุอาหาร', normalRange: '0.55 - 0.75' },
      { name: 'NDMI', icon: '💧', label: 'ความชื้นในต้น (NDMI)', value: '0.28', status: 'แห้ง', desc: 'ต้นมีน้ำน้อย อาจขาดน้ำหรือเป็นโรค', normalRange: '0.50 - 0.70' },
      { name: 'PSRI', icon: '🍂', label: 'ใบแก่/เสื่อม (PSRI)', value: '0.18', status: 'สูง', desc: 'ใบเริ่มแก่ก่อนเวลา เป็นสัญญาณเครียด', normalRange: '< 0.05' },
    ],
    nearbyFarms: [
      { direction: 'ทิศตะวันออกเฉียงเหนือ', distance: '3', time: '5 วันที่แล้ว' },
      { direction: 'ทิศตะวันตก', distance: '4', time: '1 สัปดาห์ที่แล้ว' },
      { direction: 'ทิศใต้', distance: '5', time: '3 วันที่แล้ว' },
    ],
    relatedInfo: {
      diseases: ['โรคใบร่วง (Colletotrichum)', 'โรคใบจุด (Anthracnose)'],
      note: 'มักเกิดในช่วงฤดูฝน เมื่ออากาศชื้นและเย็น',
    },
  };

  const healthyData = {
    title: 'สวนมีสุขภาพดี',
    date: '5 ตุลาคม 2568',
    time: '10:30 น.',
    location: 'สวนยางแปลงที่ 2, โซนตะวันตก',
    area: '2 ไร่ 3 งาน 40 ตารางวา',
    summary: {
      text: 'ต้นยางแข็งแรงดี อากาศเหมาะสม ชื้นพอดี (72%) อบอุ่น (26°C) มีฝนสม่ำเสมอ ดูแลได้ดี ไม่พบปัญหา',
    },
    detection: {
      description: 'ต้นยางสุขภาพดี ใบเขียวสม่ำเสมอ ไม่มีความผิดปกติ',
    },
    indices: [
      { name: 'NDVI', icon: '🌱', label: 'ความเขียวของใบ (NDVI)', value: '0.78', status: 'ดีมาก', desc: 'ใบเขียวสด ต้นแข็งแรง', normalRange: '0.65 - 0.85' },
      { name: 'NDRE', icon: '🍃', label: 'ความแข็งแรงของใบ (NDRE)', value: '0.65', status: 'ดี', desc: 'ใบแข็งแรง มีธาตุอาหารเพียงพอ', normalRange: '0.55 - 0.75' },
      { name: 'NDMI', icon: '💧', label: 'ความชื้นในต้น (NDMI)', value: '0.58', status: 'พอดี', desc: 'ต้นมีน้ำเพียงพอ ไม่แห้งหรือท่วม', normalRange: '0.50 - 0.70' },
      { name: 'PSRI', icon: '🍂', label: 'ใบแก่/เสื่อม (PSRI)', value: '0.02', status: 'ต่ำ', desc: 'ใบยังอ่อน ไม่เสื่อมก่อนวัย', normalRange: '< 0.05' },
    ],
    nearbyFarms: [],
    relatedInfo: { diseases: [], note: '' },
  };

  const currentData = currentScreen === 'healthy' ? alertData : healthyData;
  const isAlert = currentScreen === 'healthy';

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      {/* Toggle Buttons */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 bg-white rounded-xl shadow-lg p-2">
        {['alert', 'healthy'].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              currentScreen === screen
                ? screen === 'healthy'
                  ? 'bg-red-500 text-white shadow-lg scale-105'
                  : 'bg-emerald-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {screen === 'healthy' ? '🚨 มีปัญหา' : '✅ สุขภาพดี'}
          </button>
        ))}
      </div>

      {/* Phone Container */}
      <div className="w-full max-w-md bg-black rounded-[3rem] shadow-2xl p-3" style={{ height: '844px' }}>
        <div className="bg-white rounded-[2.5rem] h-full overflow-hidden relative flex flex-col">
          
          {/* Status Bar - FIXED */}
          <div className="flex-shrink-0 h-12 bg-gradient-to-r from-emerald-600 to-lime-600 flex items-center justify-between px-6 text-white text-sm z-10">
            <span>9:41</span>
            <div className="flex gap-2">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Header - FIXED */}
          <div className={`flex-shrink-0 ${isAlert ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-lime-500'} text-white p-3`}>
            <div className="flex items-center gap-3">
              {isAlert ? <AlertTriangle className="w-7 h-7" /> : <CheckCircle className="w-7 h-7" />}
              <div>
                <h1 className="text-xl font-bold">{currentData.title}</h1>
                <p className="text-xs text-white/90">{currentData.date} • {currentData.time}</p>
              </div>
            </div>
          </div>

          {/* Map Preview - FIXED */}
          <div className="flex-shrink-0 relative aspect-video bg-black">
            <img src={isAlert ? fullmapImg : fullmapHealthyImg} alt="Field" className="w-full h-[238.5px] object-cover" />
            
            {/* Continuous Gradient Bar */}
            <div className="absolute top-2 left-2 flex flex-col items-center h-[75%]">
              <span className="text-[10px] font-bold text-white mb-1 drop-shadow-lg">สูง</span>
              <div 
                className="flex-1 w-4 rounded-full shadow-lg"
                style={{
                  background: 'linear-gradient(to bottom, #ef4444, #fb923c, #fde047, #86efac, #16a34a)'
                }}
              />
              <span className="text-[10px] font-bold text-white mt-1 drop-shadow-lg">ต่ำ</span>
            </div>

            {/* Area Label */}
            <div className={`absolute top-2 right-2 ${isAlert ? 'bg-red-500' : 'bg-emerald-500'} rounded-lg px-2 py-1 text-white text-xs font-bold shadow-lg`}>
              {currentData.area}
            </div>
          </div>

          {/* Carousel - FIXED */}
          <div className="flex-shrink-0 py-2 flex justify-center bg-gray-50">
            <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-xs">◀</button>
              <div className="flex gap-2">
                {(isAlert
                  ? [{ date: '01/09/2568', img: defected2Img }, { date: '06/09/2568', img: defected2Img }, { date: '11/09/2568', img: defectedImg }]
                  : [{ date: '01/09/2568', img: healthyImg }, { date: '06/09/2568', img: healthyImg }, { date: '11/09/2568', img: healthyImg }]
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

          {/* SCROLLABLE Content - ONLY THIS PART SCROLLS */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            
            {/* Summary Section */}
            <div className={`${isAlert ? 'bg-orange-50 border-orange-200' : 'bg-emerald-50 border-emerald-200'} rounded-xl p-3 border-2`}>
              <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                <span className="text-lg">📋</span> สรุปสถานการณ์
              </h3>
              <p className="text-xs text-gray-700 leading-relaxed">{currentData.summary.text}</p>
            </div>

            {/* Detection */}
            <Section title="สิ่งที่เราตรวจพบ" icon="🔍">
              {currentData.detection.description}
            </Section>

            {/* Satellite Indices */}
            <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
              <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                <span className="text-lg">🛰️</span> ข้อมูลจากดาวเทียม
              </h3>

              <div className="space-y-2">
                {currentData.indices.map((idx, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 p-2 rounded-lg ${
                      isAlert ? 'bg-red-50' : 'bg-green-50'
                    }`}
                  >
                    {/* Icon */}
                    <span className="text-xl flex-shrink-0">{idx.icon}</span>

                    <div className="flex-1 min-w-0">
                      {/* Row 1: label + status */}
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-xs text-gray-800">{idx.label}</span>
                        <span
                          className={`text-xs md:text-sm font-semibold px-2 py-1 rounded-lg ${
                            isAlert ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'
                          }`}
                        >
                          {idx.status}
                        </span>
                      </div>

                      {/* Row 2: desc */}
                      <p className="text-[11px] text-gray-600 leading-tight">{idx.desc}</p>

                      {/* Row 3: normalRange + value */}
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[11px] text-gray-500">ค่าปกติ: {idx.normalRange}</span>
                        <span className="text-base font-bold text-gray-900">{idx.value}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Nearby Farms */}
            {isAlert && currentData.nearbyFarms.length > 0 && (
              <Section title="สวนใกล้เคียง" icon="📊">
                <p className="text-xs text-gray-600 mb-2">พบสวนที่มีอาการคล้ายกัน {currentData.nearbyFarms.length} แปลง:</p>
                {currentData.nearbyFarms.map((farm, i) => (
                  <div key={i} className="bg-orange-50 rounded-lg p-2 border border-orange-200 mb-1.5 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-xs text-gray-800">{farm.direction} {farm.distance} กม.</div>
                      <div className="text-[10px] text-gray-600">รายงานเมื่อ {farm.time}</div>
                    </div>
                    <MapPin className="w-3 h-3 text-orange-600" />
                  </div>
                ))}
              </Section>
            )}

            {/* Related Info with Camera Button */}
            {isAlert && currentData.relatedInfo.diseases.length > 0 && (
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <div className="font-semibold text-xs text-gray-800 mb-1.5">🦠 โรคที่อาจเกี่ยวข้อง</div>
                {currentData.relatedInfo.diseases.map((d, i) => (
                  <div key={i} className="text-xs text-gray-700 ml-3">• {d}</div>
                ))}
                <div className="text-[10px] text-gray-600 mt-1.5 ml-3">{currentData.relatedInfo.note}</div>
                
                {/* Camera button for leaf disease detection */}
                <button className="mt-3 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2">
                  <span className="text-base">📸</span>
                  ถ่ายรูปใบเพื่อตรวจโรค
                </button>
                <p className="text-[10px] text-gray-500 mt-1.5 text-center">AI จะช่วยวิเคราะห์อาการของใบเพื่อยืนยันโรค</p>
              </div>
            )}

            {/* Suggestions Section */}
            {isAlert ? (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-3 border-2 border-emerald-200">
                <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                  <span className="text-lg">💡</span> คำแนะนำในการแก้ไข
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-emerald-200">
                    <div className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-800 mb-0.5">ตรวจสอบพื้นที่ด้วยตาเอง</div>
                      <div className="text-[11px] text-gray-600">เดินดูที่โซนตะวันออก สังเกตใบเหลือง มีจุดดำ หรือเชื้อรา</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-emerald-200">
                    <div className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-800 mb-0.5">ฉีดพ่นสารป้องกัน</div>
                      <div className="text-[11px] text-gray-600">ใช้ แมนโคเซบ หรือ คอปเปอร์ไฮดรอกไซด์ 2-3 กรัม/ลิตร เริ่มจากจุดกลาง</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-emerald-200">
                    <div className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-800 mb-0.5">เก็บใบที่เป็นโรค</div>
                      <div className="text-[11px] text-gray-600">ตัดใบที่มีอาการเหลืองและจุดดำ เผาทิ้งห่างจากสวน</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-emerald-200">
                    <div className="bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                      4
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-gray-800 mb-0.5">ติดตามผลต่อเนื่อง</div>
                      <div className="text-[11px] text-gray-600">ตรวจสอบทุก 2-3 วัน หากไม่ดีขึ้นภายใน 1 สัปดาห์ โทรผู้เชี่ยวชาญ</div>
                    </div>
                  </div>
                </div>

                {/* Contact Expert Button */}
                <button className="mt-3 w-full bg-white border-2 border-emerald-500 text-emerald-700 py-2.5 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2">
                  <span className="text-base">📞</span>
                  ปรึกษาผู้เชี่ยวชาญ
                </button>
              </div>
            ) : (
              /* Healthy Field Suggestions */
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border-2 border-blue-200">
                <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                  <span className="text-lg">✨</span> การดูแลรักษา
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-blue-200">
                    <span className="text-base flex-shrink-0">✅</span>
                    <div className="text-[11px] text-gray-700">รักษาการดูแลในระดับปัจจุบัน</div>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-blue-200">
                    <span className="text-base flex-shrink-0">✅</span>
                    <div className="text-[11px] text-gray-700">ตรวจสอบสวนสม่ำเสมอทุกสัปดาห์</div>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-blue-200">
                    <span className="text-base flex-shrink-0">✅</span>
                    <div className="text-[11px] text-gray-700">สังเกตอาการผิดปกติที่อาจเกิดขึ้น</div>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-2 border border-blue-200">
                    <span className="text-base flex-shrink-0">✅</span>
                    <div className="text-[11px] text-gray-700">ให้น้ำและปุ๋ยตามกำหนดเวลา</div>
                  </div>
                </div>
              </div>
            )}

            {/* Note */}
            <div className={`${isAlert ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'} rounded-xl p-3 border`}>
              <div className="flex gap-2">
                <Info className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isAlert ? 'text-yellow-600' : 'text-blue-600'}`} />
                <div>
                  <h4 className={`font-semibold text-xs mb-1 ${isAlert ? 'text-yellow-900' : 'text-blue-900'}`}>📌 หมายเหตุ</h4>
                  <p className={`text-[11px] leading-relaxed ${isAlert ? 'text-yellow-700' : 'text-blue-700'}`}>
                    {isAlert
                      ? 'นี่เป็นข้อมูลเบื้องต้น ยังต้องตรวจสอบข้อเท็จจริงเพื่อยืนยัน'
                      : 'ระบบติดตามทุก 5 วัน หากพบปัญหาจะแจ้งเตือนทันที'}
                  </p>
                </div>
              </div>
            </div>

          </div> {/* End Scrollable Content */}
        </div>
      </div>
    </div>
  );
};

// Compact Section Component
const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md p-3 border border-gray-200">
    <h3 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
      <span className="text-lg">{icon}</span> {title}
    </h3>
    <div className="text-xs text-gray-700 leading-relaxed">{children}</div>
  </div>
);

export default AgriMonitorPitchApp;