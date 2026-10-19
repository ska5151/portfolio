import { useEffect, useRef, useState } from 'react';
import { LockOpen, ShieldAlert } from 'lucide-react';
import { checkPassword, env } from '../env';

interface Props {
    onUnlock: () => void;
}

// 최초 페이지 열람 암호 입력 게이트
export default function PageAuthGate({ onUnlock }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    // 초기 실행 시 암호 입력란에 포커스
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // 최초 페이지 열람 암호 확인
    const confirmPagePassword = () => {
        const message = checkPassword(value, env.password);
        if (message) {
            setError(message);
            inputRef.current?.focus();
            return;
        }
        setError(null);
        onUnlock();
    };

    return (
        <div id="page-auth-gate" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark p-4">
            <div className="bg-white rounded-2xl max-w-md w-full border-2 border-brand-dark shadow-2xl overflow-hidden animate-[fadeIn_0.25s_ease-out]">
                <div className="bg-brand-dark text-white px-6 py-4 flex items-center gap-3 border-b border-white/10">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-sub shrink-0">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-base">포트폴리오 열람 인증</h2>
                        <p className="text-xs text-brand-sub/80 font-mono">PROTECTED PORTFOLIO // <span>{env.nameEn.toUpperCase()}</span></p>
                    </div>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="page-password-input" className="block text-xs font-bold text-brand-dark">페이지를 열람하려면 암호를 입력해주세요.</label>
                        <input
                            id="page-password-input"
                            ref={inputRef}
                            type="password"
                            placeholder="열람 암호 입력"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') confirmPagePassword(); }}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-sub bg-brand-light text-brand-dark text-sm font-mono focus:outline-none focus:border-brand-accent"
                        />
                        <p id="page-password-error" className={`${error ? '' : 'hidden '}text-xs font-semibold text-red-500`}>{error ?? '암호가 올바르지 않습니다.'}</p>
                    </div>
                    <div className="flex items-center justify-end pt-2">
                        <button id="page-password-submit" onClick={confirmPagePassword} className="w-full px-5 py-2.5 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:opacity-95 transition flex items-center justify-center gap-2 shadow-md">
                            <LockOpen className="w-4 h-4" />
                            <span>포트폴리오 열기</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
