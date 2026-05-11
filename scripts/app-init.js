/**
 * Runs inside the WebView when packaged as a native app via Capacitor.
 * Safe to load in the browser too — guards on `window.Capacitor`.
 *
 * Responsibilities:
 *   - Tag the document so CSS can scope native-only adjustments.
 *   - Hide the native splash screen once the page is interactive.
 *   - Configure status bar to overlay the WebView (modern app feel).
 *   - Route Android hardware back button to logical navigation.
 *   - Send external http(s) links to the in-app browser instead of
 *     navigating away from the WebView.
 */
(function () {
    if (typeof window === 'undefined') return;
    const Cap = window.Capacitor;
    if (!Cap || typeof Cap.isNativePlatform !== 'function' || !Cap.isNativePlatform()) {
        return;
    }
    const platform = typeof Cap.getPlatform === 'function' ? Cap.getPlatform() : '';
    const root = document.documentElement;
    root.classList.add('is-app');
    if (platform) root.classList.add('is-app-' + platform);

    const plugins = Cap.Plugins || {};

    async function setupStatusBar() {
        const sb = plugins.StatusBar;
        if (!sb) return;
        try {
            await sb.setOverlaysWebView({ overlay: true });
            await sb.setStyle({ style: 'DEFAULT' });
        } catch (_) { /* no-op */ }
    }

    async function hideSplash() {
        const splash = plugins.SplashScreen;
        if (!splash) return;
        try { await splash.hide({ fadeOutDuration: 200 }); } catch (_) { /* no-op */ }
    }

    function setupBackButton() {
        const app = plugins.App;
        if (!app || typeof app.addListener !== 'function') return;
        app.addListener('backButton', ({ canGoBack }) => {
            // Close any open modal first
            const openModal = document.querySelector('.modal.is-open, .ad-interstitial:not([hidden]), #mobile-menu[aria-hidden="false"]');
            if (openModal) {
                const closer = openModal.querySelector('[data-modal-close], .modal-close, .sheet-close, #ad-interstitial-close:not([disabled])');
                if (closer) { closer.click(); return; }
            }
            // Fallback: history back, else minimize app
            if (canGoBack) {
                window.history.back();
            } else if (typeof app.minimizeApp === 'function') {
                app.minimizeApp().catch(() => {});
            }
        });
    }

    function setupExternalLinks() {
        const browser = plugins.Browser;
        if (!browser) return;
        document.addEventListener('click', (event) => {
            const anchor = event.target?.closest?.('a[href]');
            if (!anchor) return;
            const href = anchor.getAttribute('href') || '';
            if (!/^https?:\/\//i.test(href)) return;
            // Skip same-origin links (handled by SPA navigation)
            try {
                const u = new URL(href, window.location.href);
                if (u.origin === window.location.origin) return;
            } catch (_) { return; }
            event.preventDefault();
            browser.open({ url: href, presentationStyle: 'popover' }).catch(() => {
                window.open(href, '_blank');
            });
        }, true);
    }

    function waitFor(condition, timeoutMs = 6000) {
        return new Promise((resolve) => {
            if (condition()) return resolve(true);
            const started = Date.now();
            const id = setInterval(() => {
                if (condition() || Date.now() - started > timeoutMs) {
                    clearInterval(id);
                    resolve(condition());
                }
            }, 50);
        });
    }

    async function boot() {
        await setupStatusBar();
        setupBackButton();
        setupExternalLinks();
        // Give the web app a moment to render its first paint
        await waitFor(() => document.readyState === 'complete' || document.readyState === 'interactive');
        // Small extra delay so the first tab paint completes
        await new Promise((r) => setTimeout(r, 250));
        await hideSplash();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
