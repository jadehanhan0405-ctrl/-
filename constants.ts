import { University, MaterialItem, StudentProfile } from './types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: '徐朗',
  rank: {
    general: 246,
    combination: 192,
    total: 700,
  },
  scores: {
    chinese: 105,
    math: 110,
    english: 125,
    physics: 70,
  },
};

export const ZONGPING_UNIVERSITIES: University[] = [
  { id: 'nyush', name: '上海纽约大学', category: 'Zongping', status: 'In Progress', deadline: '2026-02-01', requirements: ['Campus Day', 'Common App', 'School Report'] },
  { id: 'sh-tech', name: '上海科技大学', category: 'Zongping', status: 'In Progress', deadline: '2026-05-06', requirements: ['Campus Visit', 'Personal Statement'] },
  { id: 'su-tech', name: '南方科技大学', category: 'Zongping', status: 'Not Started', deadline: '2026-05-07 (参考上年)', requirements: ['Comprehensive Test', 'Interview'] },
  { id: 'bfsu', name: '北京外国语大学', category: 'Zongping', status: 'Not Started', deadline: '2026-04-15 (参考上年)', requirements: ['Language Proficiency'] },
  { id: 'm-bit', name: '深圳北理莫斯科大学', category: 'Zongping', status: 'Not Started', deadline: '2026-05-20 (参考上年)', requirements: ['Math/Russian Entrance Test'] },
];

export const OVERSEAS_UNIVERSITIES: University[] = [
  { id: 'nus', name: '新加坡国立大学', category: 'Singapore', status: 'In Progress', deadline: '2026-02-23', requirements: ['Gaokao', 'IELTS/TOEFL', 'Awards'] },
  { id: 'ntu', name: '南洋理工大学', category: 'Singapore', status: 'In Progress', deadline: '2026-01-20', requirements: ['Gaokao', 'English Proficiency'] },
  { id: 'hku', name: '香港大学', category: 'HK_Macau', status: 'In Progress', deadline: '2026-06-28', requirements: ['Interview', 'PS'] },
  { id: 'hkust', name: '香港科技大学', category: 'HK_Macau', status: 'In Progress', deadline: '2026-06-10', requirements: ['Interview', 'Portfolio'] },
  { id: 'polyu', name: '香港理工大学', category: 'HK_Macau', status: 'In Progress', deadline: '2026-06-11', requirements: ['Exam Result'] },
  { id: 'cityu', name: '香港城市大学', category: 'HK_Macau', status: 'In Progress', deadline: '2026-06-11', requirements: ['Exam Result'] },
  { id: 'um', name: '澳门大学', category: 'HK_Macau', status: 'Not Started', deadline: '2026-06-26', requirements: ['Gaokao Score'] },
  { id: 'must', name: '澳门科技大学', category: 'HK_Macau', status: 'Not Started', deadline: '2026-06-30 (参考上年)', requirements: ['Gaokao Score'] },
];

export const INITIAL_MATERIALS: MaterialItem[] = [
  { id: 'm1', name: '身份证 / 电子证件照', status: 'Not Started', description: '清晰的白底电子版身份证正反面及个人证件照' },
  { id: 'm2', name: '护照 / 港澳通行证', status: 'Not Started', description: '如有请提供，有效期需覆盖入学日期' },
  { id: 'm3', name: '在校成绩单', status: 'Not Started', description: '需对应综评各校模板，加盖学校公章' },
  { id: 'm4', name: '高中综合素质档案', status: 'Not Started', description: '包含在校表现、社会实践、获奖记录等' },
  { id: 'm5', name: '学业水平考试成绩单', status: 'Not Started', description: '俗称“会考”成绩，需官方打印件' },
  { id: 'm6', name: '推荐信 (RL)', status: 'Not Started', description: '需老师邮箱、电话及亲笔签名（任课老师或班主任均可）' },
  { id: 'm7', name: '个人陈述 (PS)', status: 'Not Started', description: '根据各校要求撰写，重点突出英语及逻辑优势' },
  { id: 'm8', name: '个人简历 (CV)', status: 'Not Started', description: '中英文双语，梳理高中阶段核心经历' },
  { id: 'm9', name: '竞赛证书', status: 'Not Started', description: '仅限高中及以上，初中证书无需提供' },
  { id: 'm10', name: '语言成绩 (雅思/托福)', status: 'Not Started', description: 'NTU:6.0(W&S 6.0); NUS:6.5(R&W 6.5); 上纽大申请需同步提交' },
  { id: 'm11', name: '其他支撑材料', status: 'Not Started', description: '志愿者服务、科研项目、艺术作品集等' },
];