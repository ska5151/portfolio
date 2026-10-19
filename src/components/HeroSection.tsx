import type { LucideIcon } from 'lucide-react';
import { Mail, MapPin, Phone, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

type StyleVariant = 'A' | 'B' | 'C';

interface Props {
    styleVariant: StyleVariant;
    onCopy: (text: string, label: string) => void;
}

// 템플릿별 카드 스타일 차별화 (모두 좌측 사진 / 우측 기본정보 필수 구조 엄수)
const containerStyles: Record<StyleVariant, string> = {
    'A': 'bg-white border border-brand-sub rounded-3xl p-6 sm:p-10 shadow-sm',
    'B': 'bg-brand-dark text-white border border-brand-main/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden',
    'C': 'bg-white border-2 border-brand-dark rounded-2xl p-6 sm:p-10 shadow-[6px_6px_0px_#384959]'
};

// [필수 구조 1] 메인 화면 공통 생성기: 좌측 프로필 사진 + 우측 이름/이메일/연락처/소셜 링크
export default function HeroSection({ styleVariant, onCopy }: Props) {
    const p = portfolioData.profile;

    const isDark = styleVariant === 'B';
    const subTextColor = isDark ? 'text-brand-sub' : 'text-brand-main';
    const titleColor = isDark ? 'text-white' : 'text-brand-dark';
    const infoBoxClass = isDark
        ? 'bg-white/5 border border-white/15 text-white hover:border-brand-sub'
        : 'bg-brand-light border border-brand-sub/80 text-brand-dark hover:border-brand-accent';

    // 이메일 · 연락처 · 위치 (클릭 시 복사 지원)
    const infoItems: { icon: LucideIcon; label: string; caption: string; value: string; title: string }[] = [
        { icon: Mail, label: '이메일', caption: 'EMAIL (클릭 복사)', value: p.email, title: '클릭하여 이메일 복사' },
        { icon: Phone, label: '연락처', caption: 'PHONE (클릭 복사)', value: p.phone, title: '클릭하여 연락처 복사' },
        { icon: MapPin, label: '주소', caption: '주소 (클릭 복사)', value: p.location, title: '클릭하여 주소 복사' }
    ];

    return (
        <section id="section-hero" className={containerStyles[styleVariant]}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* [필수 좌측 영역] 프로필 사진 */}
                <div className="md:col-span-4 flex flex-col items-center">
                    <div className="relative group">
                        <div className={`w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-4 ${isDark ? 'border-brand-sub' : 'border-brand-main'} shadow-lg bg-brand-dark`}>
                            <img
                                src={p.avatar}
                                alt={`${p.name} 프로필 사진`}
                                onError={e => {
                                    // 이미지 로드 실패 시 한 번만 대체 이미지로 교체
                                    const img = e.currentTarget;
                                    if (img.src !== p.fallbackAvatar) img.src = p.fallbackAvatar;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* [필수 우측 영역] 이름, 직무, 이메일, 연락처, 주소 등 기본 정보 */}
                <div className="md:col-span-8 space-y-5 text-center md:text-left">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-sub text-brand-dark text-xs font-bold tracking-wide uppercase">
                            <Terminal className="w-3.5 h-3.5 text-brand-accent" />
                            <span>{p.engTitle}</span>
                        </div>
                        <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${titleColor}`}>{p.name}</h1>
                        <p className={`text-sm sm:text-base ${subTextColor} leading-relaxed max-w-2xl`}>{p.tagline}</p>
                    </div>

                    {/* 이메일 · 연락처 · 위치 그리드 (클릭 시 복사 지원) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                        {infoItems.map(({ icon: Icon, label, caption, value, title }) => (
                            <button key={label} onClick={() => onCopy(value, label)} className={`p-3 rounded-xl ${infoBoxClass} transition flex items-center gap-3 group`} title={title}>
                                <div className="w-9 h-9 rounded-lg bg-brand-accent/15 text-brand-accent flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className={`text-[11px] font-mono ${subTextColor}`}>{caption}</div>
                                    <div className="text-xs sm:text-sm font-semibold truncate">{value}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
