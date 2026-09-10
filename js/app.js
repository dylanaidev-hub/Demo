const ICONS = {
  google: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.8 3.3-8.1z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.6l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.7 14.2A6.6 6.6 0 0 1 5.3 12c0-.8.1-1.5.4-2.2V9H2.1A11 11 0 0 0 1 12c0 1.8.4 3.4 1.1 4.9l3.6-2.7z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.6L19.4 4C17.5 2.2 15 1 12 1A11 11 0 0 0 2.1 7.1l3.6 2.8c.9-2.7 3.4-4.5 6.3-4.5z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/><path fill="#fff" d="M9.8 15.6V8.4L15.6 12z"/></svg>`,
  gmail: `<svg viewBox="0 0 24 24"><path fill="#EA4335" d="M1.5 6.5 12 13.5 22.5 6.5V5H1.5z"/><path fill="#FBBC05" d="M1.5 6.5v11h4v-8z"/><path fill="#34A853" d="M18.5 9.5v8h4v-11z"/><path fill="#4285F4" d="M5.5 17.5v-8L12 14.2l6.5-4.7v8z"/></svg>`,
  drive: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M8.5 3h7l7 12H15.5z"/><path fill="#EA4335" d="M8.5 3 1.5 15h7l7-12z"/><path fill="#FBBC05" d="M1.5 15 5 21h14l-3.5-6z"/></svg>`,
  maps: `<svg viewBox="0 0 24 24"><path fill="#34A853" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z"/><circle cx="12" cy="9" r="2.6" fill="#fff"/></svg>`,
  wiki: `<svg viewBox="0 0 24 24"><path fill="#202124" d="M12.2 5.2c.5 0 .8.2 1.3.8l4.2 7.4c.2.3.3.4.6.4h.7v.7h-4.2v-.7h.6c.3 0 .4-.1.3-.4l-1-1.8H8.7l-1.2 2.2c-.1.2 0 .4.3.4h.8v.7H3.8v-.7h.6c.2 0 .4-.1.6-.4l4.6-8.2c.4-.7.8-.8 1.2-.8.3 0 .6.1.9.5l1.6 2.8 1.6-2.8c.3-.4.6-.5.9-.5z"/></svg>`,
  translate: `<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M12.87 15.07l-2.54-2.51.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-2.74z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24"><path fill="#5f6368" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm7.4 8h-3.1a15.3 15.3 0 0 0-1.4-6 8.02 8.02 0 0 1 4.5 6zM12 4c.9 1.2 2 3.5 2.4 6H9.6C10 7.5 11.1 4.2 12 4zM4.3 14a8 8 0 0 1 0-4h3.4a16 16 0 0 0 0 4H4.3zM5.6 16h3.1a15.3 15.3 0 0 0 1.4 6 8.02 8.02 0 0 1-4.5-6zM8.7 10H4.6a8.02 8.02 0 0 1 4.5-6 15.3 15.3 0 0 0-1.4 6zM12 20c-.9-1.2-2-3.5-2.4-6h4.8c-.4 2.5-1.5 4.8-2.4 6zm2.9-2h3.1a8.02 8.02 0 0 1-4.5 6 15.3 15.3 0 0 0 1.4-6zm.4-2a16 16 0 0 0 0-4h3.4a8 8 0 0 1 0 4h-3.4z"/></svg>`,
  news: `<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="5" fill="#E32227"/><path fill="#fff" d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/></svg>`,
};

