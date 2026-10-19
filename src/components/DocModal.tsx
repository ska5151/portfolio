import { useEffect, useRef, useState } from 'react';
import { Download, Lock, X } from 'lucide-react';
import { checkPassword, env } from '../env';
import type { PortfolioDocument } from '../data/portfolio';

interface Props {
    doc: PortfolioDocument;
    onClose: () => void;
    onDownloaded: (doc: PortfolioDocument) => void;
}

// 첨부 문서 암호 입력 모달 (열릴 때마다 새로 마운트되어 입력값·에러가 초기화됨)
export default function DocModal({ doc, onClose, onDownloaded }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => inputRef.current?.focus(), 50);
        return () => clearTimeout(timer);
    }, []);

    // 암호 확인 후 실제 문서 파일 다운로드
    const confirmDocDownload = () => {
        const message = checkPassword(value, env.filePassword);
        if (message) {
            setError(message);
            inputRef.current?.focus();
            return;
        }

        setError(null);
        const a = document.createElement('a');
        a.href = doc.filePath;
        a.download = doc.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        onDownloaded(doc);
    };

    return (
        <div id="doc-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/75 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl max-w-md w-full border border-brand-sub shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
                <div className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-brand-accent/20 border border-brand-accent flex items-center justify-center text-brand-sub">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 id="modal-doc-title" className="font-bold text-base">{doc.title}</h3>
                            <p id="modal-doc-meta" className="text-xs text-brand-sub/80 font-mono">{`${doc.filename} · ${doc.format}`}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="doc-password-input" className="block text-xs font-bold text-brand-dark">다운로드 암호를 입력해주세요.</label>
                        <input
                            id="doc-password-input"
                            ref={inputRef}
                            type="password"
                            placeholder="암호 입력"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') confirmDocDownload(); }}
                            className="w-full px-4 py-2.5 rounded-xl border border-brand-sub bg-brand-light text-brand-dark text-sm font-mono focus:outline-none focus:border-brand-accent"
                        />
                        <p id="doc-password-error" className={`${error ? '' : 'hidden '}text-xs font-semibold text-red-500`}>{error ?? '암호가 올바르지 않습니다.'}</p>
                    </div>
                    <div className="flex items-center justify-end gap-2.5 pt-2">
                        <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-brand-main/40 text-brand-dark text-sm font-semibold hover:bg-brand-light transition">
                            닫기
                        </button>
                        <button id="doc-password-submit" onClick={confirmDocDownload} className="px-5 py-2.5 rounded-xl bg-brand-accent text-white text-sm font-semibold hover:opacity-95 transition flex items-center gap-2 shadow-md">
                            <Download className="w-4 h-4" />
                            <span>다운로드</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
