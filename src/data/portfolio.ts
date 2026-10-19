import type { LucideIcon } from 'lucide-react';
import { BookMarked, CloudCog, Github, Globe, Layout, Linkedin, Server } from 'lucide-react';
import { env } from '../env';

export interface SkillCategory {
    category: string;
    icon: LucideIcon;
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

export interface PortfolioDocument {
    id: string;
    title: string;
    filename: string;
    filePath: string;
    format: string;
}

// 포트폴리오 공통 데이터 (필수 6개 섹션 데이터 완비)
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
    skills: [
        {
            category: "Frontend Engineering",
            icon: Layout,
            items: [
                { name: "TypeScript / React 19", stars: "★★★★☆" },
                { name: "C#", stars: "★★★★★" },
                { name: "VB6", stars: "★★★★☆" },
                { name: "JSP", stars: "★★★☆☆" }
            ]
        },
        {
            category: "Backend & Distributed System",
            icon: Server,
            items: [
                { name: "MySql", stars: "★★★★★" },
                { name: "Oracle", stars: "★★★☆☆" },
                { name: "Node.js", stars: "★★★☆☆" }
            ]
        },
        {
            category: "DevOps & Cloud Native",
            icon: CloudCog,
            items: [
                { name: "AWS", stars: "★★★☆☆" },
                { name: "Docker", stars: "★★☆☆☆" }
            ]
        }
    ] as SkillCategory[],
    projects: [
        {
            id: "proj-1",
            category: "(주) 케이비드",
            title: "정비마법사2",
            period: "",
            summary: "차량 및 오토바이 정비 윈도우 프로그램",
            details: [],
            techs: ["C#", "Mysql", "DevExpress"]
        },
        {
            id: "proj-2",
            category: "(주) 케이비드",
            title: "JUCHA 백엔드 API 작업",
            period: "",
            summary: "차량 및 오토바이 주차 관리 시스템",
            details: ["베트남 타겟"],
            techs: ["Node"]
        },
        {
            id: "proj-3",
            category: "(주) 케이비드",
            title: "대한자동차",
            period: "",
            summary: "자동차 부품 생산 프로그램",
            details: ["POP용, 사무실용, 대시보드용"],
            techs: ["C#", "Mysql", "DevExpress"]
        },
        {
            id: "proj-4",
            category: "(주) 케이비드",
            title: "탈라고 백엔드 API 작업",
            period: "",
            summary: "차량점검 프로그램",
            details: ["원격지 차량점검 및 차량 정비, 서비스 판매-구매 예약"],
            techs: ["Node"]
        },
        {
            id: "proj-5",
            category: "(주) 케이비드",
            title: "다이슈",
            period: "",
            summary: "비공개 채팅 솔루션(주식)",
            details: [],
            techs: ["Node"]
        },
        {
            id: "proj-6",
            category: "(주) 케이비드",
            title: "반반 백엔드 API 작업",
            period: "",
            summary: "소개팅 및 모임 앱",
            details: [],
            techs: ["Node"]
        },
        {
            id: "proj-7",
            category: "(주) 케이비드",
            title: "나스테크",
            period: "",
            summary: "자동차 생산 ERP 프로그램",
            details: [],
            techs: ["C#", "Mysql", "DevExpress", "Spread.net"]
        },
        {
            id: "proj-8",
            category: "(주) 케이비드",
            title: "LVMC",
            period: "",
            summary: "딜러 차량 인도 프로그램",
            details: [],
            techs: ["React", "AWS", "Mysql"]
        }
    ] as Project[],
    companyActivities: [
        {
            company: "(주) 케이비드",
            position: "C#, MySql, Visual Code, AWS, AI",
            period: "2020.08 ~ 현재 (재직 중)",
            badge: "Current",
            description: "정비/판매 솔루션 프로그램",
            activities: [
                "Visual Studio C#, MySql 활용 솔루션 프로그램 개발",
                "DevExpress Tool을 활용하여 UI 설계",
                "Visual Code, MySql, AWS 서버 활용 API 작업"
            ]
        },
        {
            company: "남경소프트",
            position: "C#, MySql",
            period: "2019.05 ~ 2020.02",
            badge: "Full-time",
            description: "솔루션 프로그램",
            activities: [
                "Visual Studio C#, MySql로 솔루션 프로그램 개발"
            ]
        },
        {
            company: "뉴원소프트",
            position: "Android Studio",
            period: "2019.02 ~ 2019.04",
            badge: "Full-time",
            description: "얼굴 인식 프로그램",
            activities: [
                "Android Studio와 OpenCV 기술을 활용하여 개발",
                "프로그램까지는 안나왔지만 OpenCV 기술에 대해 공부를 많이 하였습니다."
            ]
        },
        {
            company: "(주) 뉴빌텍",
            position: "C, Arduino",
            period: "2018.09 ~ 2018.12",
            badge: "Full-time",
            description: "IOT 개발 및 유지보수",
            activities: [
                "C언어와 아두이노 키트를 활용하여 무선통신 IOT 개발"
            ]
        },
        {
            company: "(주) 보람정보시스템",
            position: "Visual Basic, Oracle 8i, Oracle 11g",
            period: "2015.08 ~ 2017.10",
            badge: "Full-time",
            description: "철강 ERP 프로그램",
            activities: [
                "Visual Basic 6.0과 Oracle 8i 및 Oracle 11g 활용해서 Steelone이라는 철강 ERP 프로그램을 개발"
            ]
        }
    ] as CompanyActivity[],
    certifications: [
        {
            name: "정보기술자격(ITQ)",
            date: "2008.06.13"
        },
        {
            name: "정보기기운용기능사",
            date: "2008.07.21"
        },
        {
            name: "워드프로세서1급",
            date: "2008.10.10"
        },
        {
            name: "자동차운전면허 2종 보통",
            date: "2013.08.21"
        },
        {
            name: "정보처리산업기사",
            date: "2013.08.21"
        },
        {
            name: "PC정비사2급",
            date: "2013.09.10"
        }
    ],
    education: [
        {
            school: "안동과학대학교 컴퓨터정보과",
            period: "2009.03. ~ 2014.02.",
            degree: "(전문학사 졸업)"
        },
        {
            school: "학점은행제 - 글로벌이노에듀",
            period: "2022.11.09 ~ 2023.02.21",
            degree: "(학사 졸업)"
        }
    ],
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
        }
    ] as PortfolioDocument[]
};
