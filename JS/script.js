// 햄버거 메뉴
const sidebar = document.querySelector(".sidebar");
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-open");
  sidebar.classList.toggle("is-open");
  overlay.classList.toggle("is-open");

  document.body.classList.toggle("is-locked");
});

// 스크롤바
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
};

function lockScroll() {
  const scrollBarWidth = getScrollbarWidth();

  document.body.style.paddingRight = `${scrollBarWidth}px`;
};

function unlockScroll() {
  document.body.style.paddingRight = '';
}

// 데이터
const posts = [
  {
    id: 1,
    thumbnail: "../img/JS.png",
    title: "1. JavaScript: 기초",
    info: { date: "2개월 전", view: 10, comment: 15 },
    summary: "Content contetn coneten ContenContent contetn conetenContent contetn conetent contetn coneten Content contetn coneten Content contetn coneten Content contetn conetenContent contetn coneten",
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
  activeTag: null,
  activeSort: 'latest',
  searchKeyword: '',
};

// 게시글 리스트
const postList = document.querySelector('.post__list');

// 데이터 가공 함수
function getDataProcessing(state) {
  let result = [...state.posts];

  // 태그 필터링
  if (state.activeTag !== null) {
    result = result.filter(post => post.tag.includes(state.activeTag));
  }

  // 검색
  if (state.searchKeyword !== "") {
    const keyword = state.searchKeyword.toLowerCase();

    result = result.filter(post =>
      post.title.toLowerCase().includes(keyword) ||
      post.summary.toLowerCase().includes(keyword)
    );
  }

  // 정렬
  if (state.activeSort === "latest") {
    result.sort((a, b) => b.id - a.id);
  } else if (state.activeSort === "views") {
    result.sort((a, b) => b.info.view - a.info.view);
  }

  return result;
};

// 정렬 필터 UI 업데이트 함수
function updateSortButtons(state) {
  const sortButtons = document.querySelectorAll(".post__filtering button");
  sortButtons.forEach((btn) => {
    const isActive = btn.dataset.sort === state.activeSort;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive);
  });
};

// 렌더링
function renderPosts(state) {
  const filteredPosts = getDataProcessing(state);

  updateSortButtons(state);

  postList.innerHTML = filteredPosts.map(post => createPostTemplate(post)).join('');
};

// 게시글 템플릿
function createPostTemplate(post) {
  const article = document.createElement('article');
  article.className = 'post__item';

  const postTags = post.tag.map(tag => `<li class="post__tag-item"><a href="/">#${tag}</a></li>`).join('');

  return `
    <article class="post__item">
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
    </article>
  `;
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

// 검색 이벤트
const searchInput = document.getElementById("header__input");
const searchButton = document.querySelector(".header__button");

searchInput.addEventListener("input", (e) => {
  state.searchKeyword = e.target.value.trim();
  renderPosts(state);
});

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (state.searchKeyword !== "") {
    renderPosts(state);
  } else {
    alert("검색어를 입력해주세요.");
  }
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