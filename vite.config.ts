import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// .env의 키(password, file_password, name, name_en, phone, email, address)를 접두사 없이 그대로 사용
// ('name' 접두사가 name_en도 포함)
const ENV_PREFIXES = ['password', 'file_password', 'name', 'phone', 'email', 'address'];

export default defineConfig({
    // 빌드 결과(dist/index.html)를 더블클릭(file://)으로도 열 수 있도록 JS·CSS를 한 파일에 인라인하고 상대 경로 사용
    base: './',
    plugins: [react(), tailwindcss(), viteSingleFile()],
    envPrefix: ENV_PREFIXES,
});