const PAGES = {
  ntp: {
    title: "Thẻ mới",
    url: "chrome://newtab",
    display: "",
    icon: "google",
    html: ntpHtml(),
  },
  chinhtri: {
    title: "Quốc hội thông qua nghị quyết cải cách thể chế kinh tế",
    url: "https://vnexpress.net/quoc-hoi-thong-qua-nghi-quyet-cai-cach-the-che-kinh-te-4782101.html",
    display: "vnexpress.net/quoc-hoi-thong-qua-nghi-quyet-cai-cach-the-che-kinh-te-4782101.html",
    icon: "news",
    html: newsHtml({
      category: "Chính trị",
      title: "Quốc hội thông qua nghị quyết đẩy mạnh cải cách thể chế kinh tế",
      author: "Minh Anh",
      time: "Thứ Tư, 9/9/2026, 08:15 (GMT+7)",
      lead: "Nghị quyết yêu cầu cắt giảm thủ tục hành chính, phân cấp mạnh cho địa phương và hoàn thiện khung pháp lý cho kinh tế số trong giai đoạn 2026–2030.",
      caption: "Phiên họp toàn thể Quốc hội sáng 9/9. Ảnh: Quốc hội",
      theme: "theme-politics",
      tags: ["Quốc hội", "Cải cách", "Thể chế", "Kinh tế"],
      paragraphs: [
        "Sáng 9/9, với đa số đại biểu tán thành, Quốc hội đã thông qua Nghị quyết về đẩy mạnh cải cách thể chế kinh tế. Văn bản xác định đây là nhiệm vụ trọng tâm nhằm khơi thông nguồn lực, nâng cao năng lực cạnh tranh quốc gia.",
        "Theo nghị quyết, các bộ ngành phải rà soát, bãi bỏ những điều kiện kinh doanh không còn phù hợp trước quý II/2027. Việc phân cấp cho chính quyền địa phương được mở rộng ở lĩnh vực đầu tư, đất đai và cấp phép xây dựng, kèm cơ chế giám sát để tránh buông lỏng quản lý.",
        "Ủy ban Kinh tế cho biết kinh tế số, dữ liệu và trí tuệ nhân tạo sẽ được luật hóa theo hướng vừa khuyến khích đổi mới, vừa bảo vệ quyền riêng tư và an toàn thông tin. Chính phủ được giao xây dựng lộ trình chuyển đổi số cho dịch vụ công, hướng tới người dân chỉ phải cung cấp thông tin một lần.",
        "Nhiều đại biểu nhấn mạnh cải cách thể chế chỉ thành công khi đi cùng trách nhiệm giải trình. Quốc hội sẽ giám sát chuyên đề việc thực hiện nghị quyết vào cuối năm 2027, đồng thời yêu cầu công khai tiến độ cắt giảm thủ tục trên cổng thông tin điện tử.",
      ],
    }),
  },
  vanhoa: {
    title: "Festival Huế 2026 tái hiện nhã nhạc cung đình trên sông Hương",
    url: "https://vnexpress.net/festival-hue-2026-tai-hien-nha-nhac-cung-dinh-tren-song-huong-4782098.html",
    display: "vnexpress.net/festival-hue-2026-tai-hien-nha-nhac-cung-dinh-tren-song-huong-4782098.html",
    icon: "news",
    html: newsHtml({
      category: "Văn hóa",
      title: "Festival Huế 2026 tái hiện nhã nhạc cung đình trên sông Hương",
      author: "Lan Hương",
      time: "Thứ Tư, 9/9/2026, 09:40 (GMT+7)",
      lead: "Đêm khai mạc Festival Huế đưa nhã nhạc cung đình, áo dài và ẩm thực cố đô ra không gian sông nước, thu hút hàng chục nghìn khán giả trong và ngoài nước.",
      caption: "Đêm diễn nhã nhạc trên sông Hương. Ảnh: BTC Festival Huế",
      theme: "theme-culture",
      tags: ["Festival Huế", "Di sản", "Nhã nhạc", "Áo dài"],
      paragraphs: [
        "Tối 8/9, hai bờ sông Hương sáng đèn khi đoàn thuyền rồng đưa các nghệ nhân nhã nhạc cung đình diễn mục “Đăng đàn” trước Kỳ Đài. Đây là lần đầu Festival Huế dựng sân khấu nổi dài gần 200 mét, kết hợp ánh sáng, pháo hoa và âm thanh vòm.",
        "Chương trình năm nay lấy chủ đề “Di sản sống”. Ngoài nhã nhạc — di sản văn hóa phi vật thể của UNESCO — khán giả xem trình diễn áo dài triều Nguyễn, tuồng cung đình và không gian ẩm thực với cơm hến, bánh bèo, chè bột lọc.",
        "Nghệ sĩ ưu tú Thanh Hương, chủ trì dàn nhạc, cho biết các làn điệu được giữ nguyên cách đánh trống, kèn và đàn tỳ bà, chỉ thay đổi cách dàn dựng để phù hợp không gian ngoài trời. “Chúng tôi muốn người trẻ thấy di sản không nằm trong bảo tàng”, bà nói.",
        "Festival kéo dài đến 16/9 với hơn 40 chương trình, gồm triển lãm mỹ thuật, tuần phim châu Á và đêm thơ Nguyên tiêu sớm. UBND thành phố Huế ước tính sự kiện mang lại khoảng 180.000 lượt khách, tăng 15% so với kỳ trước.",
      ],
    }),
  },
  youtube: {
    title: "YouTube",
    url: "https://www.youtube.com",
    display: "youtube.com",
    icon: "youtube",
    html: `
      <div class="yt-page">
        <header class="yt-bar">
          <div class="yt-logo">${ICONS.youtube}<span>YouTube</span></div>
          <div class="yt-search">Tìm kiếm</div>
        </header>
        <p class="yt-heading">Trang chủ</p>
        <div class="yt-grid">
          ${[
            ["Việt Nam 2-0 Thái Lan | Highlights vòng loại", "VTV Sports · 2,4 Tr lượt xem"],
            ["Festival Huế 2026: Đêm nhã nhạc trên sông Hương", "Huế Festival · 412 N lượt xem"],
            ["Quốc hội họp phiên sáng 9/9 | Toàn cảnh", "VTV24 · 890 N lượt xem"],
            ["Top 10 món ăn cố đô không thể bỏ lỡ", "Ẩm thực Việt · 1,1 Tr lượt xem"],
            ["Phân tích chiến thuật trận Việt Nam – Thái Lan", "BLV Vũ · 326 N lượt xem"],
            ["Áo dài triều Nguyễn được phục dựng thế nào?", "Văn hóa 24h · 198 N lượt xem"],
          ].map(([t, s], i) => `<div><div class="thumb yt-thumb-${i}"></div><h3>${t}</h3><p>${s}</p></div>`).join("")}
        </div>
      </div>`,
  },
  gmail: {
    title: "Gmail",
    url: "https://mail.google.com",
    display: "mail.google.com",
    icon: "gmail",
    html: `
      <div class="mail-page">
        <aside class="mail-nav">
          <button class="active">Hộp thư đến</button>
          <button>Có ngôi sao</button>
          <button>Đã gửi</button>
          <button>Nháp</button>
        </aside>
        <div class="mail-list">
          <div class="mail-row"><strong>Google</strong><span>Bảo mật tài khoản — Đăng nhập mới từ Windows</span><span>10:12</span></div>
          <div class="mail-row"><strong>YouTube</strong><span>Video bạn theo dõi: CSS Chrome tabs</span><span>Hôm qua</span></div>
          <div class="mail-row"><strong>Drive</strong><span>Tài liệu “Ask AI Sidepanel” đã được chia sẻ với bạn</span><span>T2</span></div>
        </div>
      </div>`,
  },
  drive: {
    title: "Drive",
    url: "https://drive.google.com",
    display: "drive.google.com",
    icon: "drive",
    html: siteArticle("Google Drive", "drive.google.com", "Lưu trữ tệp của bạn trên Drive và truy cập từ mọi thiết bị.", "Drive giúp bạn tổ chức tệp, thư mục và cộng tác theo thời gian thực. Trong bản demo này, thanh địa chỉ và tab phản ánh đúng trang Drive như trên Chrome."),
  },
  maps: {
    title: "Google Maps",
    url: "https://maps.google.com",
    display: "maps.google.com",
    icon: "maps",
    html: siteArticle("Google Maps", "maps.google.com", "Khám phá địa điểm, chỉ đường và giao thông.", "Đây là trang mô phỏng Maps. Bạn có thể hỏi Ask AI về tuyến đường, địa điểm gần đây, hoặc tóm tắt nội dung đang mở."),
  },
  translate: {
    title: "Google Dịch",
    url: "https://translate.google.com",
    display: "translate.google.com",
    icon: "translate",
    html: siteArticle("Google Dịch", "translate.google.com", "Dịch văn bản và trang web giữa hơn 100 ngôn ngữ.", "Ask AI có thể giúp diễn đạt lại câu, chỉnh ngữ pháp, hoặc giải thích cụm từ trên trang."),
  },
  wiki: {
    title: "Google Chrome – Wikipedia tiếng Việt",
    url: "https://vi.wikipedia.org/wiki/Google_Chrome",
    display: "vi.wikipedia.org/wiki/Google_Chrome",
    icon: "wiki",
    html: wikiHtml(),
  },
  thethao: {
    title: "Việt Nam thắng Thái Lan 2-0, vững ngôi đầu bảng",
    url: "https://vnexpress.net/viet-nam-thang-thai-lan-2-0-vung-ngoi-dau-bang-4782115.html",
    display: "vnexpress.net/viet-nam-thang-thai-lan-2-0-vung-ngoi-dau-bang-4782115.html",
    icon: "news",
    html: newsHtml({
      category: "Thể thao",
      title: "Việt Nam thắng Thái Lan 2-0, vững ngôi đầu bảng vòng loại",
      author: "Đức Đồng",
      time: "Thứ Tư, 9/9/2026, 22:48 (GMT+7)",
      lead: "Hai bàn thắng của Nguyễn Tiến Linh và Phạm Tuấn Hải giúp đội tuyển Việt Nam đánh bại Thái Lan trên sân Mỹ Đình, giữ khoảng cách 3 điểm với nhóm bám đuổi.",
      caption: "Nguyễn Tiến Linh mở tỷ số ở phút 28. Ảnh: Đức Đồng",
      theme: "theme-sport",
      tags: ["Đội tuyển Việt Nam", "Thái Lan", "Vòng loại", "Mỹ Đình"],
      paragraphs: [
        "Trên sân Mỹ Đình tối 9/9, đội tuyển Việt Nam nhập cuộc chủ động và mở tỷ số ở phút 28. Nguyễn Tiến Linh băng vào đón đường chuyền của Văn Hậu, đánh đầu chéo góc, làm tung lưới thủ môn Thái Lan.",
        "Hiệp hai, thầy trò HLV Kim Sang-sik kiểm soát thế trận. Phút 71, Phạm Tuấn Hải tận dụng sai lầm nơi hàng thủ đối phương, sút căng góc xa ấn định thắng lợi 2-0. Khán giả Mỹ Đình gần như không rời chỗ cho đến khi trọng tài thổi còi mãn cuộc.",
        "Với 3 điểm này, Việt Nam có 13 điểm sau 5 trận, vững ngôi đầu bảng. Thái Lan còn 10 điểm, xếp thứ hai. HLV Kim Sang-sik đánh giá các học trò đã “chơi tập trung 90 phút, đặc biệt khâu pressing từ tuyến trên”.",
        "Tiến Linh, người vừa trở lại sau chấn thương, được chọn là cầu thủ hay nhất trận. “Bàn thắng này dành cho khán giả Mỹ Đình. Chúng tôi muốn đi tiếp bằng chính lối chơi của mình”, tiền đạo Hà Nội FC nói sau trận.",
      ],
    }),
  },
};

