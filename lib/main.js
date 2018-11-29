const cp = require("child_process");
const { AutoLanguageClient } = require("atom-languageclient");

class VHDLLanguageClient extends AutoLanguageClient {
  constructor() {
    super();
  }

  activate() {
    super.activate();
    require("atom-package-deps").install("ide-vhdl", true);
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

  getServerCommand() {
    switch (atom.config.get("ide-vhdl.vhdlLanguageServer.command")) {
      case "binary":
        return [
          atom.config.get("ide-vhdl.vhdlLanguageServer.path"),
          { shell: true }
        ];
      case "docker":
        // TODO: pull latest image
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
            "--rm",
            "kraigher/vhdl_ls"
          ]
        ];
    }
  }

  async startServerProcess() {
    return cp.spawn(...this.getServerCommand());
  }
}

module.exports = new VHDLLanguageClient();
