
import React, { useState, useEffect, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend 
} from 'recharts';
import { 
  LayoutDashboard, GraduationCap, Globe, ClipboardList, BrainCircuit, 
  CheckCircle2, Clock, AlertCircle, ChevronRight, Menu, X, User
} from 'lucide-react';
import { 
  INITIAL_STUDENT_PROFILE, 
  ZONGPING_UNIVERSITIES, 
  OVERSEAS_UNIVERSITIES, 
  INITIAL_MATERIALS 
} from './constants';
import { AppSection, University, MaterialItem } from './types';
import { analyzeProfile } from './geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OVERVIEW);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile] = useState(INITIAL_STUDENT_PROFILE);
  const [zongping, setZongping] = useState(ZONGPING_UNIVERSITIES);
  const [overseas, setOverseas] = useState(OVERSEAS_UNIVERSITIES);
  const [materials, setMaterials] = useState(INITIAL_MATERIALS);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const scoreData = [
    { name: '语文', score: profile.scores.chinese, full: 150 },
    { name: '数学', score: profile.scores.math, full: 150 },
    { name: '英语', score: profile.scores.english, full: 150 },
    { name: '物理', score: profile.scores.physics, full: 100 },
  ];

  const radarData = [
    { subject: '语言', A: 95 },
    { subject: '数学', A: 85 },
    { subject: '科学', A: 75 },
    { subject: '综合', A: 80 },
    { subject: '软技能', A: 88 },
  ];

  const progressStats = useMemo(() => {
    const allUnis = [...zongping, ...overseas];
    const submitted = allUnis.filter(u => u.status === 'Submitted' || u.status === 'Interview' || u.status === 'Admitted').length;
    const readyMaterials = materials.filter(m => m.status === 'Ready').length;
    
    return {
      uniProgress: Math.round((submitted / allUnis.length) * 100),
      materialProgress: Math.round((readyMaterials / materials.length) * 100)
    };
  }, [zongping, overseas, materials]);

  const handleFetchAnalysis = async () => {
    setIsAnalyzing(true);
    const report = await analyzeProfile(profile, [...zongping, ...overseas]);
    setAiReport(report || "未生成报告");
    setIsAnalyzing(false);
  };

  const updateUniStatus = (id: string, newStatus: University['status']) => {
    setZongping(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    setOverseas(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const toggleMaterial = (id: string) => {
    setMaterials(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus: any = m.status === 'Ready' ? 'Pending' : (m.status === 'Pending' ? 'Not Started' : 'Ready');
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const renderOverview = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium">综合申请进度</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{progressStats.uniProgress}%</p>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressStats.uniProgress}%` }}></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-slate-500 text-sm font-medium">材料整备率</h3>
            <p className="text-3xl font-bold text-slate-900 mt-1">{progressStats.materialProgress}%</p>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progressStats.materialProgress}%` }}></div>
          </div>
        </div>
        <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg flex items-center justify-between text-white">
          <div>
            <h3 className="opacity-80 text-sm font-medium">学生排名</h3>
            <p className="text-2xl font-bold mt-1">#246 / 700+</p>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded mt-2 inline-block">组合排名: #192</span>
          </div>
          <User className="w-10 h-10 opacity-50" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">学科能力分布</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.score > 110 ? '#4f46e5' : '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">综合素质概览</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                <Radar name="徐朗" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUniversities = (list: University[], title: string) => (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        <span className="text-sm text-slate-500">共 {list.length} 所院校</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map(uni => (
          <div key={uni.id} className="bg-white p-5 rounded-xl border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{uni.name}</h4>
              <StatusBadge status={uni.status} />
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs text-slate-500">
                <Clock className="w-3 h-3 mr-1" />
                截止日期: {uni.deadline}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {uni.requirements.slice(0, 3).map(req => (
                  <span key={req} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{req}</span>
                ))}
              </div>
            </div>
            <select 
              className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={uni.status}
              onChange={(e) => updateUniStatus(uni.id, e.target.value as any)}
            >
              <option value="Not Started">未开始</option>
              <option value="In Progress">进行中</option>
              <option value="Submitted">已提交</option>
              <option value="Interview">面试中</option>
              <option value="Admitted">录取</option>
              <option value="Rejected">拒绝</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaterials = () => (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">申请材料清单</h2>
      <div className="space-y-3">
        {materials.map(item => (
          <div 
            key={item.id} 
            onClick={() => toggleMaterial(item.id)}
            className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${
              item.status === 'Ready' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100 hover:border-slate-300'
            }`}
          >
            <div className={`mr-4 ${item.status === 'Ready' ? 'text-emerald-600' : 'text-slate-300'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${item.status === 'Ready' ? 'text-emerald-900' : 'text-slate-800'}`}>{item.name}</h4>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIAdvisor = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <BrainCircuit className="w-7 h-7 mr-2" />
            AI 录取专家诊断
          </h2>
          <p className="opacity-80 max-w-lg mb-6 text-sm">
            基于徐朗目前的排名 (#246) 和英语优势科目 (125+)，结合目标院校历史录取数据，为您提供个性化申请分析。
          </p>
          <button 
            disabled={isAnalyzing}
            onClick={handleFetchAnalysis}
            className={`bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 transition-all flex items-center ${isAnalyzing ? 'opacity-50' : ''}`}
          >
            {isAnalyzing ? '分析中...' : '生成诊断报告'}
          </button>
        </div>
        <BrainCircuit className="absolute -right-10 -bottom-10 w-64 h-64 text-white/10" />
      </div>

      {aiReport && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 whitespace-pre-wrap leading-relaxed text-slate-700">
          <div className="flex items-center mb-6 text-indigo-600">
            <div className="w-2 h-8 bg-indigo-600 rounded-full mr-3"></div>
            <h3 className="text-xl font-bold">申请策略分析报告</h3>
          </div>
          <div className="prose max-w-none">
            {aiReport}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-slate-200 z-50 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              X
            </div>
            {isSidebarOpen && <span className="font-bold text-lg text-slate-900 truncate">徐朗申请系统</span>}
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            <NavItem 
              icon={<LayoutDashboard />} 
              label="总览看板" 
              active={activeSection === AppSection.OVERVIEW} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveSection(AppSection.OVERVIEW)} 
            />
            <NavItem 
              icon={<GraduationCap />} 
              label="综合评价" 
              active={activeSection === AppSection.ZONGPING} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveSection(AppSection.ZONGPING)} 
            />
            <NavItem 
              icon={<Globe />} 
              label="港澳新申请" 
              active={activeSection === AppSection.OVERSEAS} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveSection(AppSection.OVERSEAS)} 
            />
            <NavItem 
              icon={<ClipboardList />} 
              label="材料准备" 
              active={activeSection === AppSection.MATERIALS} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveSection(AppSection.MATERIALS)} 
            />
            <NavItem 
              icon={<BrainCircuit />} 
              label="AI 智能建议" 
              active={activeSection === AppSection.AI_ADVISOR} 
              collapsed={!isSidebarOpen}
              onClick={() => setActiveSection(AppSection.AI_ADVISOR)} 
            />
          </nav>

          <div className="p-4 border-t border-slate-100">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeSection === AppSection.OVERVIEW && '欢迎回来，徐朗'}
              {activeSection === AppSection.ZONGPING && '综合评价申请进度'}
              {activeSection === AppSection.OVERSEAS && '港澳新本科申请'}
              {activeSection === AppSection.MATERIALS && '材料筹备中心'}
              {activeSection === AppSection.AI_ADVISOR && '专家诊断系统'}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm relative">
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              <AlertCircle className="w-5 h-5 text-slate-600" />
            </div>
            <div className="flex items-center space-x-3 bg-white p-1.5 pr-4 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                XL
              </div>
              <span className="text-sm font-semibold text-slate-700">徐朗</span>
            </div>
          </div>
        </header>

        <div className="pb-12">
          {activeSection === AppSection.OVERVIEW && renderOverview()}
          {activeSection === AppSection.ZONGPING && renderUniversities(zongping, "综合评价 (Mainland Zongping)")}
          {activeSection === AppSection.OVERSEAS && renderUniversities(overseas, "港澳新 (HK/Macau/Singapore)")}
          {activeSection === AppSection.MATERIALS && renderMaterials()}
          {activeSection === AppSection.AI_ADVISOR && renderAIAdvisor()}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, collapsed: boolean, onClick: () => void }> = ({ icon, label, active, collapsed, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center p-3 rounded-xl transition-all ${
      active 
        ? 'bg-blue-50 text-blue-700 font-semibold' 
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <span className={`flex-shrink-0 ${active ? 'text-blue-700' : 'text-slate-400'}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 22 })}
    </span>
    {!collapsed && <span className="ml-3 text-sm">{label}</span>}
    {active && !collapsed && <ChevronRight className="ml-auto w-4 h-4 opacity-50" />}
  </button>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    'Ready': 'bg-emerald-100 text-emerald-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'Not Started': 'bg-slate-100 text-slate-600',
    'In Progress': 'bg-blue-100 text-blue-700',
    'Submitted': 'bg-indigo-100 text-indigo-700',
    'Interview': 'bg-violet-100 text-violet-700',
    'Admitted': 'bg-emerald-100 text-emerald-700 font-bold border border-emerald-200',
    'Rejected': 'bg-rose-100 text-rose-700',
  };

  const labels: Record<string, string> = {
    'Ready': '已备齐',
    'Pending': '修改中',
    'Not Started': '待开始',
    'In Progress': '进行中',
    'Submitted': '已提交',
    'Interview': '面试中',
    'Admitted': '录取 🎉',
    'Rejected': '落选',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles['Not Started']}`}>
      {labels[status] || status}
    </span>
  );
};

export default App;
