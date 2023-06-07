/** .prettierrc.js 主要控制代码编写格式
 * 注意：需要在VSCode中安装prettier插件
 * 在本文件中修改格式化规则，不会同时触发改变ESLint代码检查，所以每次修改本文件需要重启VSCode，ESLint检查才能同步代码格式化
 * 需要相应的代码格式化规范请自行查阅配置，下面为默认项目配置
 */
module.exports = {
  printWidth: 150, // 一行最多多少个字符
  tabWidth: 2, // 指定每个缩进级别的空格数
  useTabs: false, // 是否使用制表符缩进
  semi: false, // 在语句末尾是否需要分号
  singleQuote: true, // 是否使用单引号
  quoteProps: 'as-needed', // 对象里的属性名是否要需要加引号，可选值<as-needed|consistent|preserve> as-needed：按需
  trailingComma: 'none', // 多行时是否使用尾随逗号，可选值"<none|es5|all>"
  bracketSpacing: true, // 是否在对象大括号间打印空格
  arrowParens: 'avoid', // 箭头函数参数的括号展示

  jsxSingleQuote: false, // JSX中是否使用单引号
  jsxBracketSameLine: false, // JSX中把'>' 是否单独放一行

  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false, // 指定要使用的解析器，不需要写文件开头的 @prettier
  insertPragma: false, // 不需要自动在文件开头插入 @prettier

  proseWrap: 'preserve', // 使用默认的折行标准 always\never\preserve
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  //在 windows 操作系统中换行符通常是回车 (CR) 加换行分隔符 (LF)，也就是回车换行(CRLF)，
  //然而在 Linux 和 Unix 中只使用简单的换行分隔符 (LF)。
  //对应的控制字符为 "\n" (LF) 和 "\r\n"(CRLF)。auto意为保持现有的行尾
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'auto'
}