function ntpHtml() {
  const items = [
    ["YouTube", "youtube", "youtube"],
    ["Gmail", "gmail", "gmail"],
    ["Drive", "drive", "drive"],
    ["Maps", "maps", "maps"],
    ["Wikipedia", "wiki", "wiki"],
  ];
  return `
    <div class="ntp">
      <div class="google-logo" aria-label="Google">
        <span class="g-b">G</span><span class="g-r">o</span><span class="g-y">o</span><span class="g-b">g</span><span class="g-g">l</span><span class="g-r">e</span>
      </div>
      <form class="ntp-search" id="ntpSearch">
        <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#9aa0a6" d="M15.5 14h-.8l-.3-.3a6.5 6.5 0 1 0-.7.7l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"/></svg>
        <input name="q" placeholder="Tìm kiếm Google hoặc nhập URL" />
        <button type="button" class="ntp-ico" title="Tìm kiếm bằng giọng nói">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z"/><path fill="#34A853" d="M19 12a7 7 0 0 1-14 0H3a9 9 0 0 0 8 8.9V23h2v-2.1A9 9 0 0 0 21 12z"/></svg>
        </button>
        <button type="button" class="ntp-ico" title="Tìm kiếm bằng hình ảnh">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="#4285F4" d="M9 3 7.2 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.2L15 3H9z"/><circle cx="12" cy="13" r="4" fill="#fff"/><circle cx="12" cy="13" r="2.4" fill="#4285F4"/></svg>
        </button>
      </form>
      <div class="shortcuts">
        ${items.map(([label, icon, key]) => `
          <button class="shortcut" data-page="${key}">
            <span class="shortcut-icon">${ICONS[icon]}</span>
            ${label}
          </button>`).join("")}
      </div>
      <button class="customize">
        <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M3 17.2V21h3.8l11-11.1-3.8-3.8L3 17.2zM20.7 7.3c.4-.4.4-1 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-2 2 3.8 3.8 2.2-1.8z"/></svg>
        Tùy chỉnh Chrome
      </button>
    </div>`;
}

