interface Props {
    number: string;
    title: string;
    meta: string;
}

// 넘버링 섹션 제목 (좌측 번호·제목, 우측 모노 메타 라벨)
export default function SectionHeading({ number, title, meta }: Props) {
    return (
        <div className="flex items-baseline justify-between border-b-2 border-brand-dark pb-2">
            <h2 className="text-2xl font-extrabold text-brand-dark tracking-tight">
                <span className="font-mono text-brand-accent mr-2">{number}</span>{title}
            </h2>
            <span className="font-mono text-xs text-brand-main">{meta}</span>
        </div>
    );
}
