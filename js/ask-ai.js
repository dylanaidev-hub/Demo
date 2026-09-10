const AskAI = (() => {
  const ICON = {
    chatgpt: `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="12" fill="#10A37F"/><path fill="#fff" d="M8.2 8.4c.9-1.6 2.9-2.2 4.5-1.4l.3.2c.4-.3.9-.5 1.5-.5 1.4 0 2.5 1.1 2.5 2.5 0 .2 0 .4-.1.6 1.2.5 1.9 1.8 1.6 3.1-.3 1.2-1.4 2-2.7 2h-.3c-.2 1.2-1.3 2.1-2.6 2.1-.5 0-1-.1-1.4-.4l-.3.2c-1.6.8-3.6.2-4.5-1.4-.3-.6-.4-1.2-.3-1.8-1-.7-1.3-2-.8-3.1.5-1 1.6-1.6 2.7-1.5.2-.6.6-1.1 1.2-1.4zm1.4 1.2c-.4.2-.6.6-.6 1.1v.4l-.4.1c-.6.1-1.1.6-1.2 1.2-.1.7.3 1.3.9 1.5l.3.1v.4c0 .6.3 1.1.8 1.4.8.4 1.8.1 2.3-.6l.2-.3.4.1c.3.1.6.2.9.2.7 0 1.3-.5 1.4-1.2l.1-.4.4-.1c.7-.1 1.2-.7 1.1-1.4-.1-.6-.6-1-1.2-1.1l-.4-.1v-.4c0-.8-.6-1.4-1.4-1.4-.3 0-.6.1-.9.2l-.4.2-.2-.3c-.4-.8-1.4-1.1-2.2-.7z"/></svg>`,
    gemini: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#1A73E8" d="M12 2.2 13.7 8.3 19.8 10 13.7 11.7 12 17.8 10.3 11.7 4.2 10 10.3 8.3z"/><path fill="#EA4335" d="M18.2 3.4 18.9 6.1 21.6 6.8 18.9 7.5 18.2 10.2 17.5 7.5 16.2 6.8 17.5 6.1z"/><path fill="#FBBC05" d="M19.4 13.6 19.9 15.6 22 16.2 19.9 16.8 19.4 18.8 18.9 16.8 16.8 16.2 18.9 15.6z"/><path fill="#34A853" d="M6.4 14.2 7.1 16.4 9.3 17.1 7.1 17.8 6.4 20 5.7 17.8 3.5 17.1 5.7 16.4z"/></svg>`,
  };

  const PROVIDERS = [
    { id: "chatgpt", name: "ChatGPT", icon: ICON.chatgpt, chatPlaceholder: "Message ChatGPT...", status: "ready", available: true },
    { id: "gemini", name: "Gemini", icon: ICON.gemini, chatPlaceholder: "Message Gemini...", status: "ready", available: true },
  ];

  const QUICK_ACTIONS = [
    { id: "summarize", label: "Summarize", menuLabel: "Summarize page", prompt: "Summarize this page" },
    { id: "explain", label: "Explain", menuLabel: "Explain page", prompt: "Explain this page" },
    { id: "translate", label: "Translate", menuLabel: "Translate page", prompt: "Translate this page to English" },
    { id: "keypoints", label: "Key points", menuLabel: "Key points", prompt: "List the key points of this page" },
  ];

  const panel = {
    open: false,
    focusedChat: null,
    getPage: () => null,
    getSelection: () => "",
  };

  const overlay = {
    prompt: "",
    selectedProviders: ["chatgpt"],
    selectedSuggestedPrompt: "",
  };

  const providers = {};

  function emptyProviderState() {
    return {
      isOpened: false,
      isPopupOpen: false,
      minimized: false,
      conversationId: null,
      messages: [],
      draft: "",
      isLoading: false,
      error: "",
      scroll: 0,
    };
  }

  const $ = (id) => document.getElementById(id);

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function providerById(id) {
    return PROVIDERS.find((p) => p.id === id);
  }

  function ensureProvider(id) {
    if (!providers[id]) providers[id] = emptyProviderState();
    return providers[id];
  }

  function overlayTargets() {
    return overlay.selectedProviders
      .map(providerById)
      .filter((p) => p && p.available && p.status !== "unavailable");
  }

  function canAsk() {
    return Boolean(overlay.prompt.trim()) && overlayTargets().length > 0;
  }

  function openedProviders() {
    return PROVIDERS.filter((p) => ensureProvider(p.id).isOpened);
  }

  function popupEl(id) {
    return document.querySelector(`.chat-popup[data-provider="${id}"]`);
  }

  function pageSummary(page) {
    const key = page?.pageKey;
    const summaries = {
      chinhtri: `Bài VnExpress (Chính trị): Quốc hội thông qua nghị quyết cải cách thể chế kinh tế 2026–2030.\n\n• Cắt giảm thủ tục hành chính trước quý II/2027.\n• Phân cấp đầu tư, đất đai, cấp phép xây dựng.\n• Luật hóa kinh tế số, dữ liệu và AI.\n• Quốc hội giám sát chuyên đề cuối 2027.`,
      vanhoa: `Bài VnExpress (Văn hóa): Festival Huế 2026 khai mạc bằng đêm nhã nhạc cung đình trên sông Hương.\n\n• Sân khấu nổi ~200 mét, chủ đề “Di sản sống”.\n• Nhã nhạc UNESCO, áo dài triều Nguyễn, ẩm thực cố đô.\n• Diễn ra đến 16/9, hơn 40 chương trình, ~180.000 lượt khách.`,
      thethao: `Bài VnExpress (Thể thao): Việt Nam thắng Thái Lan 2-0 tại Mỹ Đình.\n\n• Phút 28: Tiến Linh mở tỷ số (kiến tạo Văn Hậu).\n• Phút 71: Tuấn Hải ấn định 2-0.\n• Việt Nam 13 điểm / 5 trận, dẫn đầu; Thái Lan 10 điểm.`,
      youtube: `Trang chủ YouTube với các video đề xuất: highlights Việt Nam 2-0 Thái Lan, Festival Huế, phiên họp Quốc hội, ẩm thực Huế.`,
      wiki: `Google Chrome (2008): Omnibox, đa tiến trình, V8. Side panel mở bên phải và thu hẹp nội dung trang. Dựa trên Chromium.`,
      ntp: `Đây là Thẻ mới của Chrome — chưa có bài viết để tóm tắt.`,
    };
    if (summaries[key]) return summaries[key];
    if (key === "search") return `Trang kết quả Google cho “${page.query || page.display}”.`;
    if (page) return `Trang đang mở: ${page.title} (${page.display || page.url}).`;
    return "Không đọc được trang hiện tại.";
  }

  function secondBullet(text) {
    const lines = String(text).split("\n").filter((l) => l.trim().startsWith("•"));
    return lines[1] || lines[0] || text.split("\n").filter(Boolean)[1] || text;
  }

  function sendMessage(provider, prompt, page, history) {
    const q = prompt.toLowerCase();
    const title = page?.title || "trang hiện tại";
    const base = pageSummary(page);
    const prior = [...history].reverse().find((m) => m.role === "ai");
    const isFollowUp = history.some((m) => m.role === "ai");
    const selectionMatch = prompt.match(/selection:\s*\n\s*"([\s\S]+)"/i);

    let body;
    if (selectionMatch) {
      const snippet = selectionMatch[1];
      if (/translate/i.test(prompt)) body = `English gist of the selected text:\n\n${snippet}`;
      else if (/rewrite/i.test(prompt)) body = `Rewritten selection:\n\n${snippet}`;
      else body = `About the selected text on “${title}”:\n\n${snippet}\n\n${base}`;
    } else if (isFollowUp && prior && !/summarize this page|explain this page|translate this page|key points of this page/i.test(prompt)) {
      if (/point 2|điểm 2|second/.test(q)) {
        body = `Điểm 2 trong câu trả lời trước:\n\n${secondBullet(prior.text)}\n\nBạn muốn mình đi sâu hơn điểm này không?`;
      } else if (/simpler|đơn giản/.test(q)) {
        body = `Nói ngắn gọn hơn:\n\n${prior.text.split("\n").slice(0, 6).join("\n")}`;
      } else if (/example|ví dụ/.test(q)) {
        body = `Ví dụ liên quan đến “${title}”:\n\n${prior.text}\n\nBạn có thể hỏi thêm nếu muốn đi sâu một ví dụ.`;
      } else if (/more|chi tiết|explain|giải thích/.test(q)) {
        body = `Mở rộng theo “${prompt}”:\n\n${prior.text}\n\nNội dung này gắn với “${title}”.`;
      } else {
        const clip = prior.text.length > 280 ? `${prior.text.slice(0, 280)}…` : prior.text;
        body = `Tiếp tục cuộc trò chuyện.\n\nBạn hỏi: “${prompt}”\n\nDựa trên câu trả lời trước:\n${clip}`;
      }
    } else if (q.includes("summarize") || q.includes("tóm tắt") || q.includes("key point")) {
      body = base;
    } else if (q.includes("explain") || q.includes("giải thích")) {
      body = `Trang này là “${title}”.\n\n${base}`;
    } else if (q.includes("translate")) {
      body = `English gist of “${title}”:\n\n${base}`;
    } else {
      body = `Về “${prompt}”, đang xem “${title}”.\n\n${base}`;
    }

    if (provider.id === "gemini") return `Gemini:\n\n${body}`;
    return body;
  }

  function dispatch(provider, prompt) {
    const slot = ensureProvider(provider.id);
    slot.isLoading = true;
    slot.error = "";
    const page = panel.getPage ? panel.getPage() : null;
    const history = slot.messages.slice();
    const delay = 550 + Math.random() * 500;
    window.setTimeout(() => {
      slot.isLoading = false;
      if (!provider.available || provider.status === "unavailable") {
        slot.error = `${provider.name} is unavailable.`;
      } else {
        try {
          const fn = provider.sendMessage || sendMessage;
          slot.messages.push({ role: "ai", text: fn(provider, prompt, page, history) });
        } catch {
          slot.error = `${provider.name} failed to respond.`;
        }
      }
      ChatPopups.renderMessages(provider.id, { stickToBottom: true });
      ChatPopups.syncHeader(provider.id);
      ChatPopups.updateComposer(provider.id);
      OpenChats.render();
    }, delay);
  }

  function sendToProviders(prompt, providerIds, source) {
    const text = (prompt || "").trim();
    const targets = providerIds
      .map(providerById)
      .filter((p) => p && p.available && p.status !== "unavailable" && !ensureProvider(p.id).isLoading);
    if (!text || !targets.length) return false;

    targets.forEach((p) => {
      const slot = ensureProvider(p.id);
      slot.isOpened = true;
      slot.isPopupOpen = true;
      slot.minimized = false;
      if (!slot.conversationId) slot.conversationId = Date.now();
      slot.messages.push({ role: "user", text, source });
      slot.error = "";
      dispatch(p, text);
    });

    overlay.prompt = "";
    overlay.selectedSuggestedPrompt = "";
    overlay.selectedProviders = [targets[0].id];
    const homeInput = $("askPrompt");
    if (homeInput) homeInput.value = "";
    panel.focusedChat = targets[0].id;
    ChatPopups.sync();
    targets.forEach((p) => ChatPopups.renderMessages(p.id, { stickToBottom: true }));
    const dock = $("messengerDock");
    const top = popupEl(targets[0].id);
    if (dock && top) dock.appendChild(top);
    AskAIComposer.render();
    OpenChats.render();
    ChatPopups.focusInput(targets[0].id);
    return true;
  }

  function messageHtml(id) {
    const p = providerById(id);
    const slot = ensureProvider(id);
    if (!p) return "";
    if (!slot.messages.length && !slot.isLoading) {
      return `<div class="provider-empty">Say hi to ${escapeHtml(p.name)}</div>`;
    }
    let html = slot.messages.map((m) => {
      if (m.role === "user") {
        return `<div class="msg user"><div class="bubble">${escapeHtml(m.text)}</div></div>`;
      }
      return `<div class="msg ai"><div class="msg-avatar ${id}">${p.icon}</div><div class="msg-col"><div class="bubble">${escapeHtml(m.text)}</div></div></div>`;
    }).join("");
    if (slot.isLoading) {
      html += `<div class="msg ai"><div class="msg-avatar ${id}">${p.icon}</div><div class="msg-col"><div class="bubble typing"><span></span><span></span><span></span></div></div></div>`;
    }
    if (slot.error) html += `<div class="provider-error">${escapeHtml(slot.error)}</div>`;
    return html;
  }

  /* ---- ChatPopups (Messenger-style windows) ---- */
  const ChatPopups = {
    template(p) {
      return `<header class="chat-popup-head">
          <div class="chat-popup-person">
            <span class="chat-popup-avatar ${p.id}">${p.icon}</span>
            <div class="chat-popup-name">${escapeHtml(p.name)}</div>
          </div>
          <button type="button" class="chat-popup-btn" data-min title="Minimize" aria-label="Minimize">–</button>
          <button type="button" class="chat-popup-btn" data-close title="Close" aria-label="Close">×</button>
        </header>
        <div class="chat-popup-body">
          <div class="popup-chat"></div>
          <div class="provider-compose">
            <form class="provider-box popup-form">
              <textarea class="popup-draft" rows="1" maxlength="2000" placeholder="${escapeHtml(p.chatPlaceholder)}"></textarea>
              <button type="submit" class="provider-send" title="Send" disabled>
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M3.4 20.6 21.2 12 3.4 3.4 3.3 10.1 15.5 12 3.3 13.9z"/></svg>
              </button>
            </form>
          </div>
        </div>`;
    },
    ensure(id) {
      const dock = $("messengerDock");
      const p = providerById(id);
      if (!dock || !p) return null;
      let el = popupEl(id);
      if (el) return el;
      el = document.createElement("section");
      el.className = "chat-popup";
      el.dataset.provider = id;
      el.innerHTML = ChatPopups.template(p);
      dock.appendChild(el);
      requestAnimationFrame(() => el.classList.add("open"));
      return el;
    },
    syncHeader(id) {
      const el = popupEl(id);
      if (!el) return;
      el.classList.toggle("minimized", ensureProvider(id).minimized);
      el.classList.toggle("focused", panel.focusedChat === id);
    },
    renderMessages(id, { stickToBottom = false } = {}) {
      const el = popupEl(id);
      if (!el) return;
      const chat = el.querySelector(".popup-chat");
      const slot = ensureProvider(id);
      if (!chat) return;
      chat.innerHTML = messageHtml(id);
      if (stickToBottom || slot.isLoading) chat.scrollTop = chat.scrollHeight;
      else chat.scrollTop = slot.scroll || 0;
    },
    updateComposer(id) {
      const el = popupEl(id);
      const p = providerById(id);
      const slot = ensureProvider(id);
      if (!el || !p) return;
      const input = el.querySelector(".popup-draft");
      const send = el.querySelector(".provider-send");
      if (input && document.activeElement !== input && input.value !== slot.draft) {
        input.value = slot.draft;
      }
      const canSend = Boolean((input ? input.value : slot.draft).trim()) && !slot.isLoading && p.available;
      if (send) send.disabled = !canSend;
      if (input) {
        input.style.height = "auto";
        input.style.height = `${Math.min(input.scrollHeight, 72)}px`;
      }
    },
    sync() {
      PROVIDERS.forEach((p) => {
        const slot = ensureProvider(p.id);
        if (slot.isOpened && slot.isPopupOpen) {
          ChatPopups.ensure(p.id);
          ChatPopups.syncHeader(p.id);
          ChatPopups.updateComposer(p.id);
        } else {
          popupEl(p.id)?.remove();
        }
      });
    },
    open(id) {
      const slot = ensureProvider(id);
      if (!slot.isOpened) return;
      slot.isPopupOpen = true;
      slot.minimized = false;
      panel.focusedChat = id;
      const el = ChatPopups.ensure(id);
      const dock = $("messengerDock");
      if (el && dock) dock.appendChild(el);
      ChatPopups.syncHeader(id);
      ChatPopups.renderMessages(id);
      ChatPopups.updateComposer(id);
      ChatPopups.focusInput(id);
    },
    close(id) {
      const slot = ensureProvider(id);
      const el = popupEl(id);
      if (el) slot.scroll = el.querySelector(".popup-chat")?.scrollTop || 0;
      slot.isPopupOpen = false;
      slot.minimized = false;
      if (panel.focusedChat === id) panel.focusedChat = null;
      ChatPopups.sync();
      OpenChats.render();
    },
    toggleMin(id) {
      const slot = ensureProvider(id);
      slot.minimized = !slot.minimized;
      if (!slot.minimized) panel.focusedChat = id;
      ChatPopups.syncHeader(id);
    },
    focusInput(id) {
      const input = popupEl(id)?.querySelector(".popup-draft");
      input?.focus();
    },
    submit(id) {
      const p = providerById(id);
      const slot = ensureProvider(id);
      const el = popupEl(id);
      const input = el?.querySelector(".popup-draft");
      const text = (input ? input.value : slot.draft).trim();
      if (!p || !text || slot.isLoading || !p.available) return;
      slot.draft = "";
      if (input) input.value = "";
      slot.messages.push({ role: "user", text, source: "provider" });
      slot.error = "";
      dispatch(p, text);
      ChatPopups.renderMessages(id, { stickToBottom: true });
      ChatPopups.updateComposer(id);
      ChatPopups.syncHeader(id);
    },
  };

  /* ---- OpenChats (reopen from Ask AI panel) ---- */
  const OpenChats = {
    render() {
      const row = $("openChats");
      if (!row) return;
      const opened = openedProviders();
      if (!opened.length) {
        row.hidden = true;
        row.innerHTML = "";
        return;
      }
      row.hidden = false;
      row.innerHTML = `<div class="composer-label">Chats</div><div class="ask-with">`
        + opened.map((p) => {
          const slot = ensureProvider(p.id);
          const on = slot.isPopupOpen && !slot.minimized ? "selected" : "";
          return `<button type="button" class="ask-with-chip ${on}" data-open-chat="${p.id}">
            <span class="provider-tab-icon">${p.icon}</span>${escapeHtml(p.name)}
          </button>`;
        }).join("")
        + `</div>`;
    },
  };

  /* ---- AskAISidePanel ---- */
  const AskAISidePanel = {
    render() {
      const el = $("sidePanel");
      const askBtn = $("askAiBtn");
      if (el) el.hidden = !panel.open;
      if (askBtn) {
        askBtn.classList.toggle("active", panel.open);
        askBtn.setAttribute("aria-pressed", String(panel.open));
      }
      AskAIComposer.render();
      OpenChats.render();
      ChatPopups.sync();
    },
    setOpen(open) {
      panel.open = open;
      AskAISidePanel.render();
      if (open) $("askPrompt")?.focus();
    },
    toggle() {
      AskAISidePanel.setOpen(!panel.open);
    },
  };

  /* ---- ProviderSelector ---- */
  const ProviderSelector = {
    render() {
      const wrap = $("homeProviderSelector");
      if (!wrap) return;
      wrap.innerHTML = PROVIDERS.map((p) => {
        const on = overlay.selectedProviders.includes(p.id);
        const unavailable = !p.available || p.status === "unavailable";
        return `<button type="button" class="ask-with-chip ${on ? "selected" : ""} ${unavailable ? "unavailable" : ""}"
          data-provider="${p.id}" ${unavailable ? "disabled" : ""}>
          <span class="ask-check">${on ? "✓" : ""}</span>
          <span class="provider-tab-icon">${p.icon}</span>
          ${escapeHtml(p.name)}
        </button>`;
      }).join("");
    },
  };

  function renderSuggestionRow() {
    const row = $("homeSuggestions");
    if (!row) return;
    row.innerHTML = QUICK_ACTIONS.map((s) => {
      const on = overlay.selectedSuggestedPrompt === s.id || overlay.prompt === s.prompt ? "active" : "";
      return `<button type="button" class="suggest-chip ${on}" data-id="${s.id}">${escapeHtml(s.label)}</button>`;
    }).join("");
  }

  const AskAIComposer = {
    render() {
      const view = $("homeView");
      if (view) view.hidden = false;
      const input = $("askPrompt");
      if (input && input.value !== overlay.prompt) input.value = overlay.prompt;
      renderSuggestionRow();
      ProviderSelector.render();
      AskAIComposer.updateCta();
    },
    updateCta() {
      const btn = $("askCta");
      if (!btn) return;
      const n = overlayTargets().length;
      btn.disabled = !canAsk();
      btn.textContent = n <= 1 ? "Ask →" : `Ask ${n} AIs →`;
    },
    submit() {
      sendToProviders(overlay.prompt, overlay.selectedProviders, "ask-ai");
    },
  };

  function bind() {
    $("closePanelBtn")?.addEventListener("click", () => AskAISidePanel.setOpen(false));
    $("askCta")?.addEventListener("click", () => AskAIComposer.submit());
    $("askPrompt")?.addEventListener("input", (e) => {
      overlay.prompt = e.target.value;
      if (overlay.selectedSuggestedPrompt) {
        const item = QUICK_ACTIONS.find((s) => s.id === overlay.selectedSuggestedPrompt);
        if (!item || e.target.value !== item.prompt) overlay.selectedSuggestedPrompt = "";
      }
      AskAIComposer.updateCta();
      renderSuggestionRow();
    });
    $("askPrompt")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        AskAIComposer.submit();
      }
    });
    $("homeSuggestions")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-id]");
      if (!btn) return;
      const item = QUICK_ACTIONS.find((s) => s.id === btn.dataset.id);
      if (!item) return;
      overlay.prompt = item.prompt;
      overlay.selectedSuggestedPrompt = item.id;
      const input = $("askPrompt");
      if (input) {
        input.value = item.prompt;
        input.focus();
        input.setSelectionRange(item.prompt.length, item.prompt.length);
      }
      AskAIComposer.updateCta();
      renderSuggestionRow();
    });
    $("homeProviderSelector")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-provider]");
      if (!btn || btn.disabled) return;
      const id = btn.dataset.provider;
      if (overlay.selectedProviders.includes(id)) {
        overlay.selectedProviders = overlay.selectedProviders.filter((x) => x !== id);
      } else {
        overlay.selectedProviders = [...overlay.selectedProviders, id];
      }
      ProviderSelector.render();
      AskAIComposer.updateCta();
    });
    $("openChats")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-chat]");
      if (!btn) return;
      ChatPopups.open(btn.dataset.openChat);
      OpenChats.render();
    });

    const dock = $("messengerDock");
    dock?.addEventListener("click", (e) => {
      const popup = e.target.closest(".chat-popup");
      if (!popup) return;
      const id = popup.dataset.provider;
      panel.focusedChat = id;
      if (e.target.closest("[data-close]")) {
        ChatPopups.close(id);
        return;
      }
      if (e.target.closest("[data-min]")) {
        ChatPopups.toggleMin(id);
        return;
      }
      const slot = ensureProvider(id);
      if (slot.minimized) {
        slot.minimized = false;
        ChatPopups.syncHeader(id);
        ChatPopups.focusInput(id);
      }
    });
    dock?.addEventListener("submit", (e) => {
      const form = e.target.closest(".popup-form");
      if (!form) return;
      e.preventDefault();
      const id = form.closest(".chat-popup")?.dataset.provider;
      if (id) ChatPopups.submit(id);
    });
    dock?.addEventListener("input", (e) => {
      const input = e.target.closest(".popup-draft");
      if (!input) return;
      const id = input.closest(".chat-popup")?.dataset.provider;
      if (!id) return;
      ensureProvider(id).draft = input.value;
      ChatPopups.updateComposer(id);
    });
    dock?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.shiftKey) return;
      if (!e.target.classList.contains("popup-draft")) return;
      e.preventDefault();
      const id = e.target.closest(".chat-popup")?.dataset.provider;
      if (id) ChatPopups.submit(id);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.open) AskAISidePanel.setOpen(false);
    });
  }

  function init(opts = {}) {
    panel.getPage = opts.getPage || panel.getPage;
    panel.getSelection = opts.getSelection || panel.getSelection;
    PROVIDERS.forEach((p) => ensureProvider(p.id));
    bind();
    AskAISidePanel.render();
  }

  return {
    init,
    setOpen: AskAISidePanel.setOpen,
    toggle: AskAISidePanel.toggle,
    fillPrompt(text) {
      overlay.prompt = text || "";
      const input = $("askPrompt");
      if (input) input.value = overlay.prompt;
      AskAIComposer.updateCta();
      renderSuggestionRow();
    },
    submit: AskAIComposer.submit,
    providers: PROVIDERS,
  };
})();
