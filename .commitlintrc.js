/*
 * @Author: kasuie
 * @Date: 2024-05-20 16:45:40
 * @LastEditors: aa
 * @LastEditTime: 2024-05-20 16:45:41
 * @Description: eg. feat: 添加用户登录功能
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // 错误级别：2 表示错误，必须修复
      'always', // 'always' 表示总是应用
      [
        'init',
        'ci', // Continuous Integration
        'wip', // Work in progress
        'feat', // new Features
        'fix',  // Bug Fixes
        'merge', // Merge branch
        'docs', // Documentation
        'style', // Formatting, missing semi colons, etc; no code change
        'refactor', // Refactoring production code
        'perf', // Performance improvements
        'test',
        'chore', // Updating grunt tasks etc; no production code change
        'revert', // Reverts a previous commit
        'build',
      ],
    ],
    'subject-case': [0], // 0表示不校验大小写
  },
};
