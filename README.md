# JavaScript Break-Out 게임

<div align="center">
  
<img width="400" alt="게임 플레이" src="https://github.com/doongeon/javascript-break-out/assets/87890694/5fbbbf5f-6135-4d3f-9324-fff3bf0faacf" />
  
only html, css, js

[Click here to try](https://d21775q9xjxwfc.cloudfront.net)

</div>

## 프로젝트 구조
- **`index.html`**: 게임 캔버스가 포함된 HTML 파일.
- **`styles/`**: 게임의 CSS 파일이 있는 폴더.
- **`classes/`**: 게임 로직을 구현하는 클래스 파일이 포함된 폴더.
- **`main.js`**: 게임 초기화 및 설정을 담당하는 파일.

## 주요 클래스

### Ball 클래스
- **속성**: 위치, 속도, 반경
- **메서드**: `draw()`, `move()`, `checkCollision()`

### Paddle 클래스
- **속성**: 위치, 너비, 높이
- **메서드**: `draw()`, `move()`

### Brick 클래스
- **속성**: 위치, 너비, 높이, 상태
- **메서드**: `draw()`, `hit()`

### Game 클래스
- **속성**: `Ball`, `Paddle`, `Brick` 인스턴스 배열, 점수, 생명
- **메서드**: `init()`, `update()`, `draw()`, `checkCollisions()`, `gameOver()`

## 클래스 상호작용
- `Game` 클래스는 `Ball`, `Paddle`, `Brick` 클래스의 인스턴스를 생성하고 관리.
- `Ball` 클래스는 `Paddle` 및 `Brick` 클래스와 충돌 감지를 통해 상호작용.
- `Ball`이 `Paddle`에 충돌하면 반사되고, `Brick`에 충돌하면 벽돌이 파괴됨.
- `Game` 클래스는 각 프레임마다 `Ball`, `Paddle`, `Brick`의 상태를 업데이트하고 화면에 그리는 역할.
