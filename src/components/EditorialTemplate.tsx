import { Lock } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import HeroSection from './HeroSection';
import SectionHeading from './SectionHeading';

interface Props {
    onCopy: (text: string, label: string) => void;
    onOpenDoc: (docId: string) => void;
}

/* ============================================================================
   에디토리얼 미니멀리스트 (Executive Editorial)
   - 특징: 정돈된 매거진/이력서 스타일의 고대비 타이포그래피와 넘버링 섹션,
          시니어/리드 엔지니어의 신뢰감을 극대화하는 경력 중심 배치
   ============================================================================ */
export default function EditorialTemplate({ onCopy, onOpenDoc }: Props) {
    return (
        <div className="template-fade max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
            {/* 상단 퀵 앵커 바 */}
            <nav className="flex flex-wrap items-center justify-between gap-2 border-y-2 border-brand-dark py-3 text-xs font-mono font-bold text-brand-dark">
                <span>INDEX // {portfolioData.profile.nameEn.toUpperCase()} PORTFOLIO</span>
                <div className="flex flex-wrap gap-4">
                    <a href="#section-hero" className="hover:text-brand-accent">01.PROFILE</a>
                    <a href="#section-activities" className="hover:text-brand-accent">02.CAREER</a>
                    <a href="#section-projects" className="hover:text-brand-accent">03.PROJECTS</a>
                    <a href="#section-skills" className="hover:text-brand-accent">04.SKILLS</a>
                    <a href="#section-cert-edu" className="hover:text-brand-accent">05.CREDENTIALS</a>
                    <a href="#section-docs" className="hover:text-brand-accent">06.ARCHIVES</a>
                </div>
            </nav>

            {/* 01. 메인 화면 (필수 구조: 좌측 프로필 사진, 우측 기본 정보) */}
            <HeroSection styleVariant="C" onCopy={onCopy} />

            {/* 02. 회사 활동 (시니어 포트폴리오 특화: 경력을 상단에 배치) */}
            <section id="section-activities" className="space-y-6">
                <SectionHeading number="02." title="회사 활동 및 경력 (Career & Leadership)" meta="2015 — PRESENT" />

                <div className="divide-y divide-brand-sub bg-white border-2 border-brand-dark rounded-2xl overflow-hidden">
                    {portfolioData.companyActivities.map(act => (
                        <div key={`${act.company}-${act.period}`} className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-4">
                            <div className="md:col-span-4 space-y-1">
                                <span className="inline-block px-2.5 py-0.5 rounded bg-brand-sub text-brand-dark font-mono text-xs font-bold">{act.period}</span>
                                <h3 className="text-lg font-extrabold text-brand-dark pt-1">{act.company}</h3>
                                <p className="text-xs font-bold text-brand-main">{act.position}</p>
                            </div>
                            <div className="md:col-span-8 space-y-3">
                                <p className="text-sm font-semibold text-brand-dark">{act.description}</p>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-brand-dark/90">
                                    {act.activities.map(item => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="font-mono text-brand-accent font-bold">→</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 03. 주요 프로젝트 */}
            <section id="section-projects" className="space-y-6">
                <SectionHeading number="03." title="주요 프로젝트 (Selected Works)" meta="8 KEY PROJECTS" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolioData.projects.map((proj, idx) => (
                        <article key={proj.id} className="bg-white border-2 border-brand-dark rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-[4px_4px_0px_#BDDDFC]">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between border-b border-brand-sub pb-2.5">
                                    <span className="font-mono text-xs font-bold text-brand-accent">PROJECT 0{idx + 1} // {proj.category}</span>
                                    {proj.period && <span className="font-mono text-xs text-brand-main">{proj.period}</span>}
                                </div>
                                <h3 className="text-lg font-extrabold text-brand-dark">{proj.title}</h3>
                                <p className="text-sm font-semibold text-brand-dark/90 leading-relaxed">{proj.summary}</p>
                                {proj.details.length > 0 && (
                                    <ul className="space-y-1 text-xs sm:text-sm text-brand-main font-medium">
                                        {proj.details.map(d => (
                                            <li key={d} className="flex items-start gap-1.5">
                                                <span className="font-mono text-brand-accent font-bold">-</span>
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="pt-2 border-t border-brand-sub/60">
                                <div className="flex flex-wrap gap-1.5">
                                    {proj.techs.map(t => <span key={t} className="px-2.5 py-0.5 rounded border border-brand-main text-brand-dark font-mono text-[11px] font-semibold">{t}</span>)}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* 04. 기술 스택 */}
            <section id="section-skills" className="space-y-6">
                <SectionHeading number="04." title="기술 스택 (TechnicalProficiency)" meta="CATEGORIZED SKILLS" />

                <div className="bg-white border-2 border-brand-dark rounded-2xl divide-y divide-brand-sub">
                    {portfolioData.skills.map(({ category, icon: Icon, items }) => (
                        <div key={category} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            <div className="md:col-span-4">
                                <h3 className="font-extrabold text-base text-brand-dark flex items-center gap-2">
                                    <Icon className="w-4 h-4 text-brand-accent" />
                                    <span>{category}</span>
                                </h3>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {items.map(s => (
                                    <div key={s.name} className="p-3 rounded-xl bg-brand-light border border-brand-sub flex items-center justify-between">
                                        <div className="text-xs sm:text-sm font-bold text-brand-dark">{s.name}</div>
                                        <span className="text-sm font-bold text-brand-accent tracking-widest">{s.stars}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 05. 자격증 & 학력 */}
            <section id="section-cert-edu" className="space-y-6">
                <SectionHeading number="05." title="자격증 및 학력 (Credentials & Education)" meta="VERIFIED RECORDS" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-brand-dark rounded-2xl p-6 space-y-4">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-main">Licensed Certifications</h3>
                        <div className="divide-y divide-brand-sub">
                            {portfolioData.certifications.map(c => (
                                <div key={c.name} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                                    <div className="text-sm font-bold text-brand-dark">{c.name}</div>
                                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-brand-sub text-brand-dark">{c.date}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border-2 border-brand-dark rounded-2xl p-6 space-y-4">
                        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-brand-main">Academic Background</h3>
                        <div className="divide-y divide-brand-sub">
                            {portfolioData.education.map(e => (
                                <div key={e.school} className="py-3 first:pt-0 last:pb-0 space-y-1">
                                    <div className="text-sm font-bold text-brand-dark">{e.school}</div>
                                    <div className="font-mono text-xs text-brand-main">{e.period} <span className="font-sans font-bold text-brand-accent">{e.degree}</span></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 06. 문서 첨부 파일 */}
            <section id="section-docs" className="space-y-6">
                <SectionHeading number="06." title="문서 첨부 파일 (Official Dossier & Resume)" meta="DIRECT DOWNLOAD" />

                <div className="bg-brand-dark text-white rounded-2xl p-6 sm:p-8 divide-y divide-white/15">
                    {portfolioData.documents.map(doc => (
                        <div key={doc.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-0.5 rounded bg-brand-sub text-brand-dark font-mono text-xs font-bold">{doc.format}</span>
                                <h3 className="font-bold text-base text-white">{doc.title}</h3>
                                <span className="text-xs font-mono text-brand-sub">{doc.filename}</span>
                            </div>
                            <button onClick={() => onOpenDoc(doc.id)} className="shrink-0 px-4 py-2.5 rounded-xl bg-brand-accent text-white text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition">
                                <Lock className="w-4 h-4" />
                                <span>다운로드</span>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