function newsHtml(a) {
  return `
    <div class="news">
      <header class="news-top">
        <div class="news-brand">VnExpress</div>
        <nav>Thời sự · Thế giới · Kinh doanh · Giải trí · Thể thao · Đời sống</nav>
      </header>
      <article class="news-detail">
        <div class="news-cat">${a.category}</div>
        <h1>${a.title}</h1>
        <div class="news-meta"><strong>${a.author}</strong> · ${a.time}</div>
        <p class="news-lead">${a.lead}</p>
        <figure class="news-hero ${a.theme}">
          <figcaption>${a.caption}</figcaption>
        </figure>
        ${a.paragraphs.map((p) => `<p>${p}</p>`).join("")}
        <div class="news-tags">${a.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </article>
    </div>`;
}

function siteArticle(title, host, lead, body) {
  return `
    <div class="site">
      <div class="site-hero">
        <div class="kicker">${host}</div>
        <h1>${title}</h1>
        <p>${lead}</p>
      </div>
      <div class="article">
        <p>${body}</p>
        <h2>Dùng Ask AI</h2>
        <p>Nhấn nút <strong>Ask AI</strong> trên thanh công cụ để mở side panel bên phải. Bạn có thể hỏi về trang đang xem, nhờ tóm tắt, hoặc trò chuyện tự do.</p>
      </div>
    </div>`;
}

