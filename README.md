# ide-vhdl package for Atom

[Atom package](https://atom.io/packages/ide-vhdl)

VHDL language support for [Atom](https://atom.io/) using the language server from [kraigher/rust_hdl](https://github.com/kraigher/rust_hdl#vhdl-language-server).

## Usage

If you have Docker installed you can use the [kraigher/vhdl_ls](https://hub.docker.com/r/kraigher/vhdl_ls/) container. You can set this option in the package settings.

If you have Rust installed you can install (`cargo install vhdl_ls`) or build the crate from source (`git clone https://github.com/kraigher/rust_hdl && cd rust_hdl && cargo build -p vhdl_ls --release`). Make sure to check the path in the package settings.
