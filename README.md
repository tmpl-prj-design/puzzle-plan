# Puzzle-CLI

版本说明：Vue3 + ViteJS + ElementPlus NodeJS(v18.15.0)
## 一、介绍
Puzzle-CLI 是一个基于Vue.js进行快速开发的完整系统。

依据公司产品定制，内置常规依赖库、方法库，提供各插件预配置，另外内置常见业务场景。旨在帮助产品快速进入业务功能开发阶段，降低开发成本，提升代码质量。

## 二、命令
```sh
npm install   # 安装依赖库
npm run dev   # 本地开发
npm run build # 构建
```

## 三、开发 & 部署
### 1、规范
建议：VsCode安装中安装 `Prettier` `ESLint` 插件。

引入 `.prettierrc.js` 设置与代码格式相关的配置，如代码缩进，句末是否需要分号等;

引入 `.eslintrc.js` 设置代码规则相关的配置，如日志，组件命名，全局变量等。

### 2、SAAS部署
当需要根据不同客户，提供定制化的产品时，一般需要引入环境变量来控制产品功能。

**操作流程**：
- 在根目录下，创建环境变量文件，如：`.env.saas`，参考内容如下：
  ```sh
  VUE_APP_CURRENTMODE=saas
  NODE_ENV=production
  ```
- 更改 `package.json` 文件，增加saas的构建命令：
  ```json
  "scripts": {
    "build:saas": "vite build --mode saas"
  }
  ```
- 接下来就可以使用 `process.env.VUE_APP_CURRENTMODE === 'saas' ` 在需要定制化开发的地方，进行特殊处理了。

### 3、接口层处理
针对接口层的处理，需要关注：Axios的封装，接口的定义，以及Proxy的转发。

Proxy转发配置比较简单，在 `vite.config.js` 中设置即可，如：
```js
server: {
  proxy: {
    '/api/v1': {
      target: '',         // 服务器地址
      changeOrigin: true, // 是否跨域
      pathRewrite: '',    // 路径重写
      secure: false,      // 是否为https
      ws: false           // 是否启用webscokets
    }
  }
}
```
Axios的封装可参考 `/apis/http.js`，需要关注以下几个问题：
- 后端接口返回的数据ID可能会超出精度，可在封装时统一处理。
- token 与 language 的处理。
- 状态码预处理。

#### 常见场景处理
场景1：
>当网络较慢时，用户不断更改筛选条件查询列表数据，会造成多次触发GET接口。而又因为接口返回的数据存在延迟，导致最终页面上呈现的数据不准确。

解决方案 `/apis/utils.js latestExec` 函数，示例：
```js
export const findUserListAPI = latestExec((params = {}) => ajax({ url: '/user', params }))
```

场景2：
>同一个表单要同时支撑创建与编辑两种业务需求时，而创建、编辑对应不同的接口，但是最终提交的表单数据却是极其相似的。

这个时候分别写两个提交函数，代码是冗余的。解决方案：`/apis/utils.js apiOperation` 函数，在接口请求进行封装。示例：
```js
function submitFrom (isEdit, formData) {
  apiOperation(isEdit ? EditApi : AddApi, [formData]).then(res => {
    if (res.code === 200) wMessage.success('操作成功')
  })
}
```

场景3:
>管理类的产品，经常会有一些比较危险的操作，比如删除、重启、停止等等。这类操作需要提示用户是否确认删除。对每个操作，都需要引用message提示窗口，有些情况在一个页面内就需要引用多次。

针对这种情况，`/apis/utils.js confirmApiOperation` 函数将提示窗口与接口请求进行封装，简化代码。示例：
```js
function operation (type) {
  switch (type) {
    case 'delete': 
      const tipConfig = { title: '提示', content: '删除后将不可恢复，是否确定删除？' }
      confirmApiOperation(tipConfig, DeleteApi, [{ id: '2' }]).then(res => {
        if (res.code === 200) {
          wMessage.success('删除成功')
          refreshList()
        }
      })
      break
    case 'xxx':
      // other types ...
      break
    // ...  
  }
}
```

