import { env } from '../env';

// 하단 공통 푸터
export default function Footer() {
    return (
        <footer id="page-footer" className="bg-brand-dark text-white/80 border-t border-white/10 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent"></span>
                    <span className="font-semibold text-white"><span>{env.displayName}</span> — Developer Portfolio</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-[11px] text-brand-sub">
                    <span>#6A89A7</span>
                    <span>#BDDDFC</span>
                    <span>#888DF2</span>
                    <span>#384959</span>
                </div>
            </div>
        </footer>
    );
}
