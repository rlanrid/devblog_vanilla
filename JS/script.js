// 데이터
const posts = [
  {
    id: 1,
    thumbnali: '../img/JS.png',
    title: 'JavaScript: 기초',
    info: { date: "2개월 전", view: 30, comment: 15 },
    summary: 'Content contetn coneten',
    tag: ["css", "javascript", "react"]
  },
  {
    id: 2,
    thumbnali: '../img/JS.png',
    title: 'CSS: 기초',
    info: { date: "2개월 전", view: 30, comment: 15 },
    summary: 'Content contetn coneten',
    tag: ["react"]
  },
  {
    id: 3,
    thumbnali: '../img/JS.png',
    title: 'HTML: 기초',
    info: { date: "2개월 전", view: 30, comment: 15 },
    summary: 'Content contetn coneten',
    tag: ["css", "html", "vue"]
  }
];

// 상태
let activeTag = 'all';

// 게시글 리스트
const postList = document.querySelector('.post__list');

// 렌더링
function renderPosts(posts) {
  postList.innerHTML = '';

  // 태그 필터링
  const filteredPosts = activeTag === 'all' ? posts : posts.filter(post => post.tag.includes(activeTag));

  filteredPosts.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'post__item';

    const postTags = post.tag.map((tag) => `<li class="post__tag-item"><a href="/">#${tag}</a></li>`).join('');

    article.innerHTML = `
      <div class="post__thumbnail">
        <img src="${post.thumbnali}" alt="게시글 썸네일">
      </div>
      <div class="post__content">
        <h2 class="post__title">
          <a href="/">${post.title}</a>
        </h2>
        <div class="post__info">
          <span>${post.info.date}</span>
          <span class="dot"></span>
          <span>${post.info.view} 조회수</span>
          <span class="dot"></span>
          <span>${post.info.comment} 댓글</span>
        </div>
        <div class="post__summary">
          ${post.summary}
        </div>
        <div class="post__tags">
          <ul class="post__tag-list">
            ${postTags}
          </ul>
        </div>
      </div>
    `;

    postList.appendChild(article);
  });
};


// 태그 버튼
const tagButtons = document.querySelectorAll(".sidebar__tag-item button");

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeTag = btn.dataset.tag;
    renderPosts(posts);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  renderPosts(posts);
});