/// <reference types="vite/client" />

// .env 키를 접두사 없이 노출 (vite.config.ts의 envPrefix 참고)
interface ImportMetaEnv {
    readonly password?: string;
    readonly file_password?: string;
    readonly name?: string;
    readonly name_en?: string;
    readonly phone?: string;
    readonly email?: string;
    readonly address?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
