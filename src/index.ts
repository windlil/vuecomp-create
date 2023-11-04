#!/usr/bin/env node

import Inquirer from 'inquirer'
import chalk from 'chalk'
import process from 'node:process'
import { version} from '../package.json'

const commands = [
  "-v",
  "create",
]

function start() {
  const argv = (process.argv as string[]).slice(2)

  if (argv.length === 0) {
    console.log(chalk.red('参数错误或缺少必要参数'))
    console.log(
  `
  -v                     查看版本
  create <projectName>   创建项目`
    )
  
    return
  }

  argv.forEach(async (command) => {
    if (commands.includes(command)) {
      if (command === '-v') {
        console.log(`vuecomp-starter  v${version}`)
      } else if (command === 'create') {
        await new (Inquirer as any).prompt([
        {
          name: 'projectName',
          type: 'input',
          message: '请输入项目名称',
          validate: function (val: string) {
            if (!/^[a-zA-Z]+$/.test(val)) {
              return "模板名称只能含有英文";
            }
            return true;
          },
        },
        {
          name: "vue",
          type: "checkbox",
          message: "请选择CSS预处理器",
          choices: [
            {
              name: "scss",
              checked: true,
            },
            {
              name: "less",
            },
          ]
        },
        {
          name: 'compName',
          type: 'input',
          message: '请输入组件开头名（首字母大写）:',
          validate: function (val: string) {
            if (!/^[a-zA-Z]+$/.test(val)) {
              return "开头名只能含有英文"
            }
            if (!/^[A-Z]/.test(val)) {
              return "开头名首字母必须大写"
            }
            return true
          },
        }]
        ).then(((data: any) => {
          console.log(data)
        }))
      }

      return process.exit()
    }
  })
}

start()