function wikiHtml() {
  return `
    <div class="wiki">
      <header class="wiki-top">
        <span class="wiki-mark">W</span>
        <span>Wikipedia</span>
        <span class="wiki-lang">tiếng Việt</span>
      </header>
      <div class="wiki-body">
        <h1>Google Chrome</h1>
        <p class="wiki-desc">Từ Wikipedia, bách khoa toàn thư mở</p>
        <p><b>Google Chrome</b> là trình duyệt web miễn phí do Google phát triển, phát hành lần đầu ngày 2 tháng 12 năm 2008. Chrome nổi bật với thanh địa chỉ Omnibox, kiến trúc đa tiến trình và công cụ JavaScript V8.</p>
        <h2>Giao diện</h2>
        <p>Chrome dùng thanh thẻ nằm trên cùng, thanh công cụ với các nút Quay lại, Tiến tới, Tải lại, rồi đến Omnibox. Bên phải thường có tiện ích, ảnh đại diện tài khoản và menu ba chấm. Side panel của Chrome mở ở mép phải và thu hẹp vùng nội dung trang.</p>
        <h2>Ask AI</h2>
        <p>Trong bản mô phỏng này, nút Ask AI mở một khung chat ngay trong side panel — giống cách Chrome đặt Reading list, Bookmark hay Gemini. Bạn có thể yêu cầu tóm tắt bài viết Wikipedia này.</p>
        <h2>Kiến trúc</h2>
        <p>Mỗi thẻ chạy trong tiến trình riêng để một trang lỗi không làm sập cả trình duyệt. Cùng với sandbox, đây là lý do Chrome được xem là nền tảng ổn định cho web hiện đại.</p>
        <h2>Thị phần</h2>
        <p>Từ những năm 2010, Chrome trở thành trình duyệt phổ biến nhất trên máy tính để bàn. Các phiên bản cho Android, iOS, Linux và ChromeOS dùng chung nền tảng Chromium mã nguồn mở.</p>
      </div>
    </div>`;
}

