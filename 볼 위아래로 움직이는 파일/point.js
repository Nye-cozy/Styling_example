//웨이브를 그린다기 보다는 간격을 가진 좌표를 하나씩 만들어서 좌표의 Y값을 아래위로 이동시키고 
//각각의 좌표를 하나의 선으로 연결

//Point라는 클래스는 x,y값을 가지고 있고 얼마만큼 움직일 것인가에 대한 max값을 가지고 있다
export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = 0;
        this.max = Math.random() * 100 + 150;

    }

    //update()함수 실행하면 아래 위로 움직임
    update() {
        //현재 값을 speed만큼 증가시켜주고
        this.cur += this.speed;
        //sine 함수를 써서 아래위로 움직일 수 있드록 만듦
        this.y = this.fixedY + (Math.sin(this.cur) * this.max)
    }

}