场景4:
> 每个产品中都有很多列表，在获取列表数据时，有很多的参数条件。

`/apis/utils.js paramsFormat` 函数，针对Get类型的接口，对需要分页的参数条件进行统一处理。示例：
```html
<el-input
  clearable
  v-model="params.search"
  @change="val => paramsFormat(params, {type: 'search', val), findList)"/>
```

### 4、状态管理
目前预设对用户信息、系统语言的存储

### 5、路由管理
针对路由层，需要关注：登录状态的预判、面包屑的处理、路由的定义

登录状态的预判很简单，只需要在`router.beforeEach`中调用store，根据登录的状态判断进入下一路由还是进入登录页面。

#### 全局面包屑
>部分产品会将面包屑设计在Header中，作为全局的面包屑

这里提供全局面包屑的处理方案：
```js
// router 中配置：
meta: {
  breadcrumb: [
    { label: '列表', path: '/console/list' }, 
    { label: '一级详情', path: '/console/list/:listId' }, 
    { label: '二级详情' }
  ]
}
```
```js
// header 中获取面包屑信息，并对路由进行替换
const breadcrumbList = computed(() => {
  const params = route.params || {}
  const meta = route.meta || {}
  const breadcrumbArr = meta.breadcrumb || []
  return breadcrumbArr.map(({ label, path = '' }) => {
    // 替换路由中的所有ID
    path = path.replace(/\/:([\w-]*)/g, (_, match) => {
      return '/' + params[match]
    })
    return { label, path }
  })
})
```


### 6、国际化处理
国际化的实现分：前端页面层、后端接口层。

#### 后端接口层
只需要在接口请求时，将当前用户选择的语言传递到后端即可。

#### 前端页面层
- 国际化插件配置&引入：
  - 自定义语言，如系统内的文案等，需要在 `/intl` 内进行基础语言配置，然后在 main.js 中引入。
  - Element组件配置，只需要在 App.vue 内配置即可
    ```html
    <el-config-provider :locale="langStore.lang === 'zh' ? zhCN : enUS">
        <router-view v-if="isActiveRouter" />
    </el-config-provider>
    ```
    ```js
    // 脚本内，监听语言变化。当语言变化时，页面触发更新：
    import { useI18n } from 'vue-i18n'

    // 当语言切换时，重置
    const i18n = useI18n()
    watch(i18n.locale, (n, o) => {
      if (n !== o) reload()
    })

    // 页面重置
    const isActiveRouter = ref(true)
    function reload() {
      isActiveRouter.value = false
      nextTick(() => {
        isActiveRouter.value = true
      })
    }
    ```
- 使用：
  - 常规组件
    ```html
    <!--模版内-->
    <div>{{ $t('c_menu.console') }}</div>
    ```
    ```js
    import { useI18n } from 'vue-i18n'
    const { t, te } = useI18n() // te 可用来判断某个配置是否存在
    console.log(t('c_menu.console'))
    ```
  - 组件外函数中使用
    ```js
    // 引入
    import i18n from '@/intl'

    // 使用
    const { t } = i18n.global
    console.log(t('c_common.msg_success'))
    ```
  - 表单函数 **比较特殊**
    ```js
    // 引入 getformRules，核心代码
    import { getformRules } from '@/utils/rules'
    const { required } = getformRules()

    // 使用
    <el-form-item
      prop="taskName"
      :rules="required"
      class="taskname-item"
      >
      <el-input
        v-model="formData.taskName"
        :placeholder="$t('p_project_list.o_create.missing_name')"
      />
    </el-form-item>
    ```


### 7、Icon 特殊处理
由于element-plus默认icon在系统中使用比较少，因此项目中采用按需引入的方式。

按需引入配置：在components/icon/element_icon.js中配置需要引入的icon。配置后的icon会在main中自动注册成全局组件。

Element-Icon 以及 Iconfont-Icon 的使用：
```html
<!--icon组件内部会判断 当前 icon-type 是哪种类型的icon，按需展示。-->
<g-icon :type="icon-type"/>
```

### 其他
系统内置 图标库、函数库，详情可以查看代码。
