import moment from "moment"
import config from "../logger.config.json"
export class Logger {
  static __hierarchy = ["error", "warn", "info", "debg"] //wip
  static tabLvl: number = 0
  static msgColor: Record<string, string> = {
    error: "\x1b[91m",
    warn: "\x1b[33m",
    info: "\x1b[36m",
    debg: "\x1b[90m",
  }
  static exec(lvl: string, msg: string) {
    if (this.isLogLvl(lvl)) {
      const date = moment(new Date()).format("gg/MM/YYYY, hh:mm")
      const tabs = "   ".repeat(this.tabLvl)
      this.tabLvl = 0
      const res = {
        prefix: `${this.msgColor[lvl]}[${lvl.toUpperCase()}] ${date} ||${tabs}`,
        msg,
        reset: `\x1b[0m`,
      }
      return res
    } else {
      this.tabLvl = 0
      return
    }
  }
  static isLogLvl(lvl: string) {
    const configIndex = this.__hierarchy.findIndex(
      (el) => el === config.logLevel
    )
    const actualIndex = this.__hierarchy.findIndex((el) => el === lvl)
    if (configIndex == -1 || actualIndex == -1) {
      console.log(
        `${this.msgColor.error}[ERROR] ${moment(new Date()).format(
          "gg/MM/YYYY, hh:mm"
        )} ||${"   ".repeat(this.tabLvl)}`,
        "Unknown log level, found: ",
        config.logLevel
      )
    }
    return configIndex >= actualIndex
  }
  static log(message: string) {
    if (!this.isLogLvl("info")) return
    const { prefix, msg, reset } = this.exec("info", message)!
    console.log(prefix, msg, reset)
  }
  static error(message: string) {
    if (!this.isLogLvl("error")) return

    const { prefix, msg, reset } = this.exec("error", message)!
    console.log(prefix, msg, reset)
  }
  static warning(message: string) {
    if (!this.isLogLvl("warn")) return

    const { prefix, msg, reset } = this.exec("warn", message)!
    console.log(prefix, msg, reset)
  }

  static debug(message: string) {
    if (!this.isLogLvl("debg")) return

    const { prefix, msg, reset } = this.exec("debg", message)!
    console.log(prefix, msg, reset)
  }

  static level(num: number) {
    this.tabLvl = num
    return this
  }
}
Logger.warning(`Logger level: ${config.logLevel}`)
