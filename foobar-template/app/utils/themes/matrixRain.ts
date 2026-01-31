let animationId: ReturnType<typeof setInterval>;
let canvasRef: HTMLCanvasElement | null = null;
let ctxRef: CanvasRenderingContext2D | null = null;
let dropsRef: number[] = [];
let fontSizeRef = 32;

const resize = () => {
    if (!canvasRef) return;
    canvasRef.width = window.innerWidth;
    canvasRef.height = window.innerHeight;
    const columns = Math.floor(canvasRef.width / fontSizeRef);
    dropsRef = Array(columns).fill(1) as number[];
};

export async function initMatrixRain() {
    await wait(0.1);
    const canvas = document.getElementById('matrix') as HTMLCanvasElement;
    
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvasRef = canvas;
    ctxRef = ctx;
    fontSizeRef = 32;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const japaneseChars = 'ァィゥェォカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'.split('');
    const allChars = [...letters, ...japaneseChars];
    const themeStore = useThemeStore();

    const draw = () => {
        if (!ctxRef || !canvasRef) return;
        if (themeStore.selectedTheme.name == 'Matrix') {
            ctxRef.fillStyle = 'rgba(0, 0, 0, 0.1)';
        }
        ctxRef.fillRect(0, 0, canvasRef.width, canvasRef.height);
        ctxRef.fillStyle = '#0f0';
        ctxRef.font = `${fontSizeRef}px monospace`;

        for (let i = 0; i < dropsRef.length; i++) {
            const text = allChars[Math.floor(Math.random() * allChars.length)] || 'A';
            ctxRef.shadowColor = '#0f0';
            ctxRef.shadowBlur = 8;
            ctxRef.fillText(text, i * fontSizeRef, dropsRef[i]! * fontSizeRef);
            ctxRef.shadowBlur = 0;
            
            dropsRef[i]!++;
            if (dropsRef[i]! * fontSizeRef > canvasRef.height && Math.random() > 0.95) {
                dropsRef[i] = 0;
            }
        }
    };

    resize();
    animationId = setInterval(draw, 42);
    window.addEventListener('resize', resize);
}
export function stopMatrixRain() {
    clearInterval(animationId);
    window.removeEventListener('resize', resize);
}