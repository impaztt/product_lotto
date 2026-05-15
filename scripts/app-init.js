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
 *   - Initialize AdMob and expose a small `window.appAds` API so main.js
 *     can route ad calls through native AdMob instead of AdSense.
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

    /* ── AdMob test ad unit IDs (Google-published, safe to commit).
       Replace with real unit IDs before production release. ── */
    const AD_IDS = {
        banner: {
            ios: 'ca-app-pub-3940256099942544/2934735716',
            android: 'ca-app-pub-3940256099942544/6300978111',
        },
        interstitial: {
            ios: 'ca-app-pub-3940256099942544/4411468910',
            android: 'ca-app-pub-3940256099942544/1033173712',
        },
    };
    const adId = (type) => AD_IDS[type][platform] || AD_IDS[type].android;

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

    async function setupAdMob() {
        const admob = plugins.AdMob;
        if (!admob) return;
        try {
            await admob.initialize({
                requestTrackingAuthorization: true,
                initializeForTesting: true,
                testingDevices: [],
            });
        } catch (_) { /* offline or first-run hiccup — non-fatal */ }
    }

    let interstitialReady = false;
    let bannerVisible = false;

    async function prepareInterstitial() {
        const admob = plugins.AdMob;
        if (!admob || interstitialReady) return;
        try {
            await admob.prepareInterstitial({ adId: adId('interstitial'), isTesting: true });
            interstitialReady = true;
        } catch (_) { interstitialReady = false; }
    }

    async function showInterstitial() {
        const admob = plugins.AdMob;
        if (!admob) return;
        if (!interstitialReady) {
            await prepareInterstitial();
        }
        if (!interstitialReady) return;  // load failed → skip (user not blocked)
        try {
            await admob.showInterstitial();
        } catch (_) { /* dismissed/closed */ }
        interstitialReady = false;
        prepareInterstitial().catch(() => {});  // queue the next one
    }

    function applyBannerHeight(px) {
        if (typeof px !== 'number' || !Number.isFinite(px) || px <= 0) return;
        root.style.setProperty('--app-banner-h', px + 'px');
    }

    function logAdMob(...args) {
        try { console.log('[appAds]', ...args); } catch (_) {}
    }

    function measureSafeAreaTop() {
        // Read env(safe-area-inset-top) via a hidden probe element so we offset
        // the native banner below the status bar / Dynamic Island.
        const probe = document.createElement('div');
        probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:env(safe-area-inset-top);visibility:hidden;pointer-events:none;';
        document.documentElement.appendChild(probe);
        const h = probe.getBoundingClientRect().height;
        probe.remove();
        return Math.max(0, Math.round(h));
    }

    async function showBanner() {
        const admob = plugins.AdMob;
        if (!admob || bannerVisible) return;
        // Subscribe once so we can react to size changes / failures.
        if (!showBanner._bound && typeof admob.addListener === 'function') {
            showBanner._bound = true;
            admob.addListener('bannerViewSizeChanged', (info) => {
                const h = info?.height;
                applyBannerHeight(typeof h === 'number' ? h : Number(h));
            });
            admob.addListener('bannerViewLoaded', () => {
                logAdMob('banner loaded');
                bannerVisible = true;
                root.classList.add('has-app-banner');
            });
            admob.addListener('bannerViewFailedToLoad', (info) => {
                logAdMob('banner FAILED', info);
                bannerVisible = false;
                root.classList.remove('has-app-banner');
            });
            admob.addListener('bannerViewSizeChanged', (info) => {
                logAdMob('size changed', info);
            });
        }
        try {
            // Anchor banner at the very top of the screen, just below the iOS
            // status bar / Dynamic Island. The native AdMob view is drawn above
            // the WebView; we let the WebView content reflow under it via the
            // --app-banner-h custom property (plus --app-banner-top for the
            // safe-area offset). Offsetting by the sticky header instead caused
            // the banner to land inside the header's backdrop-filter area and
            // disappear visually.
            const safeTop = measureSafeAreaTop();
            root.style.setProperty('--app-banner-top', safeTop + 'px');
            logAdMob('showBanner', { position: 'TOP_CENTER', margin: safeTop });
            await admob.showBanner({
                adId: adId('banner'),
                adSize: 'ADAPTIVE_BANNER',
                position: 'TOP_CENTER',
                margin: safeTop,
                isTesting: true,
            });
            // Optimistic: most builds emit bannerViewLoaded too, but flip the
            // flag here so subsequent calls are idempotent even if no events fire.
            bannerVisible = true;
            root.classList.add('has-app-banner');
        } catch (_) { bannerVisible = false; }
    }

    // Re-anchor the banner when the header height changes (orientation /
    // dynamic header content). Debounced via rAF to avoid thrashing.
    let resyncRafId = 0;
    function resyncBannerPosition() {
        if (!bannerVisible) return;
        if (resyncRafId) cancelAnimationFrame(resyncRafId);
        resyncRafId = requestAnimationFrame(async () => {
            resyncRafId = 0;
            const admob = plugins.AdMob;
            if (!admob || !admob.showBanner) return;
            try {
                await admob.hideBanner();
            } catch (_) {}
            bannerVisible = false;
            await showBanner();
        });
    }
    window.addEventListener('resize', resyncBannerPosition);
    window.addEventListener('orientationchange', resyncBannerPosition);

    async function hideBanner() {
        const admob = plugins.AdMob;
        if (!admob) return;
        try { await admob.hideBanner(); } catch (_) {}
        bannerVisible = false;
        root.classList.remove('has-app-banner');
    }

    window.appAds = {
        isApp: true,
        platform,
        showBanner,
        hideBanner,
        showInterstitial,
        prepareInterstitial,
    };

    async function boot() {
        await setupStatusBar();
        setupBackButton();
        setupExternalLinks();
        await setupAdMob();
        // Pre-load first interstitial early so it's ready when user generates.
        prepareInterstitial().catch(() => {});
        // Give the web app a moment to render its first paint
        await waitFor(() => document.readyState === 'complete' || document.readyState === 'interactive');
        // Small extra delay so the first tab paint completes
        await new Promise((r) => setTimeout(r, 250));
        await hideSplash();
        // Show banner after first paint so measureHeaderHeight() returns a real
        // value (the banner is anchored just below the sticky site-header).
        showBanner().catch(() => {});
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot, { once: true });
    } else {
        boot();
    }
})();
