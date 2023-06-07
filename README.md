# tmpl-prj

node v18.15.0

## Project

```sh
npm install
npm run dev
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

```sh
"dev": "vite" 🔀 "dev": "vite --force --host"
```
为了获取本地IP，可以在配置的时候加上--host，方便自动获取本地网络地址；由于Vite的快是因为它将代码分为依赖和源码，依赖大多数时间不会改变，所以在开发运行中，依赖只会请求一次，而如果我们更新了依赖，浏览器没有同步更新就可能会造成运行错误，所以可以在脚本内添加--force来避免错误，每次启动运行脚本就会更新依赖，避免浏览器的强缓存所带来的影响