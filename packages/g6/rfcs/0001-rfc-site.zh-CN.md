- 功能名称: 官网方案
- 开始时间: 2023-08-11
- RFC PR:
- RFC Issue:

## 背景/动机

调研了 React,Antd,Echart,G2,Cytoscape.js 等技术官网，发现目前我们的 4.0 的官方，存在的问题如下：

用户视角：

- 导航栏分类过多，9 项文字 + 3 个图标（version / wechat / github ），信息过载
- 和开发者相关的「教程」「API」「图表示例」内容过于丰富，且彼此联动不多

开发者视角：

- 站点 dumi 版本过低，且锁定在 beta 版本，不支持 typescript 文件等。
- 站点开发启动过慢，且在多包机制下没有很好利用 demo 文件，导致部分重复工作

## 详细说明：

### 用户视角

通过聚合导航栏功能，让用户一眼能看到他们关心的重点信息，减少干扰

- 左侧：Banner / 搜索
- 右侧：教程 / 示例 / API / `其他资源` / version / language / github
- 其他资源：设计体系 / 主题定制 / 在线工具 / 国内镜像 / 博客

#### 教程

教程建议不再做多内容的折叠，直接平铺，传达一个心智给用户：这个可视化库很简单，就几篇内容就能学完

0. 技术选型：告诉用户，图是什么，在什么场景下，你可以使用 G6，且能帮助你什么？
1. 案例实战：以某个知识图谱为例（参考 React 教程的井字棋游戏）
2. 如何升级：告诉用户，如何从 V4 版本，升级到 V5 版本
3. 支持框架：React / Vue / Angular 等
4. 核心概念

- 总览
- 数据
- 元素
- 主题
- 布局
- 交互
- 事件
- 插件

5. FAQ

常见问题汇总，这里面可以直接跳转到 ISSUE 标记为「FAQ」的分组中，尽量引导用户在 github 上交流

#### 示例

原则：demo 不再追求多，它和单测最大的区别在于，能够通过 demo 去尽可能展示我们的能力，因此比如插件，我们不会再像之前一样，一个插件是一个 demo，甚至是多个 demo，而是多个插件都体现在一个 demo 中，一方便能够看出我们插件组合起来是否有冲突等 bug，另一方便也向用户展示全量能力

- 数据：网图和树图
- 元素：内置节点 / 边 / combo ； 自定义节点 / 边 / Combo
- 主题：内置主题 / 自定义主题
- 布局：内置布局 / 自定义布局
- 交互：内置交互 / 自定义交互
- 插件：内置插件 / 自定义插件
- 性能：性能测试
- 算法：内置算法 / 自定义算法

## API

原则：在用户使用「示例」的时候，能够尽可能关联到 API，用户可以根据 API 的参数，手动在 playground 中调整，从而观察效果，这个需要 dumi 站点层的改造

### 技术视角说明：

- 引入 pnpm 多包管理
- 升级 dumi 2.4.x 版本， 支持 demo 的 typescript 格式
- 升级 antv-dumi-theme ，能够支持 demo 旁边展示对应的 API

## 其他替代方案

### unit test / g6 dev demo / site demo 三方统一

参考 https://github.com/antvis/G6/pull/4793 ，该 PR 接入服务端渲染进行集成测试，同时支持同一份 DEMO 代码，既可以用于开发者本地开发调试，也可以用于机器集成测试

- 开发者本地测试： `cd packages/g6/` && `npm run dev`
- 机器集成测试: `cd packages/g6/` && `test:integration`

那么也可以尝试，这份 DEMO 数据用于官网的展示，后来经过讨论：

- 测试需要的是覆盖度，功能的细粒度，是给开发者和机器用的
- 官方 DEMO 需要的是功能的聚合，场景丰富度，是给用户使用的。

因此还是决定将两者分开

### 大学堂：交互式文档

这个目前还在洽谈中，如果可以对接，则可以将教程变为引导式交互，可以转文档为教学。同样，风险较高，暂不采纳

## 未解决的问题

暂无
