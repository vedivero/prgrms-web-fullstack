window.onload = function () {
   createImageCard();
};

const IMAGE_CONTAINER = document.getElementById('imageContainer');

// 1. 이미지 카드 나타내기
function createImageCard() {
   const IMAGE_CARD_CNT = 10;

   for (let i = 1; i <= IMAGE_CARD_CNT; i++) {
      const title = '사진 ' + i;
      const card = document.createElement('div');
      card.className = 'image-card';
      card.setAttribute('data-id', i);

      card.innerHTML = `
            <img
                src=https://picsum.photos/id/${10 + i}/200/300/
                alt=${title}
                class=""
                onclick="copyImage('${title}')"
            >
            <h3>${title}</h3>
            <p>이미지 설명 ${i}</p>
            <button class="like-btn" id="like_btn">좋아요</button>
            <div class="comments">
                <ul class="comment-list">
                    <li>amazing
                        <span class="comment-timestamp">
                            날짜
                        </span>
                    </li>
                </ul>
            </div>
            <form class="comment-form">
                <input type="text" placeholder="코멘트 작성"/>
                <button type="submit">작성</button>
            </form>`;

      IMAGE_CONTAINER.append(card);
   }
}

document.addEventListener('DOMContentLoaded', () => {
   setImageSearchEvent();
   setCommentEvent();
   setLikeButtonEvent();
});

// 2. 이미지 검색하기
function setImageSearchEvent() {
   const searchForm = document.getElementById('search-form');
   const searchInput = searchForm.querySelector('input');

   searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchKeyword = searchInput.value.trim();

      handleSearch(searchKeyword);
   });
}

function handleSearch(searchKeyword) {
   const cards = document.querySelectorAll('.image-card');

   if (searchKeyword === '') {
      cards.forEach((card) => {
         card.style.display = 'block';
      });
   } else {
      cards.forEach((card) => {
         const title = card.querySelector('h3').textContent;
         if (title.includes(searchKeyword)) card.style.display = 'block';
         else card.style.display = 'none';
      });
   }
}

// 3. 이미지 복사하기
function copyImage(title) {
   let lastChar = title.trim().slice(-1);
   const number = parseInt(lastChar, 10);

   let checkPronunciation = [1, 3, 6, 7, 8].includes(number) ? '이' : '가';

   const text = checkPronunciation + ' 클립보드에 복사되었습니다.';
   alert(title + text);
}

// 4. 댓글 작성하기
function setCommentEvent() {
   IMAGE_CONTAINER.addEventListener('submit', (event) => {
      event.preventDefault();

      if (event.target.classList.contains('comment-form')) {
         const commentInput = event.target.querySelector('input');
         const commentText = commentInput.value.trim();

         if (commentText === '') {
            alert('댓글 내용을 입력해 주세요.');
            return;
         } else {
            addComment(event.target, commentText);
            commentInput.value = '';
         }
      }
   });
}

function addComment(form, commentText) {
   const commentsContainer = form.closest('.image-card')?.querySelector('.comment-list');

   const currentComments = commentsContainer.querySelectorAll('li');

   if (currentComments.length >= 5) {
      alert('하나의 이미지에는 5개의 댓글만 추가할 수 있습니다.');
      return;
   }

   const commentItem = document.createElement('li');
   commentItem.textContent = commentText;

   const timestamp = document.createElement('span');
   timestamp.className = 'comment-timestamp';
   timestamp.textContent = ` (${new Date().toLocaleString()})`;
   commentItem.appendChild(timestamp);

   commentsContainer.appendChild(commentItem);
}

// 5. 좋아요
function setLikeButtonEvent() {
   IMAGE_CONTAINER.addEventListener('click', (event) => {
      if (event.target.classList.contains('like-btn')) {
         handleLike(event.target);
      }
   });
}

function handleLike(button) {
   const card = button.closest('.image-card');

   let currentCount = parseInt(button.dataset.likeCount) || 0;

   if (currentCount >= 5) {
      alert('하나의 이미지에는 5번의 좋아요만 누를 수 있습니다.');
      return;
   }

   currentCount += 1;
   button.dataset.likeCount = currentCount;

   button.textContent = `좋아요 ${currentCount}`;
}
