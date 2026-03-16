(function initLottoTabs(global) {
    function createTabController(options) {
        const {
            tabButtons = [],
            tabPanels = [],
            tabLinks = [],
            defaultTab = 'dashboard',
            onWillChange = null,
            onDidChange = null,
            onLinkNavigate = null
        } = options || {};

        function resolveTabId(tabId) {
            if (!tabId) {
                return defaultTab;
            }
            const hasButton = tabButtons.some(button => button.dataset.tab === tabId);
            return hasButton ? tabId : defaultTab;
        }

        function setActiveTab(tabId, focusPanel, updateHash = true) {
            const resolvedTabId = resolveTabId(tabId);
            const targetPanelId = `tab-${resolvedTabId}`;
            const targetPanel = tabPanels.find(panel => panel.id === targetPanelId);
            if (!targetPanel) {
                return;
            }

            if (typeof onWillChange === 'function') {
                onWillChange(resolvedTabId);
            }

            tabButtons.forEach(button => {
                const isActive = button.dataset.tab === resolvedTabId;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-selected', String(isActive));
            });

            tabPanels.forEach(panel => {
                const isActive = panel.id === targetPanelId;
                panel.classList.toggle('is-active', isActive);
                panel.hidden = !isActive;
            });

            tabLinks.forEach(link => {
                link.classList.toggle('is-active', link.dataset.tabLink === resolvedTabId);
            });

            if (updateHash) {
                history.replaceState(null, '', `#${targetPanelId}`);
            }

            if (typeof onDidChange === 'function') {
                onDidChange({
                    tabId: resolvedTabId,
                    targetPanel,
                    focusPanel,
                    updateHash
                });
            }

            if (focusPanel) {
                targetPanel.focus({ preventScroll: true });
                targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        function syncInitialTab() {
            if (!tabButtons.length || !tabPanels.length) {
                return;
            }
            const hash = window.location.hash;
            if (hash && hash.startsWith('#tab-')) {
                setActiveTab(hash.replace('#tab-', ''), false, false);
                return;
            }
            setActiveTab(defaultTab, false, false);
        }

        function bind() {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    setActiveTab(button.dataset.tab, true);
                });
            });

            tabLinks.forEach(link => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    setActiveTab(link.dataset.tabLink, false);
                    if (typeof onLinkNavigate === 'function') {
                        onLinkNavigate(link.dataset.tabLink);
                    }
                });
            });
        }

        return {
            bind,
            setActiveTab,
            syncInitialTab
        };
    }

    global.LottoTabs = {
        createTabController
    };
})(window);