function serpHtml(query) {
  const q = escapeHtml(query);
  return `
    <div class="serp">
      <div class="serp-stats">Khoảng 12.400.000 kết quả (0,32 giây)</div>
      <div class="result">
        <div class="url">https://vi.wikipedia.org › wiki</div>
        <h3>${q} – Wikipedia tiếng Việt</h3>
        <p>Bài viết bách khoa về ${q}. Nguồn mở, được cộng đồng đóng góp và kiểm tra.</p>
      </div>
      <div class="result">
        <div class="url">https://www.google.com › search</div>
        <h3>${q} – Kết quả từ Google</h3>
        <p>Đây là trang kết quả mô phỏng. Mở Ask AI để nhờ giải thích, tóm tắt, hoặc hỏi thêm về “${q}”.</p>
      </div>
      <div class="result">
        <div class="url">https://developer.chrome.com</div>
        <h3>Chrome for Developers</h3>
        <p>Tài liệu Side Panel API, tab, và tiện ích — hữu ích nếu bạn muốn xây Ask AI như một extension thật.</p>
      </div>
    </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

let tabId = 1;
const tabs = [];
let activeId = null;
const historyMap = {};

const $ = (id) => document.getElementById(id);
const tabStrip = $("tabStrip");
const pageEl = $("page");
const urlInput = $("urlInput");
const omnibox = $("omnibox");
const askAiBtn = $("askAiBtn");
const sidePanel = $("sidePanel");
const backBtn = $("backBtn");
const fwdBtn = $("fwdBtn");

function createTab(pageKey = "ntp", extra = null, activate = true) {
  const page = extra || { ...PAGES[pageKey] };
  const id = tabId++;
  const tab = { id, ...page, pageKey };
  tabs.push(tab);
  historyMap[id] = { stack: [{ ...page, pageKey }], index: 0 };
  if (activate) activateTab(id);
  else renderTabs();
  return id;
}

function activateTab(id) {
  activeId = id;
  renderTabs();
  renderPage();
  updateNav();
}

function closeTab(id, e) {
  e?.stopPropagation();
  const i = tabs.findIndex((t) => t.id === id);
  if (i < 0) return;
  tabs.splice(i, 1);
  delete historyMap[id];
  if (!tabs.length) {
    createTab("ntp");
    return;
  }
  if (activeId === id) activateTab(tabs[Math.max(0, i - 1)].id);
  else renderTabs();
}

function currentTab() {
  return tabs.find((t) => t.id === activeId);
}

function currentHistory() {
  return historyMap[activeId];
}

function renderTabs() {
  tabStrip.innerHTML = tabs.map((t) => `
    <div class="tab ${t.id === activeId ? "active" : ""}" data-id="${t.id}" title="${escapeHtml(t.title)}">
      <div class="tab-bg"></div>
      <span class="tab-favicon">${ICONS[t.icon] || ICONS.globe}</span>
      <span class="tab-title">${escapeHtml(t.title)}</span>
      <button class="tab-close" data-close="${t.id}" title="Đóng" aria-label="Đóng">
        <svg viewBox="0 0 12 12" width="10" height="10"><path d="M2.2 2.2l7.6 7.6M9.8 2.2 2.2 9.8" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>
      </button>
    </div>`).join("");

  tabStrip.querySelectorAll(".tab").forEach((el) => {
    el.addEventListener("click", () => activateTab(Number(el.dataset.id)));
  });
  tabStrip.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", (e) => closeTab(Number(el.dataset.close), e));
  });
}

const ICON_INFO = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2a10 10 0 1 0 .01 20.01A10 10 0 0 0 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
const ICON_LOCK = `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm9 14H6V10h12v10z"/></svg>`;

function renderPage() {
  const t = currentTab();
  if (!t) return;
  pageEl.innerHTML = t.html;
  urlInput.value = t.display;
  urlInput.placeholder = t.display ? "" : "Tìm kiếm Google hoặc nhập URL";
  document.title = t.title;
  const secure = (t.url || "").startsWith("https://");
  $("siteInfo").innerHTML = secure ? ICON_LOCK : ICON_INFO;
  $("siteInfo").title = secure ? "Kết nối an toàn" : "Thông tin trang";
  playLoad();
  bindPageEvents();
}

function playLoad() {
  const bar = $("loadBar");
  const icon = $("reloadIcon");
  bar.classList.remove("running");
  void bar.offsetWidth;
  bar.classList.add("running");
  icon.classList.remove("reload-spin");
  void icon.offsetWidth;
  icon.classList.add("reload-spin");
}

function bindPageEvents() {
  const form = $("ntpSearch");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = form.q.value.trim();
      if (q) navigateToSearch(q);
    });
  }
  pageEl.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => navigateToKey(btn.dataset.page));
  });
}

