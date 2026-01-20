// 데이터
const posts = [
  {
    id: 1,
    thumbnail: "../img/JS.png",
    title: "1. JavaScript: 기초",
    info: { date: "2개월 전", view: 10, comment: 15 },
    summary: "Content contetn coneten",
    tag: ["css", "javascript", "react"],
    type: "post"
  },
  {
    id: 2,
    thumbnail: "../img/JS.png",
    title: "2. CSS: 기초",
    info: { date: "2개월 전", view: 2, comment: 15 },
    summary: "Content contetn coneten",
    tag: ["react"],
    type: "post"
  },
  {
    id: 3,
    thumbnail: "../img/JS.png",
    title: "3. HTML: 기초",
    info: { date: "2개월 전", view: 6, comment: 15 },
    summary: "Content contetn coneten",
    tag: ["css", "html", "vue"],
    type: "post"
  },
  {
    id: 4,
    thumbnail: "../img/JS.png",
    title: "4. User",
    info: { date: "2개월 전", view: 16, comment: 15 },
    summary: "Hi, my name is Kim",
    tag: ["css", "html", "vue"],
    type: "user"
  },
  {
    id: 5,
    thumbnail: "../img/JS.png",
    title: "5. HTML: 기초",
    info: { date: "2개월 전", view: 8, comment: 15 },
    summary: "안녕하세요, Kenny입니다.",
    tag: ["css", "html", "vue"],
    type: "user"
  },
];

// 상태
let state = {
  posts: posts,
  activeTag: 'all',
  activeSort: 'latest'
}

// 게시글 리스트
const postList = document.querySelector('.post__list');

// 렌더링
function renderPosts(state) {
  postList.innerHTML = '';

  // 태그 필터링
  const filteredPosts = state.activeTag === 'all' ? state.posts : state.posts.filter(post => post.tag.includes(state.activeTag));

  // 정렬
  const sortButtons = document.querySelectorAll(".post__filtering button");
  sortButtons.forEach((btn) => {
    const isActive = btn.dataset.sort === state.activeSort;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });

  if (state.activeSort === "latest") {
    filteredPosts.sort((a, b) => b.id - a.id);
  } else if (state.activeSort === "views") {
    filteredPosts.sort((a, b) => b.info.view - a.info.view);
  }

  console.log(filteredPosts)

  filteredPosts.forEach((post) => {
    const article = document.createElement('article');
    article.className = 'post__item';

    const postTags = post.tag.map((tag) => `<li class="post__tag-item"><a href="/">#${tag}</a></li>`).join('');

    article.innerHTML = `
      <div class="post__thumbnail">
        <img src="${post.thumbnail}" alt="게시글 썸네일">
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


// 태그 이벤트
const tagButtons = document.querySelectorAll(".sidebar__tag-item button");

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    state.activeTag = btn.dataset.tag;
    renderPosts(state);
  });
});

// 정렬 이벤트
const postFilterContainer = document.querySelector(".post__filtering");

postFilterContainer.addEventListener("click", (e) => {
  const btn = e.target.closest("button");

  if (!btn) {
    return;
  }

  state.activeSort = e.target.dataset.sort;
  renderPosts(state);
});

// 검색 필터 이벤트
// const searchForm = document.querySelector(".header__search");
// const headerSelect = document.querySelector(".header__select");

// searchForm.addEventListener("submit", (e) => {
//   state.activeCategory = headerSelect.value;
//   renderPosts({ posts: state.posts })
// });


// 실행
document.addEventListener('DOMContentLoaded', () => {
  renderPosts(state);
});