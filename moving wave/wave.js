//애니메이션 할 때 중요한 것은 내가 그리고자 하는 것의 좌표값 들고 오는것

import { Point } from "./point.js";



//그러기 위해서는 애니메이션의 크기를 알아야 한다
export class Wave {
    //포인트에 동시에 아래위로 움직이면 웨이브처럼 안보이고 선처럼 보여져서 고유 인덱스 넘버를 넘겨서
    //웨이브가 약간 좀 차이를 두고 움직일 수 있게
    //Y 위치가 다른 Point가 되도록
    constructor(index, totalPoints, color) {
        this.index = index;
        this.totalPoints = totalPoints;
        this.color = color;
        this.point = [];

    }
    //그래서 스테이지의 넓이와 높이를 가져오는게 중요
    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;

        //이 웨이브는 화면의 중간에 그려지기 때문에 centerX와 centerY를 정하는데
        //centerX는 스테이지 넓이의 반, certerY는 높이의 반
        this.centerX = stageWidth / 2;
        this.centerY = stageHeight / 2;

        //totalPoints를 넘겨줘서 몇 개의 포인트를 생성할 것이지 각각 Wave마다 정의

        //Point의 간격은 스테이지 넓이에서 totalPoints값 만큼 나눈것
        this.pointGap = this.stageWidth / (this.totalPoints - 1);

        this.init();
    }
    //위 처럼 centerX와 centerY가 정해진 다음에(즉 resize이벤트가 일어난 다음에)
    //init()함수는 실행시켜서 Point를 생성

    //생성된 Point에는 아까 resize 이벤트에서 정의했던 centerX와 centerY를 넘겨줘서 각각의 포인트가 화면
    //중간을 기준으로 그려질 수 있도록 정의
    init() {

        this.points = [];

        //간격에 맞춰서 포인트를 화면에 그려준다
        for (let i = 0; i < this.totalPoints; i++) {
            const point = new Point(
                this.index + 1,
                this.pointGap * i,
                this.centerY,
            );
            this.point[i] = point;
        }
    }
    //draw함수에는 실제로 캔버스에 그리는 함수가 들어감
    //업데이트된 point갯수에 맞춰서 draw함수도 업데이트
    //color 값도 현재 Wave의 color 값으로 정의
    //처음 point와 마지막 point는 움직이지 않고 가운데 point들만 아래위로 움직여서 웨이브의 움직임 만듦
    //그러기 위해서 Point의 index값을 확인하고 index가 0이거나 totla-1과 같으면(마지막 인덱스이면) update() 실행안함
    //그 외의 index일 경우에만 update()함수를 실행

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;

        let prevX = this.points[0].x;
        let prevY = this.points[0].y;

        ctx.moveTo(prevX, prevY);

        for (let i = 1; i < this.totalPoints; i++) {
            if (i < this.totalPoints - 1) {
                this.points[i].update();
            }

            //일단 포인트를 연결할때 선으로 연결해서 어떻게 움직이는지 확인을 먼저
            //그런 다음에 선을 곡선으로 바꿔서 실제 웨이브가 움직이는 걸 확인
            const cx = (prevX + this.points[i].x) / 2;
            const cy = (prevY + this.points[i].y) / 2;

            //직선
            ctx.lineTo(cx, cy);

            //곡선
            //ctx.quadraticCurveTo(cx, cy);

            //현재 point의 x,y좌표를 적는 것이 아니라 이전 point의 x,y좌표에 현재 point의 x,y 좌표를 반으로 나눈 값
            //즉 그 중간값을 적어준다
            prevX = this.points[i].x;
            prevY = this.points[i].y;
        }

        // this.point.update();

        // ctx.arc(this.point.x, this.point.y, 30, 0, 2 * Math.PI);
        // ctx.fill();

        ctx.lineTo(prevX, prevY);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}