function navigateToKey(key, push = true) {
  const page = PAGES[key];
  if (!page) return;
  const t = currentTab();
  Object.assign(t, page, { pageKey: key });
  if (push) pushHistory({ ...page, pageKey: key });
  renderTabs();
  renderPage();
  updateNav();
}

function navigateToSearch(q) {
  const page = {
    title: `${q} - Tìm kiếm Google`,
    url: `https://www.google.com/search?q=${encodeURIComponent(q)}`,
    display: q,
    icon: "google",
    pageKey: "search",
    html: serpHtml(q),
    query: q,
  };
  Object.assign(currentTab(), page);
  pushHistory(page);
  renderTabs();
  renderPage();
  updateNav();
}

function navigateToUrl(raw) {
  const value = raw.trim();
  if (!value) return;
  const lower = value.toLowerCase();
  const map = {
    "youtube.com": "youtube",
    "www.youtube.com": "youtube",
    "mail.google.com": "gmail",
    "drive.google.com": "drive",
    "maps.google.com": "maps",
    "translate.google.com": "translate",
    "wikipedia.org": "wiki",
    "vi.wikipedia.org": "wiki",
    "chrome://newtab": "ntp",
  };
  if (lower.includes("cai-cach-the-che") || lower.includes("chinh-tri")) return navigateToKey("chinhtri");
  if (lower.includes("festival-hue") || lower.includes("van-hoa")) return navigateToKey("vanhoa");
  if (lower.includes("thai-lan") || lower.includes("the-thao") || lower.includes("thethao")) return navigateToKey("thethao");
  if (lower.includes("vnexpress.net") && lower.includes("4782101")) return navigateToKey("chinhtri");
  if (lower.includes("vnexpress.net") && lower.includes("4782098")) return navigateToKey("vanhoa");
  if (lower.includes("vnexpress.net") && lower.includes("4782115")) return navigateToKey("thethao");
  try {
    const host = value.includes("://") ? new URL(value).host.replace(/^www\./, "") : "";
    const key = map[lower] || map[host] || map[host.replace(/^www\./, "")];
    if (key) return navigateToKey(key);
  } catch { /* ignore */ }
  if (/^[a-z0-9.-]+\.[a-z]{2,}/i.test(value) || value.startsWith("http")) {
    const title = value.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const page = {
      title,
      url: value.startsWith("http") ? value : `https://${value}`,
      display: title,
      icon: "globe",
      pageKey: "web",
      html: siteArticle(title, title, `Đã mở ${title}`, "Đây là trang mô phỏng. Ask AI vẫn trả lời được dựa trên URL và tiêu đề thẻ."),
    };
    Object.assign(currentTab(), page);
    pushHistory(page);
    renderTabs();
    renderPage();
    updateNav();
    return;
  }
  navigateToSearch(value);
}

