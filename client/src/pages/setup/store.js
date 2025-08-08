// src\pages\mdashboard\store.js

const PADDING = 16;
class Store {
  baseBoxHeight = 937 - PADDING;

  padding = PADDING;

  // 仪表盘盒子高度
  boxHeight = window.innerHeight - this.padding * 2;

  // 饼图高度比例。根据之前的效果算出来的
  pieBoxRatio = 0.2;

  // 柱状图高度比例
  barBoxRatio = 0.23;

  // “My Dashboard 我的仪表盘” 高度
  get TitleHeight() {
    const ratio = 80 / this.baseBoxHeight;
    return this.boxHeight * ratio;
  }
  // 运行card高度
  get todayCardHeight() {
    const ratio = 75 / this.baseBoxHeight;
    return this.boxHeight * ratio;
  }

  // “饼图+描述列表+柱状图” body 高度
  get statisticBodyHeight() {
    const ratio = 660 / this.baseBoxHeight;
    return this.boxHeight * ratio;
  }

  // 居住趋势 body 的高度
  get trendBodyBodyHeight() {
    const ratio = 385 / this.baseBoxHeight;
    return this.boxHeight * ratio;
  }

  // xys16 得用 computed 才会联动。下面这种写法不会联动
  get xys16() {
    return (16 / this.baseBoxHeight) * this.boxHeight;
  }

  // 饼状图盒子高度
  get pieBoxHeight() {
    return this.pieBoxRatio * this.boxHeight;
  }

  // card 的 header 比例
  get cardTitleStyle() {
    const cardTitleRatio = 57 / this.baseBoxHeight;
    return {
      display: "flex",
      height: this.boxHeight * cardTitleRatio,
      alignItems: "center",
      justifyContent: "center",
    };
  }
}
