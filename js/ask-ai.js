const AskAI = (() => {
  const ICON = {
    chatgpt: `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="12" r="12" fill="#10A37F"/><path fill="#fff" d="M8.2 8.4c.9-1.6 2.9-2.2 4.5-1.4l.3.2c.4-.3.9-.5 1.5-.5 1.4 0 2.5 1.1 2.5 2.5 0 .2 0 .4-.1.6 1.2.5 1.9 1.8 1.6 3.1-.3 1.2-1.4 2-2.7 2h-.3c-.2 1.2-1.3 2.1-2.6 2.1-.5 0-1-.1-1.4-.4l-.3.2c-1.6.8-3.6.2-4.5-1.4-.3-.6-.4-1.2-.3-1.8-1-.7-1.3-2-.8-3.1.5-1 1.6-1.6 2.7-1.5.2-.6.6-1.1 1.2-1.4zm1.4 1.2c-.4.2-.6.6-.6 1.1v.4l-.4.1c-.6.1-1.1.6-1.2 1.2-.1.7.3 1.3.9 1.5l.3.1v.4c0 .6.3 1.1.8 1.4.8.4 1.8.1 2.3-.6l.2-.3.4.1c.3.1.6.2.9.2.7 0 1.3-.5 1.4-1.2l.1-.4.4-.1c.7-.1 1.2-.7 1.1-1.4-.1-.6-.6-1-1.2-1.1l-.4-.1v-.4c0-.8-.6-1.4-1.4-1.4-.3 0-.6.1-.9.2l-.4.2-.2-.3c-.4-.8-1.4-1.1-2.2-.7z"/></svg>`,
    gemini: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#1A73E8" d="M12 2.2 13.7 8.3 19.8 10 13.7 11.7 12 17.8 10.3 11.7 4.2 10 10.3 8.3z"/><path fill="#EA4335" d="M18.2 3.4 18.9 6.1 21.6 6.8 18.9 7.5 18.2 10.2 17.5 7.5 16.2 6.8 17.5 6.1z"/><path fill="#FBBC05" d="M19.4 13.6 19.9 15.6 22 16.2 19.9 16.8 19.4 18.8 18.9 16.8 16.8 16.2 18.9 15.6z"/><path fill="#34A853" d="M6.4 14.2 7.1 16.4 9.3 17.1 7.1 17.8 6.4 20 5.7 17.8 3.5 17.1 5.7 16.4z"/></svg>`,
  };

  const PROVIDERS = [
    { id: "chatgpt", name: "ChatGPT", icon: ICON.chatgpt, chatPlaceholder: "Message ChatGPT...", status: "ready", available: true },
    { id: "gemini", name: "Gemini", icon: ICON.gemini, chatPlaceholder: "Message Gemini...", status: "ready", available: true },
  ];

  const SKILL_ICON = {
    list: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 6.5h2.2V8.7H4zm0 4.4h2.2v2.2H4zm0 4.4h2.2v2.2H4zM8.4 6.7H20v1.8H8.4zm0 4.4H20v1.8H8.4zm0 4.4H20v1.8H8.4z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M15.5 14.2h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/></svg>`,
    pencil: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 17.3V20h2.7l8-8-2.7-2.7-8 8zM19.7 7.3c.3-.3.3-.8 0-1.1l-1.9-1.9a.8.8 0 0 0-1.1 0L15 5l2.7 2.7 2-1.4z"/></svg>`,
  };

  const SKILLS = [
    { id: "tom-tat", command: "/tom-tat", title: "Tóm tắt", desc: "Gói nội dung thành các ý chính", icon: SKILL_ICON.list, prompt: "Tóm tắt trang này thành các ý chính" },
    { id: "giai-thich", command: "/giai-thich", title: "Giải thích", desc: "Diễn giải đơn giản, có ví dụ", icon: SKILL_ICON.search, prompt: "Giải thích trang này một cách đơn giản, có ví dụ" },
    { id: "hoi-sau", command: "/hoi-sau", title: "Hỏi sâu", desc: "Đào sâu bằng câu hỏi phản biện", icon: SKILL_ICON.search, prompt: "Đặt câu hỏi phản biện để đào sâu nội dung trang này" },
    { id: "viet-lai", command: "/viet-lai", title: "Viết lại", desc: "Giữ ý, câu chữ gọn hơn", icon: SKILL_ICON.pencil, prompt: "Viết lại nội dung trang này cho gọn hơn, giữ nguyên ý" },
  ];

  const panel = {
    open: false,
    view: "home",
    getPage: () => null,
    getSelection: () => "",
  };

  const overlay = {
    prompt: "",
    selectedProviders: ["chatgpt"],
    selectedSkill: "",
    skillHighlight: 0,
    skillPickerDismissed: false,
  };

  const providers = {};

  function emptyProviderState() {
    return {
      isOpened: false,
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

  function skillFromPrompt(text) {
    const token = String(text || "").trim().split(/\s+/)[0].toLowerCase();
    return SKILLS.find((s) => s.command === token) || null;
  }

  function slashFilter(text) {
    const m = String(text || "").match(/^\/([^\s]*)$/);
    return m ? m[1].toLowerCase() : null;
  }

  function filteredSkills() {
    const q = slashFilter(overlay.prompt);
    if (q === null) return SKILLS.slice();
    return SKILLS.filter((s) => (
      s.command.slice(1).includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q)
    ));
  }

  function pickerIsOpen() {
    return slashFilter(overlay.prompt) !== null && !overlay.skillPickerDismissed;
  }

  function applySkill(skill) {
    if (!skill) return;
    overlay.selectedSkill = skill.id;
    overlay.prompt = skill.command;
    overlay.skillPickerDismissed = true;
    overlay.skillHighlight = 0;
    const input = $("askPrompt");
    if (input) {
      input.value = skill.command;
      input.focus();
      input.setSelectionRange(skill.command.length, skill.command.length);
    }
    AskAIComposer.updateCta();
    SkillList.render();
    SkillPicker.render();
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

  function isHome() {
    return panel.view === "home";
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
    } else if (skillFromPrompt(prompt)) {
      const skill = skillFromPrompt(prompt);
      if (skill.id === "tom-tat") body = base;
      else if (skill.id === "giai-thich") body = `Giải thích “${title}” một cách đơn giản:\n\n${base}\n\nVí dụ: bạn có thể hỏi thêm một ý bất kỳ trong bài để mình diễn giải sâu hơn.`;
      else if (skill.id === "hoi-sau") body = `Một vài câu hỏi phản biện về “${title}”:\n\n• Điều gì còn thiếu so với hiện trạng đang mô tả?\n• Lợi ích nêu trong bài có đánh đổi gì không?\n• ${secondBullet(base)}\n\nBạn muốn mình trả lời câu nào trước?`;
      else if (skill.id === "viet-lai") body = `Bản viết lại gọn hơn:\n\n${base.split("\n").filter(Boolean).slice(0, 6).join("\n")}`;
      else body = base;
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
      AiRail.render();
      if (panel.view === provider.id) {
        ProviderMessageList.render(provider.id, { stickToBottom: true });
        ProviderNativeChatBox.update(provider.id);
      }
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
      if (!slot.conversationId) slot.conversationId = Date.now();
      slot.messages.push({ role: "user", text, source });
      slot.error = "";
      dispatch(p, text);
    });

    overlay.prompt = "";
    overlay.selectedSkill = "";
    overlay.skillPickerDismissed = false;
    overlay.selectedProviders = [targets[0].id];
    const homeInput = $("askPrompt");
    if (homeInput) homeInput.value = "";
    Workspace.activate(targets[0].id);
    return true;
  }

  function messageHtml(id) {
    const p = providerById(id);
    const slot = ensureProvider(id);
    if (!p) return "";
    if (!slot.messages.length && !slot.isLoading) {
      return `<div class="provider-empty">Start a conversation with ${escapeHtml(p.name)}.</div>`;
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

  /* ---- Workspace ---- */
  const Workspace = {
    activate(id) {
      if (!isHome()) ProviderNativeChatBox.saveDraft();
      if (!isHome()) ProviderMessageList.saveScroll();
      panel.view = id;
      AskAISidePanel.render();
      if (id === "home") $("askPrompt")?.focus();
      else ProviderNativeChatBox.focus();
    },
    close(id) {
      const p = providerById(id);
      if (!p || !ensureProvider(id).isOpened) return;
      if (panel.view === id) Workspace.activate("home");
    },
  };

  /* ---- AiRail ---- */
  const AiRail = {
    render() {
      const homeBtn = $("railAskAi");
      const chats = $("railChats");
      if (homeBtn) homeBtn.classList.toggle("active", isHome());
      if (!chats) return;
      chats.innerHTML = openedProviders().map((p) => {
        const slot = ensureProvider(p.id);
        const active = panel.view === p.id ? "active" : "";
        const loading = slot.isLoading ? "is-loading" : "";
        return `<div class="rail-item ${active}">
          <button type="button" class="rail-btn ${active} ${loading}" data-workspace="${p.id}" title="${escapeHtml(p.name)}">
            <span class="rail-icon">${p.icon}</span>
          </button>
          <button type="button" class="rail-close" data-close-chat="${p.id}" title="Ẩn ${escapeHtml(p.name)}" aria-label="Ẩn ${escapeHtml(p.name)}">
            <svg viewBox="0 0 12 12" width="8" height="8"><path d="M2.2 2.2l7.6 7.6M9.8 2.2L2.2 9.8" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
          </button>
        </div>`;
      }).join("");
    },
  };

  /* ---- ProviderMessageList ---- */
  const ProviderMessageList = {
    saveScroll() {
      const el = $("providerChat");
      if (!el || isHome()) return;
      ensureProvider(panel.view).scroll = el.scrollTop;
    },
    render(id, { stickToBottom = false } = {}) {
      const chat = $("providerChat");
      const slot = ensureProvider(id);
      if (!chat) return;
      chat.innerHTML = messageHtml(id);
      if (stickToBottom || slot.isLoading) chat.scrollTop = chat.scrollHeight;
      else chat.scrollTop = slot.scroll || 0;
    },
  };

  /* ---- ProviderNativeChatBox ---- */
  const ProviderNativeChatBox = {
    saveDraft() {
      const input = $("providerDraft");
      if (!input || isHome()) return;
      ensureProvider(panel.view).draft = input.value;
    },
    update(id) {
      const input = $("providerDraft");
      const send = $("providerSend");
      const p = providerById(id);
      const slot = ensureProvider(id);
      if (!input || !p) return;
      input.placeholder = p.chatPlaceholder;
      if (input.value !== slot.draft) input.value = slot.draft;
      const canSend = Boolean(slot.draft.trim()) && !slot.isLoading && p.available;
      if (send) send.disabled = !canSend;
      input.style.height = "auto";
      input.style.height = `${Math.min(input.scrollHeight, 72)}px`;
    },
    focus() {
      $("providerDraft")?.focus();
    },
    submit() {
      if (isHome()) return;
      const id = panel.view;
      const p = providerById(id);
      const slot = ensureProvider(id);
      const text = (slot.draft || "").trim();
      if (!p || !text || slot.isLoading || !p.available) return;
      slot.draft = "";
      const input = $("providerDraft");
      if (input) input.value = "";
      slot.messages.push({ role: "user", text, source: "provider" });
      slot.error = "";
      dispatch(p, text);
      ProviderMessageList.render(id, { stickToBottom: true });
      ProviderNativeChatBox.update(id);
      AiRail.render();
    },
  };

  /* ---- ProviderConversation ---- */
  const ProviderConversation = {
    render() {
      const pane = $("providerView");
      const show = !isHome() && Boolean(providerById(panel.view));
      if (pane) pane.hidden = !show;
      if (!show) return;
      ProviderMessageList.render(panel.view);
      ProviderNativeChatBox.update(panel.view);
    },
  };

  /* ---- AskAISidePanel ---- */
  const AskAISidePanel = {
    render() {
      const el = $("sidePanel");
      const askBtn = $("askAiBtn");
      const title = $("workspaceTitle");
      if (el) el.hidden = !panel.open;
      if (askBtn) {
        askBtn.classList.toggle("active", panel.open);
        askBtn.setAttribute("aria-pressed", String(panel.open));
      }
      const p = providerById(panel.view);
      if (title) title.textContent = p ? p.name : "Ask AI";
      AiRail.render();
      AskAIComposer.render();
      ProviderConversation.render();
    },
    setOpen(open) {
      panel.open = open;
      AskAISidePanel.render();
      if (!open) return;
      if (isHome()) $("askPrompt")?.focus();
      else ProviderNativeChatBox.focus();
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

  function skillRowHtml(s, { active = false, picker = false } = {}) {
    const cls = picker ? "skill-picker-item" : "skill-row";
    return `<button type="button" class="${cls} ${active ? "active" : ""}" data-skill="${s.id}">
      <span class="skill-icon">${s.icon}</span>
      <span class="skill-copy">
        <span class="skill-title">${escapeHtml(s.title)}</span>
        <span class="skill-desc">${escapeHtml(s.desc)}</span>
      </span>
      <span class="skill-cmd">${escapeHtml(s.command)}</span>
    </button>`;
  }

  const SkillList = {
    render() {
      const list = $("homeSkills");
      if (!list) return;
      list.innerHTML = SKILLS.map((s) => {
        const on = overlay.selectedSkill === s.id || overlay.prompt.trim() === s.command;
        return skillRowHtml(s, { active: on });
      }).join("");
    },
  };

  const SkillPicker = {
    render() {
      const el = $("skillPicker");
      if (!el) return;
      const open = pickerIsOpen();
      el.hidden = !open;
      if (!open) return;
      const items = filteredSkills();
      if (!items.length) {
        el.innerHTML = `<div class="skill-picker-empty">Không có skill phù hợp</div>`;
        return;
      }
      if (overlay.skillHighlight >= items.length) overlay.skillHighlight = 0;
      el.innerHTML = items.map((s, i) => skillRowHtml(s, { active: i === overlay.skillHighlight, picker: true })).join("");
    },
  };

  const AskAIComposer = {
    render() {
      const view = $("homeView");
      const show = isHome();
      if (view) view.hidden = !show;
      if (!show) return;
      const input = $("askPrompt");
      if (input && input.value !== overlay.prompt) input.value = overlay.prompt;
      SkillList.render();
      SkillPicker.render();
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
    $("railAskAi")?.addEventListener("click", () => Workspace.activate("home"));
    $("railChats")?.addEventListener("click", (e) => {
      const close = e.target.closest("[data-close-chat]");
      if (close) {
        Workspace.close(close.dataset.closeChat);
        return;
      }
      const btn = e.target.closest("[data-workspace]");
      if (!btn) return;
      Workspace.activate(btn.dataset.workspace);
    });
    $("askCta")?.addEventListener("click", () => AskAIComposer.submit());
    $("askPrompt")?.addEventListener("input", (e) => {
      overlay.prompt = e.target.value;
      overlay.skillPickerDismissed = false;
      const skill = skillFromPrompt(overlay.prompt);
      overlay.selectedSkill = skill && overlay.prompt.trim() === skill.command ? skill.id : "";
      overlay.skillHighlight = 0;
      AskAIComposer.updateCta();
      SkillList.render();
      SkillPicker.render();
    });
    $("askPrompt")?.addEventListener("keydown", (e) => {
      if (pickerIsOpen()) {
        const items = filteredSkills();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!items.length) return;
          overlay.skillHighlight = (overlay.skillHighlight + 1) % items.length;
          SkillPicker.render();
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          if (!items.length) return;
          overlay.skillHighlight = (overlay.skillHighlight - 1 + items.length) % items.length;
          SkillPicker.render();
          return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          applySkill(items[overlay.skillHighlight] || items[0]);
          return;
        }
        if (e.key === "Tab") {
          e.preventDefault();
          applySkill(items[overlay.skillHighlight] || items[0]);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          overlay.skillPickerDismissed = true;
          SkillPicker.render();
          return;
        }
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        AskAIComposer.submit();
      }
    });
    $("homeSkills")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-skill]");
      if (!btn) return;
      applySkill(SKILLS.find((s) => s.id === btn.dataset.skill));
    });
    $("skillPicker")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-skill]");
      if (!btn) return;
      applySkill(SKILLS.find((s) => s.id === btn.dataset.skill));
    });
    $("allSkillsBtn")?.addEventListener("click", () => {
      overlay.prompt = "/";
      overlay.selectedSkill = "";
      overlay.skillPickerDismissed = false;
      overlay.skillHighlight = 0;
      const input = $("askPrompt");
      if (input) {
        input.value = "/";
        input.focus();
        input.setSelectionRange(1, 1);
      }
      AskAIComposer.updateCta();
      SkillList.render();
      SkillPicker.render();
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
    $("providerChatForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      ProviderNativeChatBox.submit();
    });
    $("providerDraft")?.addEventListener("input", (e) => {
      if (isHome()) return;
      ensureProvider(panel.view).draft = e.target.value;
      ProviderNativeChatBox.update(panel.view);
    });
    $("providerDraft")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        ProviderNativeChatBox.submit();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !panel.open) return;
      if (isHome() && pickerIsOpen()) return;
      AskAISidePanel.setOpen(false);
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
      overlay.selectedSkill = skillFromPrompt(overlay.prompt)?.id || "";
      overlay.skillPickerDismissed = slashFilter(overlay.prompt) === null;
      overlay.skillHighlight = 0;
      const input = $("askPrompt");
      if (input) input.value = overlay.prompt;
      AskAIComposer.updateCta();
      SkillList.render();
      SkillPicker.render();
      if (panel.open && !isHome()) Workspace.activate("home");
    },
    submit: AskAIComposer.submit,
    providers: PROVIDERS,
  };
})();
