import { WaveGroup } from './wavegroup.js'

class App {
    constructor() {
        //캔버스 생성
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.waveGroup = new WaveGroup();

        //리사이즈 이벤트 걸기
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //requestAnimationFrame로 애니메이션 시작
        requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        //resize 이벤트에서는 캔버스를 더블 사이즈로 지정
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        //this.wave.resize(this.stageWidth, this.stageHeight);
        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    //레티나 디스플레이에서도 잘 보일 수 있게 만듦
    animate(t) {
        //캔버스 클리어 하는걸 animate()함수에 추가
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        //this.wave.draw(this.ctx)
        this.waveGroup.draw(this.ctx)

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};