import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { BookMarked, CloudCog, Github, Globe, Layout, Linkedin, Server } from 'lucide-react';
import careerJson from '../../data/Career.json';
import worksJson from '../../data/Works.json';
import technicalProficiencyJson from '../../data/TechnicalProficiency.json';
import credentialsJson from '../../data/Credentials.json';
import { env } from '../env';

export interface SkillCategory {
    category: string;
    icon: LucideIcon;
    items: { name: string; stars: string }[];
}

export interface RawSkillCategory {
    category: string;
    icon: string;
    items: { name: string; stars: string }[];
}

export interface Project {
    id: string;
    category: string;
    title: string;
    period: string;
    summary: string;
    details: string[];
    techs: string[];
}

export interface CompanyActivity {
    company: string;
    position: string;
    period: string;
    badge: string;
    description: string;
    activities: string[];
}

export interface CertificationRecord {
    name: string;
    date: string;
}

export interface EducationRecord {
    school: string;
    period: string;
    degree: string;
}

export interface CredentialsData {
    certifications: CertificationRecord[];
    education: EducationRecord[];
}

export interface PortfolioDocument {
    id: string;
    title: string;
    filename: string;
    filePath: string;
    format: string;
}

const skillIconMap: Record<string, LucideIcon> = {
    Layout,
    Server,
    CloudCog
};

export function mapSkillCategories(raw: RawSkillCategory[]): SkillCategory[] {
    return raw.map(entry => ({
        category: entry.category,
        icon: skillIconMap[entry.icon] ?? Layout,
        items: entry.items
    }));
}

// 포트폴리오 공통 데이터 (필수 6개 섹션 데이터 완비, 02~05 섹션은 data/*.json에서 로드)
export const portfolioData = {
    profile: {
        // 이름·연락처·주소 등 개인정보는 .env(name, name_en, phone, email, address)에서 불러와 채움
        name: env.displayName,
        nameEn: env.nameEn,
        engTitle: "Senior Full-Stack & Cloud Architect",
        tagline: "사용자의 본질적인 니즈를 깊이 고민하고 시스템의 빈틈을 집요하게 메우며, 완성도 높은 차별화된 서비스를 구현하는 개발자입니다.",
        // file:// 빌드에서도 동작하도록 상대 경로 사용
        avatar: "image/profile.png",
        fallbackAvatar: "https://placehold.co/400x400/384959/BDDDFC?text=SK",
        email: env.email,
        phone: env.phone,
        location: env.address,
        status: "이직 및 기술 자문 논의 가능",
        socials: [
            { name: "GitHub", handle: "github.com/sungyun-arch", url: "https://github.com", icon: Github },
            { name: "LinkedIn", handle: "linkedin.com/in/sungyun-kwon", url: "https://linkedin.com", icon: Linkedin },
            { name: "Tech Blog", handle: "velog.io/@sungyun-cloud", url: "https://velog.io", icon: Globe },
            { name: "Portfolio Notion", handle: "sungyun.notion.site", url: "https://notion.so", icon: BookMarked }
        ],
        metrics: [
            { label: "총 개발 경력", value: "7년+" },
            { label: "프로덕션 배포", value: "28건" },
            { label: "시스템 가용성", value: "99.98%" },
            { label: "오픈소스 기여", value: "42 PRs" }
        ]
    },
    skills: mapSkillCategories(technicalProficiencyJson as RawSkillCategory[]),
    projects: worksJson as Project[],
    companyActivities: careerJson as CompanyActivity[],
    certifications: (credentialsJson as CredentialsData).certifications,
    education: (credentialsJson as CredentialsData).education,
    // 파일 경로는 file:// 빌드에서도 동작하도록 상대 경로 사용 (public/docs)
    documents: [
        {
            id: "doc-graduation",
            title: "졸업증명서",
            filename: "졸업증명서.pdf",
            filePath: "docs/졸업증명서.pdf",
            format: "PDF"
        },
        {
            id: "doc-transcript",
            title: "성적증명서",
            filename: "성적증명서.pdf",
            filePath: "docs/성적증명서.pdf",
            format: "PDF"
        },
        {
            id: "doc-degree",
            title: "학위증명서(학점은행제)",
            filename: "학위증명서.pdf",
            filePath: "docs/학위증명서.pdf",
            format: "PDF"
        }
    ] as PortfolioDocument[]
};

export function usePortfolioData() {
    const [data, setData] = useState(() => ({
        ...portfolioData,
        companyActivities: careerJson as CompanyActivity[],
        projects: worksJson as Project[],
        skills: mapSkillCategories(technicalProficiencyJson as RawSkillCategory[]),
        certifications: (credentialsJson as CredentialsData).certifications,
        education: (credentialsJson as CredentialsData).education
    }));

    useEffect(() => {
        setData(prev => ({
            ...prev,
            companyActivities: careerJson as CompanyActivity[],
            projects: worksJson as Project[],
            skills: mapSkillCategories(technicalProficiencyJson as RawSkillCategory[]),
            certifications: (credentialsJson as CredentialsData).certifications,
            education: (credentialsJson as CredentialsData).education
        }));

        if (typeof window === 'undefined' || window.location.protocol === 'file:') {
            return;
        }

        let active = true;
        const loadRuntimeJson = async () => {
            try {
                const stamp = `?t=${Date.now()}`;
                const [careerRes, worksRes, skillsRes, credRes] = await Promise.all([
                    fetch(`data/Career.json${stamp}`, { cache: 'no-store' }),
                    fetch(`data/Works.json${stamp}`, { cache: 'no-store' }),
                    fetch(`data/TechnicalProficiency.json${stamp}`, { cache: 'no-store' }),
                    fetch(`data/Credentials.json${stamp}`, { cache: 'no-store' })
                ]);
                if (!active || !careerRes.ok || !worksRes.ok || !skillsRes.ok || !credRes.ok) return;
                const [career, works, skillsRaw, creds] = await Promise.all([
                    careerRes.json() as Promise<CompanyActivity[]>,
                    worksRes.json() as Promise<Project[]>,
                    skillsRes.json() as Promise<RawSkillCategory[]>,
                    credRes.json() as Promise<CredentialsData>
                ]);
                if (!active) return;
                setData(prev => ({
                    ...prev,
                    companyActivities: Array.isArray(career) ? career : prev.companyActivities,
                    projects: Array.isArray(works) ? works : prev.projects,
                    skills: Array.isArray(skillsRaw) ? mapSkillCategories(skillsRaw) : prev.skills,
                    certifications: Array.isArray(creds?.certifications) ? creds.certifications : prev.certifications,
                    education: Array.isArray(creds?.education) ? creds.education : prev.education
                }));
            } catch {
                // Bundled JSON fallback remains active when static fetch is unavailable
            }
        };

        void loadRuntimeJson();
        window.addEventListener('focus', loadRuntimeJson);
        return () => {
            active = false;
            window.removeEventListener('focus', loadRuntimeJson);
        };
    }, []);

    return data;
}
