#!/usr/bin/env node
import chalk from 'chalk'
import Inquirer from 'inquirer'
import { exec } from 'child_process'

async function start() {
  await new (Inquirer as any).prompt([
    {
      name: 'select',
      type: "list",
      message: "请选择操作:",
      choices: [
        {
          name: "启动说明文档服务",
        },
        {
          name: "启动测试环境服务",
        },
        {
          name: "新增组件",
        },
        {
          name: "打包组件",
        },
        {
          name: "自动部署(GitHub Page)",
        }
      ],
    }
  ]).then((data: any) => {
    console.log(data)

    switch(data.select) {
      case '启动说明文档服务':
        exec('pnpm run docs:dev')
        break;
      case '启动测试环境服务':
        exec('pnpm run comp:play')
        break;
      case '新增组件':
        break;
      case '打包组件':
        exec('pnpm run build')
        break;
      case '自动部署(GitHub Page)':
        exec('git add .')
        exec('git commit -m "chore: update"')
        exec('git push')
        break;
    }
  })
}

start()
