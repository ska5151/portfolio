// 암호·개인정보는 소스에 두지 않고 .env(import.meta.env)에서만 읽음
// 값이 없거나 문자열이 아니면 '' 로 정규화
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const name = str(import.meta.env.name);
const nameEn = str(import.meta.env.name_en);

export const env = {
    password: str(import.meta.env.password),
    filePassword: str(import.meta.env.file_password),
    name,
    nameEn,
    // 화면 표시용 이름: "이름 (영문이름)", 하나만 있으면 그 값
    displayName: name && nameEn ? `${name} (${nameEn})` : (name || nameEn),
    phone: str(import.meta.env.phone),
    email: str(import.meta.env.email),
    address: str(import.meta.env.address),
};

// 암호 검증 결과 메시지 (통과 시 null)
// .env를 불러오지 못해 기대 암호가 비어 있으면 항상 거부
export function checkPassword(input: string, expected: string): string | null {
    if (!expected) return '설정을 불러오지 못했습니다. .env 파일을 확인한 뒤 다시 빌드/실행해주세요.';
    if (input.trim() !== expected) return '암호가 올바르지 않습니다.';
    return null;
}
