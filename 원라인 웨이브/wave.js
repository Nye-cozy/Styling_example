import { Point } from './point.js';

export class Wave {
    constructor(color) {
        this.color = color;
        this.points = [];
        this.numberOfPoints = 6;
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        /* 중간을 각각 넓이, 높이를 2로 나눈 값으로 지정 */
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        /* 
        각 점의 간격은 `전체 넓이 / (전체 점의 숫자 - 1)` 이 됩니다.  
        이렇게 점의 간격을 나누면 화면의 시작부터 끝까지 고른 간격으로 점을 찍을 수 있습니다.
        */
        this.pointGap = this.stageWidth / (this.numberOfPoints - 1);

        /* 초기화 함수로 넘어가기 */
        this.init();
    }

    init() {
        /* 가운데 하나의 점 만들기 */
        // this.point = new Point(this.centerX, this.centerY);

        /* 
        points에 각각의 점의 좌표와 인덱스를 넣어줍니다. 
        인덱스를 넣어주는 이유는 각 점의 위치에 따라 파동이 움직이는 모양도 다르게 하기 위해서입니다.
        */
        for (let i = 0; i < this.numberOfPoints; i++) {
            this.points[i] = new Point(i, this.pointGap * i, this.centerY);
        }
    }

    draw(ctx) {
        /*
        그리기의 경로를 시작하는 메소드
        https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
        https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
        */
        ctx.beginPath();

        /* 곡선을 위해 이전의 좌표 기억하기 */
        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        /* 점의 시작점으로 붓 이동하기 */
        ctx.moveTo(prevX, prevY);

        for (let i = 0; i < this.numberOfPoints; i++) {
            /* 
            호(arc)를 그리는 메소드를 이용하여 원을 그림 
            2 * Math.PI = 반지름 * 2 = 지름
            */
            // ctx.arc(this.points[i].x, this.points[i].y, 30, 0, 2 * Math.PI);

            /* 각 좌표에 선 긋기 */
            // ctx.lineTo(this.points[i].x, this.points[i].y);

            /* 
            각 좌표에 곡선 긋기
            https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
            */
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            ctx.quadraticCurveTo(prevX, prevY, cx, cy);

            /* 곡선을 그리기 위해 이전 좌표 업데이트하기 */
            prevX = this.points[i].x;
            prevY = this.points[i].y;

            /* 공의 위치 변경하기 */
            if (i != 0 && i != this.numberOfPoints - 1) {
                this.points[i].update();
            }
        }

        /* 붓을 오른쪽 모서리부터 왼쪽 모서리 그리고 첫번째 점 위치까지 옮기면서 색칠해줍니다. */
        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(0, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.points[0].y);

        /* 색상 RED & 채우기 */
        ctx.fillStyle = '#ff0000';
        ctx.fill();

        /* 붓 끝내기 */
        ctx.closePath();
    }
}