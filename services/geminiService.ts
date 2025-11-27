import { GoogleGenAI } from "@google/genai";
import { ServiceData } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not set in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeProfitability = async (data: ServiceData[]): Promise<string> => {
  try {
    const ai = getClient();
    
    const prompt = `
      คุณคือที่ปรึกษาด้านการเงินและการลงทุนสำหรับธุรกิจคลินิกเสริมความงามระดับมืออาชีพ
      นี่คือข้อมูลผลประกอบการของสาขาและบริการต่างๆ (สกุลเงินบาท):
      ${JSON.stringify(data, null, 2)}

      หน้าที่ของคุณ:
      1. วิเคราะห์ข้อมูล ต้นทุน (Cost), รายได้ (Revenue), กำไร (Profit), อัตรากำไร (Margin) และ การเติบโต (Growth)
      2. ระบุ "Star Products" (กำไรสูง เติบโตดี) และ "Problem Areas" (กำไรต่ำ หรือติดลบ)
      3. ให้คำแนะนำแบบเจาะจงว่าบริการไหนหรือสาขาไหนควร "BUY/INVEST" (ลงทุนเพิ่ม) และอันไหนควร "SELL/CUT" (ลดขนาดหรือยกเลิก) พร้อมเหตุผลประกอบทางธุรกิจ
      
      รูปแบบการตอบ: ขอเป็นภาษาไทย จัดรูปแบบให้อ่านง่าย ใช้ Markdown, Bullet points และเน้นข้อความสำคัญ
      ไม่ต้องเกริ่นนำ ให้เข้าสู่บทวิเคราะห์เลย
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Fast response for dashboard
      }
    });

    return response.text || "ไม่สามารถวิเคราะห์ข้อมูลได้ในขณะนี้";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาตรวจสอบ API Key หรือลองใหม่อีกครั้ง";
  }
};