function pushHistory(page) {
  const h = currentHistory();
  h.stack = h.stack.slice(0, h.index + 1);
  h.stack.push({ ...page });
  h.index = h.stack.length - 1;
}

function go(delta) {
  const h = currentHistory();
  const next = h.index + delta;
  if (next < 0 || next >= h.stack.length) return;
  h.index = next;
  Object.assign(currentTab(), h.stack[next]);
  renderTabs();
  renderPage();
  updateNav();
}

function updateNav() {
  const h = currentHistory();
  backBtn.disabled = !h || h.index <= 0;
  fwdBtn.disabled = !h || h.index >= h.stack.length - 1;
}

function bindChrome() {
  $("newTabBtn").addEventListener("click", () => createTab("ntp"));
  $("reloadBtn").addEventListener("click", () => renderPage());
  backBtn.addEventListener("click", () => go(-1));
  fwdBtn.addEventListener("click", () => go(1));

  urlInput.addEventListener("focus", () => {
    omnibox.classList.add("focused");
    urlInput.value = currentTab()?.url || "";
    urlInput.select();
  });
  urlInput.addEventListener("blur", () => {
    omnibox.classList.remove("focused");
    urlInput.value = currentTab()?.display || "";
  });
  urlInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      navigateToUrl(urlInput.value);
      urlInput.blur();
    }
  });

  document.querySelectorAll(".bm").forEach((bm) => {
    bm.addEventListener("click", () => {
      const url = bm.dataset.url;
      navigateToUrl(url);
    });
  });

  askAiBtn.addEventListener("click", () => AskAI.toggle());

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "t") {
      e.preventDefault();
      createTab("ntp");
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "w") {
      e.preventDefault();
      closeTab(activeId);
    }
  });

  const resizer = $("panelResizer");
  let dragging = false;
  resizer.addEventListener("mousedown", (e) => {
    dragging = true;
    e.preventDefault();
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const w = Math.min(560, Math.max(300, window.innerWidth - e.clientX));
    sidePanel.style.width = w + "px";
  });
  window.addEventListener("mouseup", () => { dragging = false; });
}

const DEMO_TABS = ["chinhtri", "vanhoa", "youtube", "wiki", "thethao"];
DEMO_TABS.forEach((key, i) => createTab(key, null, i === 0));
AskAI.init({
  getPage: () => currentTab(),
  getSelection() {
    const sel = window.getSelection();
    const text = sel ? String(sel.toString()).trim() : "";
    if (!text) return "";
    const page = $("page");
    if (sel.anchorNode && page && !page.contains(sel.anchorNode)) return "";
    return text.slice(0, 500);
  },
});
bindChrome();

const params = new URLSearchParams(location.search);
const tabParam = params.get("tab") || params.get("page");
if (tabParam) {
  const found = tabs.find((t) => t.pageKey === tabParam);
  if (found) activateTab(found.id);
  else if (PAGES[tabParam]) navigateToKey(tabParam);
}
if (location.hash === "#ask-ai" || params.has("ask")) {
  AskAI.setOpen(true);
}
if (params.get("msg")) {
  AskAI.fillPrompt(params.get("msg"));
  if (params.has("send")) AskAI.submit();
}
