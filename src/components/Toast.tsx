import { Check } from 'lucide-react';

interface Props {
    message: string;
    visible: boolean;
}

// 클립보드 복사 및 알림 토스트
export default function Toast({ message, visible }: Props) {
    return (
        <div id="toast-box" className={`fixed bottom-6 right-6 z-50 ${visible ? 'flex' : 'hidden'} items-center gap-3 bg-brand-dark text-white px-4 py-3 rounded-xl shadow-xl border border-brand-sub/30`}>
            <div className="w-7 h-7 rounded-lg bg-brand-accent flex items-center justify-center text-white shrink-0">
                <Check className="w-4 h-4" />
            </div>
            <span id="toast-message" className="text-sm font-medium">{message}</span>
        </div>
    );
}
