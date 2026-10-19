import { useCallback, useEffect, useRef, useState } from 'react';
import { env } from './env';
import { portfolioData, type PortfolioDocument } from './data/portfolio';
import PageAuthGate from './components/PageAuthGate';
import EditorialTemplate from './components/EditorialTemplate';
import DocModal from './components/DocModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
    const [unlocked, setUnlocked] = useState(false);
    const [currentDoc, setCurrentDoc] = useState<PortfolioDocument | null>(null);
    const [toast, setToast] = useState({ message: '클립보드에 복사되었습니다.', visible: false });
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // .env의 이름 값을 문서 제목에 반영
    useEffect(() => {
        document.title = env.displayName
            ? `${env.displayName} — 에디토리얼 미니멀 포트폴리오`
            : '에디토리얼 미니멀 포트폴리오';
    }, []);

    useEffect(() => () => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
    }, []);

    // 토스트 메시지 표시
    const showToast = useCallback((message: string) => {
        setToast({ message, visible: true });
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => {
            setToast(prev => ({ ...prev, visible: false }));
        }, 2600);
    }, []);

    // 클립보드 복사 함수 (iframe 환경 호환)
    const copyText = useCallback((text: string, label: string) => {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
            document.execCommand('copy');
            showToast(`${label} (${text}) 복사 완료!`);
        } catch {
            showToast(`복사 실패: 직접 선택해 주세요.`);
        }
        document.body.removeChild(tempInput);
    }, [showToast]);

    // 첨부 문서 암호 입력 모달 열기
    const openDocModal = useCallback((docId: string) => {
        const doc = portfolioData.documents.find(d => d.id === docId);
        if (doc) setCurrentDoc(doc);
    }, []);

    const handleDownloaded = useCallback((doc: PortfolioDocument) => {
        setCurrentDoc(null);
        showToast(`'${doc.title}' 다운로드가 시작되었습니다.`);
    }, [showToast]);

    return (
        <>
            {/* 최초 페이지 열람 암호 입력 게이트 */}
            {!unlocked && <PageAuthGate onUnlock={() => setUnlocked(true)} />}

            {/* 메인 템플릿 렌더링 영역 */}
            <main id="template-viewport" className={`flex-1${unlocked ? '' : ' hidden'}`}>
                {unlocked && <EditorialTemplate onCopy={copyText} onOpenDoc={openDocModal} />}
            </main>

            {/* 첨부 문서 암호 입력 모달 */}
            {currentDoc && (
                <DocModal
                    key={currentDoc.id}
                    doc={currentDoc}
                    onClose={() => setCurrentDoc(null)}
                    onDownloaded={handleDownloaded}
                />
            )}

            {/* 클립보드 복사 및 알림 토스트 */}
            <Toast message={toast.message} visible={toast.visible} />

            {/* 하단 공통 푸터 */}
            {unlocked && <Footer />}
        </>
    );
}
