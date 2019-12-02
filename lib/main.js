const cp = require("child_process");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const { AutoLanguageClient } = require("atom-languageclient");

const IMAGE = "kraigher/vhdl_ls";
const TAG = "latest";

const MS_IN_DAY = 86400000;

class VHDLLanguageClient extends AutoLanguageClient {
  constructor() {
    super();
    this.pulled = false;
  }

  async activate() {
    super.activate();
    require("atom-package-deps").install("ide-vhdl", true);
  }

  async pull_image() {
    this.pulled = Date.now();
    const info = atom.notifications.addInfo(`Pulling ${TAG} ${IMAGE} image`, {
      dismissable: true
    });
    const pull = await exec(`docker pull ${IMAGE}:${TAG} | grep Status`);
    info.dismiss();
    atom.notifications.addSuccess(pull.stdout);
  }

  getGrammarScopes() {
    return ["source.vhdl", "source.vhd"];
  }
  getLanguageName() {
    return "VHDL";
  }
  getServerName() {
    return "vhdl_ls";
  }

  getRustLogLevel() {
    return `vhdl_ls=${atom.config.get("ide-vhdl.vhdlLanguageServer.debug") ? "trace" : "error"}`
  }

  getServerCommand(projectPath) {
    switch (atom.config.get("ide-vhdl.vhdlLanguageServer.command")) {
      case "binary":
        return [
          atom.config.get("ide-vhdl.vhdlLanguageServer.path"),
          {
            shell: true,
            env: {
              ...process.env,
              RUST_LOG: this.getRustLogLevel()
            }
          }
        ];
      case "docker":
        return [
          "docker",
          [
            "run",
            "-i",
            "-a",
            "stdin",
            "-a",
            "stdout",
            "-a",
            "stderr",
            "-e",
            `RUST_LOG=${this.getRustLogLevel()}`,
            "--rm",
            "-v",
            `${projectPath}:${projectPath}:ro`,
            "-w",
            `${projectPath}`,
            `${IMAGE}:${TAG}`
          ]
        ];
    }
  }

  async startServerProcess(projectPath) {
    switch (atom.config.get("ide-vhdl.vhdlLanguageServer.command")) {
      case "docker":
        if (this.pulled === false || Date.now() - this.pulled > MS_IN_DAY) {
          await this.pull_image();
        }
      default:
        return cp.spawn(...this.getServerCommand(projectPath));
    }
  }
}

module.exports = new VHDLLanguageClient();
