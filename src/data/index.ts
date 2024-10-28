export interface StageContent {
  imgUrl: string
  title: string
  description: string,
  btnUrl: string
}
export const stagesContent: StageContent[] = [
  {
    imgUrl: '/cake_modal.png',
    // title: 'Let’s make a cake!',
    title: '做个蛋糕!',
    description: '嗯...既然是你的生日, 干脆来试一下自己做一个蛋糕？开始要制作面团，然后放入烤箱烘焙，最后涂上喜欢的奶油等等。大概就是这样，准备好了吗？',
    // btnUrl: 'Okay, Let‘s go',
    btnUrl: '准备好了，开始吧'
  },
  {
    imgUrl: '/mix_modal.png',
    // title: 'Mix successful!',
    title: '融合均匀!',
    // description: 'Congratulations, the mixture is perfect! After pouring the mixture into a baking tin, it’s now time to put it in our digital oven for about 3 seconds. That should be enough time for a nice spongy base.',
    description: '真不错，一点颗粒都看不到! 先去把烤箱预热下，你呢就歇一会儿。哦对了，因为是鼠标点击或者屏幕触摸，所以刚刚说的越大力越快是骗人的。\n下一步，把做好的面糊放入烤箱。',
    btnUrl: '预热好了，放进来'
  },
  {
    imgUrl: '/oven_modal.png',
    title: '烤焙完成!',
    description: '叮！时间到了，拿出来看一下吧。看到表面隆起一定高度又往下塌，说明就已经熟透了。晾一会儿，热气排空，接下来就可以往上涂奶油层了。',
    btnUrl: '拿出你的奶油枪'
  },
]

export interface SeasonOption<T = 'base' | 'filling'> {
  color: string
  name: string,
  type: T
}
export const baseOptions: SeasonOption<'base'>[] = [
  {
    color: '#ffd296',
    // name: 'Vanilla',
    name: '香草',
    type: 'base',
  },
  {
    color: '#f74352c7',
    // name: 'Pink',
    name: '糖果',
    type: 'base',
  },
  {
    color: '#d5ccb2',
    // name: 'Fruit',
    name: '开心果',
    type: 'base',
  }
]
export const fillingOptions: SeasonOption<'filling'>[] = [
  {
    color: '#ffffff',
    // name: 'Cream',
    name: '奶油',
    type: 'filling',
  },
  {
    color: '#e1dcff',
    // name: 'Jam',
    name: '芋泥流心',
    type: 'filling',
  },
  {
    color: '#9f3d28',
    // name: 'Choc',
    name: '提拉米苏',
    type: 'filling',
  },
  {
    color: '#ff99a3',
    // name: 'Jam',
    name: '玫瑰千层',
    type: 'filling',
  },
  {
    color: '#f7cb76',
    // name: 'Lemon',
    name: '芒果',
    type: 'filling',
  }
]