// 鍵盤使用者：按 Tab 第一個就是「跳到主要內容」，不必穿過地圖上的幾百個點
export function SkipLink({ sel }: { sel: string }) {
  const go = () => {
    const box = document.querySelector<HTMLElement>(sel);
    const first = box?.querySelector<HTMLElement>('button, a[href], input, [tabindex]:not([tabindex="-1"])');
    (first ?? box)?.focus();
  };
  return <button type="button" className="skip-link" onClick={go}>跳到主要內容</button>;
}
