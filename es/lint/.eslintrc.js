/**
 * https://eslint.org/docs/rules/
 */

module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
      "semi": "error",
      // 数组方法map,every,filter,some,find,findIndex等类似回调函数需要有return值
      "array-callback-return": "warn",
      // 继承子类的constructor中必须调用super函数
      "constructor-super": "error",
      // for循环，避免显式死循环
      "for-direction": "error",
    }
};
