
import { GoogleGenAI } from "@google/genai";
import { StudentProfile, University } from './types';

export const analyzeProfile = async (profile: StudentProfile, universities: University[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    作为资深留学与综评专家，请分析以下学生徐朗的背景并给出建议：
    学生成绩：
    - 排名：大类 ${profile.rank.general}/700+，组合 ${profile.rank.combination}
    - 优势科目：英语 ${profile.scores.english}，数学 ${profile.scores.math}
    - 选科：物理 ${profile.scores.physics}
    
    目标院校：
    - 综评：${universities.filter(u => u.category === 'Zongping').map(u => u.name).join(', ')}
    - 港澳新：${universities.filter(u => u.category !== 'Zongping').map(u => u.name).join(', ')}
    
    分析要点：
    1. 针对徐朗英语极佳的特点，哪些院校录取几率最高？
    2. 针对数学和物理的分数，申请港三（HKU, HKUST, CUHK）及新二（NUS, NTU）的硬核理工科是否有挑战？
    3. 综评材料准备的针对性建议。
    4. 整体申请策略（保底、稳健、冲刺院校推荐）。
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "暂时无法获取AI分析报告，请检查网络或稍后再试。";
  }
};
