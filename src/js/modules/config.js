/** Config */

const Config = {
  Actor: {
    height: 1.8,
    speed: 5,
  },
  Controller: {
    bind: {
      UI_UP: ['arrowup', 'w'],
      UI_DOWN: ['arrowdown', 's'],
      UI_LEFT: ['arrowleft', 'a'],
      UI_RIGHT: ['arrowright', 'd'],
      UI_JUMP: [' '],
    }
  },
  Event: {
    UI_LEFT: 'UI_LEFT',
    UI_RIGHT: 'UI_RIGHT',
    UI_UP: 'UI_UP',
    UI_DOWN: 'UI_DOWN',
    UI_JUMP: 'UI_JUMP',
  },
};

export default Config;
