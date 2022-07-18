# 目录结构

```yaml
admin
    ├── env                     # 环境变量
    └── src
        ├── assets                  # 资源目录
        ├── components              # 公共组件
        │    └── *                       # 大驼峰命名
        ├── config                  # 项目配置
        │   ├── Env.ts
        │   ├── LafConfig.ts
        │   └── RouterConfig.ts
        ├── pages                   # 路由页面: 大驼峰命名; 一级路由下 Router.ts 配置路由
        │   ├── Admin
        │   ├── Basic
        │   ├── Config
        │   ├── Error
        │   ├── Home
        │   ├── Login
        │   ├── Marketing
        │   └── Order
        ├── repository              # DAO - 数据库访问, 云函数接入
        ├── service                 # 通用业务服务
        ├── store                   # pinia (vuex)
        ├── style                   # 公共样式表
        ├── util                    # 纯工具函数
        ├── main.ts
        ├── env.d.ts
        └── App.tsx
```

# 注意
`package.json` 中 `"dev": "update.ps1 && vite --host"`  
但是 [common 依赖更新脚本: update.ps1](./update.ps1) 仅供`win` 平台使用;   