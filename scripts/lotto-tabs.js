(function initLottoTabs(global) {
    const TAB_BUTTON_DRAG_THRESHOLD_PX = 10;
    const TAB_BUTTON_CLICK_SUPPRESS_MS = 240;

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
            setActiveTab(defaultTab, false, true);
        }

        function bind() {
            tabButtons.forEach(button => {
                let pointerState = null;
                let suppressClickUntil = 0;

                const suppressDraggedClick = () => {
                    suppressClickUntil = Date.now() + TAB_BUTTON_CLICK_SUPPRESS_MS;
                };

                const clearPointerState = pointerId => {
                    if (!pointerState) {
                        return;
                    }
                    if (pointerId == null || pointerState.pointerId === pointerId) {
                        pointerState = null;
                    }
                };

                button.addEventListener('pointerdown', event => {
                    if (event.pointerType === 'mouse' && event.button !== 0) {
                        return;
                    }
                    pointerState = {
                        pointerId: event.pointerId,
                        startX: event.clientX,
                        startY: event.clientY
                    };
                });

                button.addEventListener('pointermove', event => {
                    if (!pointerState || event.pointerId !== pointerState.pointerId) {
                        return;
                    }
                    const deltaX = Math.abs(event.clientX - pointerState.startX);
                    const deltaY = Math.abs(event.clientY - pointerState.startY);
                    if (deltaX < TAB_BUTTON_DRAG_THRESHOLD_PX && deltaY < TAB_BUTTON_DRAG_THRESHOLD_PX) {
                        return;
                    }
                    suppressDraggedClick();
                    clearPointerState(event.pointerId);
                });

                button.addEventListener('pointerup', event => {
                    clearPointerState(event.pointerId);
                });

                button.addEventListener('pointercancel', event => {
                    suppressDraggedClick();
                    clearPointerState(event.pointerId);
                });

                // Ignore drag gestures on the tab bar so vertical swipes do not switch tabs.
                button.addEventListener('click', event => {
                    if (Date.now() < suppressClickUntil) {
                        event.preventDefault();
                        event.stopPropagation();
                        return;
                    }
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
