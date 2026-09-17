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
    { id: "tom-tat", command: "/tom-tat", title: "Tóm tắt", desc: "Gói nội dung thành ý chính", group: "Reading", icon: SKILL_ICON.list, prompt: "Tóm tắt trang này thành các ý chính" },
    { id: "giai-thich", command: "/giai-thich", title: "Giải thích", desc: "Diễn giải đơn giản, có ví dụ", group: "Reading", icon: SKILL_ICON.search, prompt: "Giải thích trang này một cách đơn giản, có ví dụ" },
    { id: "trich-xuat", command: "/trich-xuat", title: "Trích xuất ý chính", desc: "Lấy các luận điểm quan trọng", group: "Reading", icon: SKILL_ICON.list, prompt: "Trích xuất các ý chính của trang này" },
    { id: "viet-lai", command: "/viet-lai", title: "Viết lại", desc: "Giữ ý, câu chữ gọn hơn", group: "Writing", icon: SKILL_ICON.pencil, prompt: "Viết lại nội dung trang này cho gọn hơn, giữ nguyên ý" },
    { id: "rut-gon", command: "/rut-gon", title: "Rút gọn", desc: "Rút ngắn nhưng đủ nghĩa", group: "Writing", icon: SKILL_ICON.pencil, prompt: "Rút gọn nội dung trang này, giữ đủ nghĩa" },
    { id: "sua-ngu-phap", command: "/sua-ngu-phap", title: "Sửa ngữ pháp", desc: "Chỉnh lỗi chính tả và câu", group: "Writing", icon: SKILL_ICON.pencil, prompt: "Sửa ngữ pháp và chính tả cho nội dung trang này" },
    { id: "doi-giong", command: "/doi-giong", title: "Đổi giọng văn", desc: "Đổi tông, giữ nguyên ý", group: "Writing", icon: SKILL_ICON.pencil, prompt: "Đổi giọng văn của nội dung trang này, giữ nguyên ý" },
    { id: "hoi-sau", command: "/hoi-sau", title: "Hỏi sâu", desc: "Đào sâu bằng câu hỏi phản biện", group: "Analysis", icon: SKILL_ICON.search, prompt: "Đặt câu hỏi phản biện để đào sâu nội dung trang này" },
    { id: "so-sanh", command: "/so-sanh", title: "So sánh", desc: "Đối chiếu điểm giống và khác", group: "Analysis", icon: SKILL_ICON.list, prompt: "So sánh các luận điểm chính trong nội dung này" },
    { id: "phan-tich", command: "/phan-tich", title: "Phân tích", desc: "Phân tích cấu trúc và lập luận", group: "Analysis", icon: SKILL_ICON.search, prompt: "Phân tích cấu trúc và lập luận của trang này" },
    { id: "brainstorm", command: "/brainstorm", title: "Brainstorm", desc: "Gợi ý hướng khai thác tiếp", group: "Analysis", icon: SKILL_ICON.search, prompt: "Brainstorm các hướng khai thác tiếp từ nội dung trang này" },
  ];

  const RECOMMENDED_SKILL_IDS = ["tom-tat", "giai-thich", "hoi-sau", "viet-lai"];
  const SKILL_GROUP_ORDER = ["Writing", "Reading", "Analysis"];

  const panel = {
    open: false,
    view: "home",
    getPage: () => null,
    getTabs: () => [],
    getActiveTabId: () => null,
    getSelection: () => "",
    onContextChange: () => {},
  };

  const overlay = {
    prompt: "",
    selectedProviders: ["chatgpt"],
    selectedSkill: "",
    skillHighlight: 0,
    skillQuery: "",
    skillFromSlash: false,
    selectedTabIds: [],
    pageExcerpt: "",
    excerptTabId: null,
    excerptDismissed: false,
    followActiveTab: true,
    tabQuery: "",
    tabManage: false,
    skillLibrary: false,
    menu: "skill",
    layout: "stacked",
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

  function skillById(id) {
    return SKILLS.find((s) => s.id === id) || null;
  }

  function skillFromPrompt(text) {
    const token = String(text || "").trim().split(/\s+/)[0].toLowerCase();
    return SKILLS.find((s) => s.command === token) || null;
  }

  function resolveSkill(prompt) {
    return skillById(overlay.selectedSkill) || skillFromPrompt(prompt);
  }

  function slashToken(text) {
    const m = String(text || "").match(/(^|\s)(\/([^\s]*))$/);
    return m ? { full: m[2], query: m[3].toLowerCase() } : null;
  }

  function atToken(text) {
    const m = String(text || "").match(/(^|\s)(@([^\s]*))$/);
    return m ? { full: m[2], query: m[3].toLowerCase() } : null;
  }

  function stripTrailingToken(text, token) {
    if (!token) return String(text || "");
    const value = String(text || "");
    if (!value.endsWith(token.full)) return value;
    return value.slice(0, value.length - token.full.length).replace(/[ \t]+$/, "");
  }

  function skillMatchesQuery(skill, query) {
    const q = String(query || "").toLowerCase();
    if (!q) return true;
    return (
      skill.command.slice(1).includes(q) ||
      skill.title.toLowerCase().includes(q) ||
      skill.desc.toLowerCase().includes(q) ||
      skill.group.toLowerCase().includes(q)
    );
  }

  function recommendedSkills() {
    return RECOMMENDED_SKILL_IDS.map(skillById).filter(Boolean);
  }

  function filteredSkills() {
    const source = overlay.skillLibrary ? SKILLS : recommendedSkills();
    return source.filter((s) => skillMatchesQuery(s, overlay.skillQuery));
  }

  function skillMenuItems() {
    return filteredSkills();
  }

  function moveSkillHighlight(delta) {
    const items = skillMenuItems();
    if (!items.length) return;
    const start = overlay.skillHighlight < 0 ? (delta > 0 ? -1 : 0) : overlay.skillHighlight;
    overlay.skillHighlight = (start + delta + items.length) % items.length;
    SkillPicker.render();
  }

  function groupedLibrarySkills() {
    const items = SKILLS.filter((s) => skillMatchesQuery(s, overlay.skillQuery));
    return SKILL_GROUP_ORDER.map((group) => ({
      group,
      skills: items.filter((s) => s.group === group),
    })).filter((g) => g.skills.length);
  }

  function pickerIsOpen() {
    return overlay.menu === "skill";
  }

  function isSplitLayout() {
    return overlay.layout === "split";
  }

  function skillPanelOpen() {
    return isSplitLayout() || overlay.menu === "skill";
  }

  function applyComposerLayout() {
    const split = overlay.layout === "split";
    const dock = $("askDock");
    const toggle = $("layoutToggle");
    if (dock) dock.dataset.layout = split ? "split" : "stacked";
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(split));
    toggle.title = split ? "Gộp Skill vào chatbox" : "Tách Skill khỏi chatbox";
    toggle.setAttribute("aria-label", toggle.title);
  }

  function toggleComposerLayout() {
    overlay.layout = overlay.layout === "split" ? "stacked" : "split";
    applyComposerLayout();
    SkillPicker.render();
    TabContext.render();
  }

  function setPrompt(value, { focus = false } = {}) {
    overlay.prompt = value;
    const input = $("askPrompt");
    if (input && input.value !== value) input.value = value;
    if (focus && input) {
      input.focus();
      input.setSelectionRange(value.length, value.length);
    }
  }

  function returnToSkill() {
    overlay.menu = "skill";
    overlay.skillQuery = "";
    overlay.skillFromSlash = false;
    overlay.skillLibrary = false;
    overlay.tabManage = false;
    overlay.tabQuery = "";
    SkillPicker.render();
    TabContext.render();
  }

  function collapseSkill() {
    if (isSplitLayout()) return;
    overlay.menu = null;
    overlay.skillQuery = "";
    overlay.skillFromSlash = false;
    overlay.skillLibrary = false;
    SkillPicker.render();
    TabContext.render();
  }

  function closeMenus() {
    returnToSkill();
  }

  function openSkillMenu(query = "", { fromSlash = false } = {}) {
    overlay.menu = "skill";
    overlay.skillQuery = query;
    overlay.skillFromSlash = fromSlash;
    overlay.skillHighlight = -1;
    overlay.tabManage = false;
    overlay.skillLibrary = Boolean(fromSlash && query);
    TabContext.render();
    SkillPicker.render();
    if (overlay.skillLibrary) {
      window.requestAnimationFrame(() => {
        const search = $("skillSearch");
        if (!search) return;
        if (search.value !== overlay.skillQuery) search.value = overlay.skillQuery;
        search.focus();
      });
    }
  }

  function openSkillLibrary() {
    overlay.menu = "skill";
    overlay.skillLibrary = true;
    overlay.skillQuery = "";
    overlay.skillHighlight = -1;
    overlay.skillFromSlash = false;
    SkillPicker.render();
    window.requestAnimationFrame(() => {
      const search = $("skillSearch");
      if (!search) return;
      search.value = "";
      search.focus();
    });
  }

  function closeSkillLibrary() {
    overlay.skillLibrary = false;
    overlay.skillQuery = "";
    overlay.skillHighlight = -1;
    SkillPicker.render();
  }

  function openContextMenu(query = "") {
    overlay.menu = "context";
    overlay.tabQuery = query;
    overlay.tabManage = true;
    overlay.skillFromSlash = false;
    overlay.skillLibrary = false;
    SkillPicker.render();
    TabContext.render();
  }

  function applySkill(skill) {
    if (!skill || skill.id === "all") return;
    overlay.selectedSkill = skill.id;
    overlay.skillQuery = "";
    overlay.skillLibrary = false;
    overlay.menu = "skill";
    overlay.skillFromSlash = false;
    setPrompt(stripTrailingToken(overlay.prompt, slashToken(overlay.prompt)), { focus: true });
    AskAIComposer.render();
  }

  function clearSkill() {
    overlay.selectedSkill = "";
    SkillPicker.render();
    AskAIComposer.renderChip();
    AskAIComposer.updateCta();
  }

  function tabDomain(tab) {
    try {
      return new URL(tab.url).hostname.replace(/^www\./, "");
    } catch {
      const display = String(tab.display || "");
      return display.split("/")[0] || display || "";
    }
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

  function toggleProvider(id) {
    const p = providerById(id);
    if (!p || !p.available || p.status === "unavailable") return;
    const selected = overlay.selectedProviders.includes(id);
    if (selected) {
      if (overlay.selectedProviders.length === 1) return;
      overlay.selectedProviders = overlay.selectedProviders.filter((x) => x !== id);
    } else {
      overlay.selectedProviders = PROVIDERS.map((x) => x.id).filter(
        (x) => x === id || overlay.selectedProviders.includes(x)
      );
    }
    ProviderSelector.render();
    AskAIComposer.updateCta();
  }

  function canAsk() {
    return Boolean(overlay.prompt.trim() || overlay.selectedSkill) && overlayTargets().length > 0;
  }

  function openedProviders() {
    return PROVIDERS.filter((p) => ensureProvider(p.id).isOpened);
  }

  function isHome() {
    return panel.view === "home";
  }

  function allTabs() {
    return panel.getTabs ? panel.getTabs() : [];
  }

  function activeTabId() {
    return panel.getActiveTabId ? panel.getActiveTabId() : null;
  }

  function syncTabContext() {
    const tabs = allTabs();
    const live = new Set(tabs.map((t) => t.id));
    overlay.selectedTabIds = overlay.selectedTabIds.filter((id) => live.has(id));
    const active = activeTabId();
    if (overlay.followActiveTab && active != null) overlay.selectedTabIds = [active];
  }

  function notifyContextChange() {
    if (typeof panel.onContextChange === "function") panel.onContextChange();
  }

  function contextPages() {
    const selected = new Set(overlay.selectedTabIds);
    return allTabs().filter((t) => selected.has(t.id));
  }

  function livePageSelection() {
    return String(panel.getSelection ? panel.getSelection() : "").trim();
  }

  function visibleExcerpt() {
    if (!overlay.pageExcerpt || overlay.excerptDismissed) return "";
    if (!overlay.selectedTabIds.length) return "";
    return overlay.pageExcerpt;
  }

  function clearPageExcerpt() {
    overlay.pageExcerpt = "";
    overlay.excerptTabId = null;
    overlay.excerptDismissed = false;
  }

  function capturePageSelection() {
    if (!panel.open) return;
    const text = livePageSelection();
    if (text) {
      if (text !== overlay.pageExcerpt) overlay.excerptDismissed = false;
      overlay.pageExcerpt = text;
      overlay.excerptTabId = activeTabId();
      SelectionPreview.render();
      return;
    }
    const sel = window.getSelection();
    const node = sel && sel.anchorNode;
    const page = document.getElementById("page");
    if (!node || !page || !page.contains(node)) return;
    clearPageExcerpt();
    SelectionPreview.render();
  }

  const SelectionPreview = {
    render() {
      const el = $("selectionPreview");
      const textEl = $("selectionPreviewText");
      const excerpt = visibleExcerpt();
      if (el) el.hidden = !excerpt;
      if (!textEl) return;
      textEl.textContent = excerpt;
      if (el) el.title = excerpt;
    },
    dismiss() {
      overlay.excerptDismissed = true;
      SelectionPreview.render();
    },
  };

  function contextTitle(pages) {
    if (!pages.length) return "không có trang";
    if (pages.length === 1) return pages[0].title || "trang hiện tại";
    return pages.map((p) => p.title).join(", ");
  }

  function pagesSummary(pages) {
    if (!pages.length) return "Không có tab nào được chọn làm ngữ cảnh.";
    if (pages.length === 1) return pageSummary(pages[0]);
    return pages.map((p, i) => `${i + 1}. ${p.title}\n${pageSummary(p)}`).join("\n\n");
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
    const pages = Array.isArray(page) ? page : (page ? [page] : []);
    const q = prompt.toLowerCase();
    const title = contextTitle(pages);
    const base = pagesSummary(pages);
    const prior = [...history].reverse().find((m) => m.role === "ai");
    const isFollowUp = history.some((m) => m.role === "ai");
    const selectionMatch = prompt.match(/selection:\s*\n\s*"([\s\S]+)"/i);
    const noTabs = !pages.length;

    let body;
    if (selectionMatch) {
      const snippet = selectionMatch[1];
      if (/translate/i.test(prompt)) body = `English gist of the selected text:\n\n${snippet}`;
      else if (/rewrite/i.test(prompt)) body = `Rewritten selection:\n\n${snippet}`;
      else body = `About the selected text on “${title}”:\n\n${snippet}\n\n${base}`;
    } else if (noTabs && resolveSkill(prompt)) {
      body = "Bạn chưa chọn tab nào làm ngữ cảnh. Hãy chọn một hoặc nhiều tab rồi hỏi lại.";
    } else if (resolveSkill(prompt)) {
      const skill = resolveSkill(prompt);
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
      body = noTabs ? "Bạn chưa chọn tab nào để tóm tắt." : base;
    } else if (q.includes("explain") || q.includes("giải thích")) {
      body = noTabs ? `Về “${prompt}”:\n\nKhông có tab ngữ cảnh.` : `Trang này là “${title}”.\n\n${base}`;
    } else if (q.includes("translate")) {
      body = noTabs ? "Bạn chưa chọn tab nào để dịch." : `English gist of “${title}”:\n\n${base}`;
    } else if (noTabs) {
      body = `Về “${prompt}”.\n\nKhông có tab nào được chọn làm ngữ cảnh.`;
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
    const page = contextPages();
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

  function withSelection(text) {
    const excerpt = visibleExcerpt();
    if (!excerpt) return text;
    return `${text}\n\nselection:\n"${excerpt}"`;
  }

  function sendToProviders(prompt, providerIds, source) {
    const skill = resolveSkill(prompt);
    const text = (prompt || "").trim() || skill?.prompt || "";
    const routed = withSelection(skill && !skillFromPrompt(text) ? `${skill.command} ${text}`.trim() : text);
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
      dispatch(p, routed);
    });

    overlay.prompt = "";
    overlay.skillQuery = "";
    overlay.menu = null;
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
      if (id === "home") overlay.menu = "skill";
      AskAISidePanel.render();
      if (id === "home") $("askPrompt")?.focus();
      else ProviderNativeChatBox.focus();
    },
    close(id) {
      const p = providerById(id);
      if (!p || !ensureProvider(id).isOpened) return;
      const wasActive = panel.view === id;
      providers[id] = emptyProviderState();
      if (wasActive) {
        const next = openedProviders()[0];
        Workspace.activate(next ? next.id : "home");
      } else {
        AskAISidePanel.render();
      }
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
          <button type="button" class="rail-close" data-close-chat="${p.id}" title="Đóng ${escapeHtml(p.name)}" aria-label="Đóng ${escapeHtml(p.name)}">
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
      if (open) {
        overlay.followActiveTab = true;
        overlay.selectedSkill = "";
        overlay.skillLibrary = false;
        overlay.menu = "skill";
        overlay.tabManage = false;
        syncTabContext();
        capturePageSelection();
      } else {
        clearPageExcerpt();
      }
      AskAISidePanel.render();
      notifyContextChange();
      if (!open) return;
      if (isHome()) $("askPrompt")?.focus();
      else ProviderNativeChatBox.focus();
    },
    toggle() {
      AskAISidePanel.setOpen(!panel.open);
    },
  };

  /* ---- Composer skill + context ---- */
  function tooltipForTabs(pages) {
    if (!pages.length) return "Chọn tab làm ngữ cảnh";
    const shown = pages.slice(0, 3).map((t) => t.title).join("\n• ");
    const extra = pages.length > 3 ? `\n• +${pages.length - 3} tab khác` : "";
    return `Đang sử dụng:\n• ${shown}${extra}`;
  }

  const TabContext = {
    renderRow() {
      syncTabContext();
      const row = $("tabStatus");
      const btn = $("tabStatusBtn");
      const body = $("tabStatusBody");
      const clear = $("tabClearBtn");
      const pages = contextPages();
      const n = pages.length;
      const total = allTabs().length;
      const open = overlay.menu === "context";
      if (row) {
        row.classList.toggle("is-empty", n === 0);
        row.classList.toggle("is-multi", n > 1);
      }
      if (btn) {
        btn.setAttribute("aria-expanded", String(open));
        btn.title = tooltipForTabs(pages);
      }
      if (body) {
        if (!n) {
          body.innerHTML = `<span class="ctx-empty">Chọn tab</span>`;
        } else if (n === 1) {
          const t = pages[0];
          body.innerHTML = `<span class="ctx-icon">${t.iconHtml || ""}</span><span class="ctx-row-title">${escapeHtml(t.title)}</span>`;
        } else {
          const stack = pages.slice(0, 3).map((t) => `<span class="ctx-icon">${t.iconHtml || ""}</span>`).join("");
          body.innerHTML = `<span class="fav-stack">${stack}</span><span class="ctx-row-count">${n}/${total} tab</span>`;
        }
      }
      if (clear) {
        clear.hidden = n === 0;
        clear.title = n > 1 ? "Bỏ chọn tất cả tab" : "Bỏ chọn tab";
        clear.setAttribute("aria-label", clear.title);
      }
    },
    render() {
      TabContext.renderRow();
      const panel = $("tabContextMenu");
      const list = $("tabPickerList");
      const count = $("tabPickerCount");
      const open = overlay.menu === "context";
      const tabs = allTabs();
      const total = tabs.length;
      const selected = new Set(overlay.selectedTabIds);
      if (panel) {
        panel.classList.toggle("is-open", open);
        panel.setAttribute("aria-hidden", String(!open));
      }
      if (count) count.textContent = `Đã chọn ${selected.size}/${total} tab`;
      if (!open || !list) return;
      const scroll = list.scrollTop;
      list.innerHTML = tabs.length
        ? tabs.map((t) => {
          const on = selected.has(t.id);
          return `<button type="button" class="ctx-item ${on ? "selected" : ""}" data-tab="${t.id}">
            <span class="ctx-check">${on ? "✓" : ""}</span>
            <span class="ctx-icon">${t.iconHtml || ""}</span>
            <span class="ctx-title">${escapeHtml(t.title)}</span>
          </button>`;
        }).join("")
        : `<div class="skill-picker-empty">Không có tab đang mở</div>`;
      list.scrollTop = scroll;
    },
    toggle(id) {
      overlay.followActiveTab = false;
      if (overlay.selectedTabIds.includes(id)) {
        overlay.selectedTabIds = overlay.selectedTabIds.filter((x) => x !== id);
      } else {
        overlay.selectedTabIds = [...overlay.selectedTabIds, id];
      }
      const active = activeTabId();
      if (overlay.selectedTabIds.length === 1 && overlay.selectedTabIds[0] === active) {
        overlay.followActiveTab = true;
      }
      TabContext.render();
      SelectionPreview.render();
      AskAIComposer.updateCta();
      notifyContextChange();
    },
    clear() {
      overlay.followActiveTab = false;
      overlay.selectedTabIds = [];
      TabContext.render();
      SelectionPreview.render();
      AskAIComposer.updateCta();
      notifyContextChange();
    },
    close() {
      returnToSkill();
      $("askPrompt")?.focus();
    },
  };

  const ProviderSelector = {
    render() {
      const wrap = $("homeProviderSelector");
      if (!wrap) return;
      wrap.innerHTML = PROVIDERS.map((p) => {
        const on = overlay.selectedProviders.includes(p.id);
        const unavailable = !p.available || p.status === "unavailable";
        return `<button type="button" class="ask-with-chip ${on ? "selected" : ""} ${unavailable ? "unavailable" : ""}"
          data-provider="${p.id}" aria-pressed="${on}" ${unavailable ? "disabled" : ""}>
          <span class="provider-tab-icon">${p.icon}</span>
          ${escapeHtml(p.name)}
        </button>`;
      }).join("");
    },
  };

  function skillRowHtml(s, { active = false } = {}) {
    const selected = overlay.selectedSkill === s.id;
    return `<button type="button" class="skill-picker-item ${selected ? "selected" : ""} ${active ? "active" : ""}" data-skill="${s.id}">
      <span class="skill-icon">${s.icon}</span>
      <span class="skill-copy">
        <span class="skill-title">${escapeHtml(s.title)}</span>
        ${s.desc ? `<span class="skill-desc">${escapeHtml(s.desc)}</span>` : ""}
      </span>
      <span class="skill-cmd">${escapeHtml(s.command)}</span>
    </button>`;
  }

  const SkillPicker = {
    render() {
      const row = $("skillStatus");
      const btn = $("skillStatusBtn");
      const label = $("skillStatusLabel");
      const clear = $("skillClearBtn");
      const el = $("skillPicker");
      const home = $("skillRecommended");
      const library = $("skillLibrary");
      const list = $("skillLibraryList");
      const search = $("skillSearch");
      const open = skillPanelOpen();
      const skill = skillById(overlay.selectedSkill);
      if (row) row.classList.toggle("is-empty", !skill);
      if (label) label.textContent = isSplitLayout() || !skill ? "Skill" : skill.title;
      if (btn) {
        btn.setAttribute("aria-expanded", String(open));
        btn.disabled = isSplitLayout();
      }
      if (clear) {
        clear.hidden = !skill;
        clear.title = "Bỏ chọn skill";
        clear.setAttribute("aria-label", "Bỏ chọn skill");
      }
      if (!el) return;
      el.classList.toggle("is-open", open);
      el.setAttribute("aria-hidden", String(!open));
      if (!open) {
        if (home) home.hidden = false;
        if (library) library.hidden = true;
        return;
      }
      const items = skillMenuItems();
      if (overlay.skillHighlight >= items.length) overlay.skillHighlight = 0;
      const inLibrary = overlay.skillLibrary;
      if (home) home.hidden = inLibrary;
      if (library) library.hidden = !inLibrary;
      if (!inLibrary && home) {
        const rec = recommendedSkills();
        home.innerHTML = rec.map((s, i) => skillRowHtml(s, { active: i === overlay.skillHighlight })).join("");
        return;
      }
      if (search && document.activeElement !== search && search.value !== overlay.skillQuery) {
        search.value = overlay.skillQuery;
      }
      if (!list) return;
      const groups = groupedLibrarySkills();
      list.innerHTML = groups.length
        ? groups.map((g) => {
          const rows = g.skills.map((s) => {
            const idx = items.findIndex((x) => x.id === s.id);
            return skillRowHtml(s, { active: idx === overlay.skillHighlight });
          }).join("");
          return `<div class="skill-group-title">${escapeHtml(g.group)}</div>${rows}`;
        }).join("")
        : `<div class="skill-picker-empty">Không có skill phù hợp</div>`;
    },
  };

  const AskAIComposer = {
    render() {
      const view = $("homeView");
      const show = isHome();
      if (view) view.hidden = !show;
      applyComposerLayout();
      if (!show) return;
      const input = $("askPrompt");
      if (input && input.value !== overlay.prompt) input.value = overlay.prompt;
      AskAIComposer.renderChip();
      SkillPicker.render();
      TabContext.render();
      SelectionPreview.render();
      ProviderSelector.render();
      AskAIComposer.updateCta();
    },
    renderChip() {
      const row = $("skillChipRow");
      const label = $("skillChipLabel");
      const skill = skillById(overlay.selectedSkill);
      if (row) row.hidden = !skill;
      if (label) label.textContent = skill ? skill.command : "";
    },
    updateCta() {
      const btn = $("askCta");
      if (!btn) return;
      btn.disabled = !canAsk();
    },
    submit() {
      sendToProviders(overlay.prompt, overlay.selectedProviders, "ask-ai");
    },
    onPromptInput(value) {
      const at = atToken(value);
      if (at) {
        setPrompt(stripTrailingToken(value, at));
        openContextMenu(at.query);
        AskAIComposer.updateCta();
        return;
      }
      overlay.prompt = value;
      const slash = slashToken(value);
      if (slash) openSkillMenu(slash.query, { fromSlash: true });
      else if (overlay.skillFromSlash) {
        overlay.skillFromSlash = false;
        overlay.skillLibrary = false;
        if (overlay.menu !== "context") openSkillMenu("");
      }
      AskAIComposer.updateCta();
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
    $("layoutToggle")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleComposerLayout();
    });
    $("skillStatusBtn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (isSplitLayout()) return;
      if (overlay.menu === "skill") collapseSkill();
      else openSkillMenu("");
    });
    $("skillClearBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearSkill();
    });
    $("tabStatusBtn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (overlay.menu === "context") returnToSkill();
      else openContextMenu("");
    });
    $("tabClearBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      TabContext.clear();
    });
    $("skillChipClear")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      clearSkill();
      $("askPrompt")?.focus();
    });
    $("selectionPreviewClear")?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      SelectionPreview.dismiss();
    });
    $("composerInput")?.addEventListener("click", (e) => {
      if (e.target.closest(".skill-chip-x")) return;
      $("askPrompt")?.focus();
    });
    document.addEventListener("selectionchange", () => {
      if (!panel.open) return;
      capturePageSelection();
    });
    document.addEventListener("mouseup", () => {
      if (!panel.open) return;
      capturePageSelection();
    });
    $("askPrompt")?.addEventListener("input", (e) => {
      AskAIComposer.onPromptInput(e.target.value);
    });
    $("askPrompt")?.addEventListener("keydown", (e) => {
      if (pickerIsOpen()) {
        const items = skillMenuItems();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          moveSkillHighlight(1);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          moveSkillHighlight(-1);
          return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
          if (overlay.skillHighlight >= 0 && items[overlay.skillHighlight]) {
            e.preventDefault();
            applySkill(items[overlay.skillHighlight]);
            return;
          }
        }
        if (e.key === "Tab") {
          if (overlay.skillHighlight >= 0 && items[overlay.skillHighlight]) {
            e.preventDefault();
            applySkill(items[overlay.skillHighlight]);
            return;
          }
        }
      }
      if (e.key === "Escape") {
        if (overlay.skillLibrary) {
          e.preventDefault();
          e.stopPropagation();
          closeSkillLibrary();
          return;
        }
        if (overlay.menu === "context") {
          e.preventDefault();
          e.stopPropagation();
          returnToSkill();
          return;
        }
      }
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        AskAIComposer.submit();
      }
    });
    $("skillPicker")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const btn = e.target.closest("[data-skill]");
      if (!btn) return;
      applySkill(skillById(btn.dataset.skill));
    });
    $("skillLibraryBack")?.addEventListener("click", (e) => {
      e.stopPropagation();
      closeSkillLibrary();
    });
    $("skillSearch")?.addEventListener("input", (e) => {
      overlay.skillQuery = e.target.value;
      overlay.skillHighlight = -1;
      SkillPicker.render();
    });
    $("skillSearch")?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        closeSkillLibrary();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter") {
        e.stopPropagation();
      }
      const items = skillMenuItems();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveSkillHighlight(1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        moveSkillHighlight(-1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (overlay.skillHighlight >= 0) applySkill(items[overlay.skillHighlight] || items[0]);
      }
    });
    $("tabPickerList")?.addEventListener("click", (e) => {
      e.stopPropagation();
      const btn = e.target.closest("[data-tab]");
      if (!btn) return;
      TabContext.toggle(Number(btn.dataset.tab));
    });
    document.addEventListener("pointerdown", (e) => {
      if (overlay.menu !== "context" && !overlay.skillLibrary) return;
      if (e.target.closest("#askDock") || e.target.closest("#layoutToggle")) return;
      returnToSkill();
    });
    $("homeProviderSelector")?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-provider]");
      if (!btn || btn.disabled) return;
      toggleProvider(btn.dataset.provider);
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
      if (overlay.skillLibrary) {
        e.preventDefault();
        closeSkillLibrary();
        $("askPrompt")?.focus();
        return;
      }
      if (overlay.menu === "context") {
        e.preventDefault();
        returnToSkill();
        $("askPrompt")?.focus();
        return;
      }
      AskAISidePanel.setOpen(false);
    });
  }

  function init(opts = {}) {
    panel.getPage = opts.getPage || panel.getPage;
    panel.getTabs = opts.getTabs || panel.getTabs;
    panel.getActiveTabId = opts.getActiveTabId || panel.getActiveTabId;
    panel.getSelection = opts.getSelection || panel.getSelection;
    panel.onContextChange = opts.onContextChange || panel.onContextChange;
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
      overlay.menu = "skill";
      overlay.skillQuery = slashToken(overlay.prompt)?.query || "";
      overlay.skillHighlight = -1;
      const input = $("askPrompt");
      if (input) input.value = overlay.prompt;
      AskAIComposer.render();
      if (panel.open && !isHome()) Workspace.activate("home");
    },
    submit: AskAIComposer.submit,
    syncTabs() {
      if (!panel.open) return;
      const prevTab = overlay.excerptTabId;
      TabContext.render();
      const active = activeTabId();
      if (prevTab != null && prevTab !== active && !livePageSelection()) {
        clearPageExcerpt();
      }
      SelectionPreview.render();
    },
    getContextTabIds() {
      if (!panel.open) return [];
      syncTabContext();
      return overlay.selectedTabIds.slice();
    },
    providers: PROVIDERS,
  };
})();
